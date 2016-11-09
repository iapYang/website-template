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

if(process.env.NODE_ENV === 'production'){
    webpackConfig = merge(baseWebpackConfig, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            })
        ],
    });
}


module.exports = webpackConfig;
