const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssConfig = require('./postcss.config.js');

const jsFiles = glob.sync('./dev/script/*.js');
const entry = {};

let webpackConfig = {};

jsFiles.forEach((file, i) => {
    entry[path.basename(file, '.js')] = file;
});

const baseWebpackConfig = {
    entry,
    output: {
        path: './dist',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_module/,
            },
            {
                test: /\.vue$/,
                loader: 'vue',
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.css$/,
                loader: 'style!css',
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass',
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader?limit=1024&name=font/[name].[ext]',
            },
        ],
    },
    vue: {
        loaders: {
            sass: 'style!css!postcss!sass?indentedSyntax',
            scss: 'style!css!postcss!sass',
        },
        postcss: postcssConfig.plugins,
        cssModules: {
            localIdentName: '[path][name]---[local]---[hash:base64:5]',
            camelCase: true,
        },
    },
    postcss: postcssConfig,
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.js',
        },
    },
};

if (process.env.NODE_ENV === 'development') {
    webpackConfig = merge(baseWebpackConfig, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: './dev',
        },
    });
}

if (process.env.NODE_ENV === 'production') {
    const htmlFiles = glob.sync('./dev/*.html');
    const htmlPlugins = htmlFiles.map((file, i) =>
        new HtmlWebpackPlugin({
            filename: path.basename(file),
            template: file,
            inject: false,
            minify:{
                removeComments: true,
                collapseWhitespace: true,
            },
        }));

    webpackConfig = merge(baseWebpackConfig, {
        plugins: [
            ...htmlPlugins,
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,
                },
            }),
            new CopyWebpackPlugin([
                {
                    from: './dev',
                },
            ], {
                ignore: [
                    '*.html',
                    'router.js',
                    'style/**/*',
                    'script/**/*',
                    'store/**/*',
                    'vendor/**/*',
                    'component/**/*',
                    'data/**/*',
                    'font/**/*',
                ],
            }),
        ],
    });
}


module.exports = webpackConfig;
