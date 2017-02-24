const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssConfig = require('./postcss.config.js');

const jsFiles = glob.sync('./dev/main.js');
const entry = {};

let webpackConfig = {};

jsFiles.forEach((file, i) => {
    entry[path.basename(file, '.js')] = file;
});

const baseWebpackConfig = {
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                ],
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_module/,
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]-[local]--[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: [
                    'file-loader?limit=1024&name=font/[name].[ext]',
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    'url-loader?mimetype=image/png',
                ],
            },
        ],
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.js',
        },
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: postcssConfig.plugins,
                vue: {
                    postcss: postcssConfig.plugins,
                    loaders: {
                        sass: 'style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax',
                        scss: 'style-loader!css-loader!postcss-loader!sass-loader',
                    },
                    cssModules: {
                        localIdentName: '[path][name]---[local]---[hash:base64:5]',
                        camelCase: true,
                    },
                },
            },
        }),
    ],
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
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
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
                    'components/**/*',
                    'json/**/*',
                    'plugin/**/*',
                    'style/**/*',
                ],
            }),
        ],
    });
}


module.exports = webpackConfig;
