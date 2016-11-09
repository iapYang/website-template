let webpack = require('webpack');
let merge = require('webpack-merge');
let webpackConfig;

let baseWebpackConfig = {
    entry: './dev/script/index.js',
    output: {
        path: './dist',
        filename: 'index.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel',
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
                test: /\.scss$/,
                loader: 'style!css!sass',
            }
        ],
    },
    vue: {
        loaders: {
            sass: 'style!css!sass?indentedSyntax',
            scss: 'style!css!sass',
        }
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
    });
}


let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

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
                ]
            })
        ],
    });
}


module.exports = webpackConfig;
