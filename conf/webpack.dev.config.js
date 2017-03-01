const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.config.js');

module.exports = merge(baseWebpackConfig, {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dev',
        host: 'localhost',
        port: 9000,
        open: true,
    },
});
