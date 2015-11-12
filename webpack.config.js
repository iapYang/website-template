var path = require('path');
var webpack = require('webpack');

var bowerDirectoryPlugin = new webpack.ResolverPlugin(
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
);

module.exports = {
    entry: {
        main: './dev/build/app.js'
    },
    output: {
        path: './dev/js',
        filename: '[name].js'
    },
    resolve: {
        root: [
            path.join('./dev', 'vendors')
        ]
    },
    plugins: [
        bowerDirectoryPlugin
    ]
};
