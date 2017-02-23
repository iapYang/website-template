module.exports = {
    plugins: [
        require('postcss-cssnext')({
            warnForDuplicates: false,
        }),
        require('postcss-sorting')(),
    ],
};
