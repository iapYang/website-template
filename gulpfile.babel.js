let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let postcss = require('gulp-postcss');
let cssnext = require('postcss-cssnext');
let sorting = require('postcss-sorting');
let htmlmin = require('gulp-htmlmin');
let minifyCss = require('gulp-minify-css');
let imagemin = require('gulp-imagemin');
let copy = require('gulp-copy');
let clean = require('gulp-clean');
let sequence = require('gulp-sequence');
let zip = require('gulp-zip');
let exit = require('gulp-exit');
let notify = require('gulp-notify');
let browserSync = require('browser-sync');
let path = require('path');
let webpack = require('webpack-stream');
let named = require('vinyl-named');

let webpackPackage = require('webpack');
let spawn = require('child_process').spawn;

let inDev = true;

const reload = browserSync.reload;

const devFolder = 'dev';
const destFolder = 'dist';

const styleFolder = 'style';
const scriptFolder = 'script';
const imageFolder = 'image';
const componentFolder = 'component';
const vuexFolder = 'vuex';

const archiveFile = 'archive.zip';
const archiveFolder = 'archive';

const devPath = {
    html: path.join(devFolder, '*.html'),
    sass: path.join(devFolder, styleFolder, '**', '*.{scss,sass}'),
    js: path.join(devFolder, scriptFolder, '*.js'),
    img: path.join(devFolder, imageFolder, '**', '*'),
};

const destPath = {
    root: path.join(destFolder),
    css: path.join(destFolder, styleFolder, '**', '*.css'),
    cssDir: path.join(destFolder, styleFolder),
    jsDir: path.join(destFolder, scriptFolder),
    imgDir: path.join(destFolder, imageFolder),
};

const util = {
    cleanSource: [destFolder, archiveFile, archiveFolder],
    copySource: [
        path.join(devFolder, '**', '*'),
        '!' + path.join(devFolder, '*.html'),
        '!' + path.join(devFolder, styleFolder, '**', '*'),
        '!' + path.join(devFolder, scriptFolder, '**', '*'),
        '!' + path.join(devFolder, imageFolder, '**', '*'),
        '!' + path.join(devFolder, componentFolder, '**', '*'),
        '!' + path.join(devFolder, vuexFolder, '**', '*'),
    ],
    archiveFile: archiveFile,
    compressFile:  path.join(destFolder, '**'),
    compressDir: '.' + path.sep,
    browserSyncDir: [destFolder, devFolder],
    devReloadSource: [
        path.join(devFolder, '**', '*'),
        '!' + path.join(devFolder, styleFolder, '**', '*'),
        '!' + path.join(devFolder, scriptFolder, '**', '*'),
        '!' + path.join(devFolder, componentFolder, '**', '*'),
        '!' + path.join(devFolder, vuexFolder, '**', '*'),
    ],
};

gulp.task('sass', () => {
    return gulp.src(devPath.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
        cssnext(),
        sorting(),
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destPath.cssDir))
    .pipe(reload({stream: true}));
});

gulp.task('webpack-proxy', () => {
    if(process.argv.length === 2){ // default
        spawn('gulp', ['webpack']).stdout.on('data', (data) => {
            console.log(data.toString());
            browserSync.reload();
        });
    }else{ // build
        inDev = false;
        gulp.start('webpack');
    }
});

gulp.task('webpack', () => {
    let options = {
        watch: inDev,
        devtool: inDev ? 'source-map' : null,
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

    if(!inDev){
        options.plugins = [
            new webpackPackage.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            })
        ];
    }

    return gulp.src(devPath.js)
    .pipe(named())
    .pipe(webpack(options))
    .pipe(gulp.dest(destPath.jsDir));
});

gulp.task('minify-html', () => {
    return gulp.src(devPath.html)
    .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
    }))
    .pipe(gulp.dest(destPath.root));
});

gulp.task('minify-css', () => {
    return gulp.src(destPath.css)
    .pipe(minifyCss())
    .pipe(gulp.dest(destPath.cssDir));
});

gulp.task('img', () => {
    return gulp.src(devPath.img)
    .pipe(imagemin())
    .pipe(gulp.dest(destPath.imgDir));
});

gulp.task('clean', () => {
    return gulp.src(util.cleanSource)
    .pipe(clean());
});

gulp.task('copy', () => {
    return gulp.src(util.copySource)
    .pipe(copy(destPath.root, {
        prefix: 1,
    }));
});

gulp.task('compress', () => {
    return gulp.src(util.compressFile)
    .pipe(zip(util.archiveFile))
    .pipe(gulp.dest(util.compressDir));
});

gulp.task('complete', () => {
    gulp.src('')
    .pipe(notify({
        message: 'build complete',
    }))
    .pipe(exit());
});

gulp.task('compile', (cb) => {
    sequence('clean', ['webpack-proxy', 'sass'], cb);
});

gulp.task('default', ['compile'], () => {
    browserSync.init({
        port: 9000,
        server: {
            baseDir: util.browserSyncDir,
        },
    });

    gulp.watch(devPath.sass, ['sass']);
    gulp.watch(util.devReloadSource).on('change', reload);
});

gulp.task('build', ['compile'], (cb) => {
    sequence(['minify-html', 'minify-css', 'img'], 'copy', 'compress', 'complete', cb);
});
