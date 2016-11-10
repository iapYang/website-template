let webpack = require('webpack');
let merge = require('webpack-merge');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let webpackConfig;

let baseWebpackConfig = {
    entry: {
        index: './dev/script/index.js',
    },
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
        postcss: [
            require('postcss-cssnext')(),
            require('postcss-sorting')()
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
        },
    },
};

if(process.env.NODE_ENV === 'development'){
    webpackConfig = merge(baseWebpackConfig, {
        devtool: 'eval-source-map', //'source-map',
        devServer: {
            contentBase: './dev',
        },
    });
}

if(process.env.NODE_ENV === 'production'){
    webpackConfig = merge(baseWebpackConfig, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            }),
            new HtmlWebpackPlugin({
                template: './dev/index.html',
                inject: false,
                minify:{
    				removeComments: true,
    				collapseWhitespace: true,
    			},
            }),
            new CopyWebpackPlugin([
                {
                    from: './dev',
                },
            ], {
                ignore: [
                    '*.html',
                    'style/**/*',
                    'script/**/*',
                    'store/**/*',
                    'vendor/**/*',
                    'component/**/*',
                    'data/**/*',
                    'font/**/*'
                ]
            })
        ],
    });
}


module.exports = webpackConfig;
