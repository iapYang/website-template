module.exports = {
    devtool: 'source-map',
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
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
        }
    },
};
