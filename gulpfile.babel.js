import gulp from 'gulp';
import swig from 'gulp-swig';
import data from 'gulp-data';
import compass from  'gulp-for-compass' ;
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import htmlmin from 'gulp-htmlmin';
import minifyCss from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import copy from 'gulp-copy';
import clean from 'gulp-clean';
import sequence from 'gulp-sequence';
import zip from 'gulp-zip';
import watchify from 'watchify';
import exit from 'gulp-exit';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import glob from 'glob';
import path from 'path';

const reload = browserSync.reload;
const browserifyObjectArray = [];

const devPath = {
    html: 'dev/*.html',
    sass: 'dev/style/**/*.{scss,sass}',
    js: 'dev/script/*.js',
    img: 'dev/image/**/*',
    cssDir: 'dev/style/',
    configFile: './dev/data/config.json',
};

const destPath = {
    root: 'dist/',
    html: 'dist/*.html',
    css: 'dist/style/**/*.css',
    js: 'dist/script/**/*.js',
    cssDir: 'dist/style/',
    jsDir: 'dist/script/',
    imgDir: 'dist/image/',
};

const util = {
    cleanSource: ['dist', 'archive.zip'],
    copySource: [
        'dev/**/*',
        '!dev/*.html',
        '!dev/style/**/*',
        '!dev/script/**/*',
        '!dev/image/**/*',
    ],
    zipFile: 'archive.zip',
    compressFile: 'dist/**',
    compressDir: './',
    browserSyncDir: ['dist', 'dev'],
    devReloadSource: [
        'dev/**/*',
        '!dev/*.html',
        '!dev/style/**/*',
        '!dev/script/**/*',
    ]
};


glob(devPath.js, (err, files) => {
    files.forEach((file) => {
        let name = path.basename(file);

        let instance = browserify({
            entries: [file],
            cache: {},
            packageCache: {},
            fullPaths: true,
            plugin: [watchify],
        }).transform(babelify, {presets: ['es2015']});

        browserifyObjectArray.push({
            name: name,
            instance: instance,
            processor: () => {
                instance
                .bundle()
                .on('error', (err) => {
                    console.log(err.toString());
                    this.emit('end');
                })
                .pipe(source(name))
                .pipe(buffer())
                .pipe(gulp.dest(destPath.jsDir))
                .pipe(reload({stream: true}));
            }
        });
    });
});

function bundleJs(){
    browserifyObjectArray.forEach((obj) => {
        obj.processor();
    });
}

function getJsonData() {
    var jsonData = require(devPath.configFile);
    delete require.cache[require.resolve(devPath.configFile)];

    return jsonData;
}

import cache from 'gulp-cached';

gulp.task('swig', () => {
    return gulp.src(devPath.html)
    .pipe(cache('swig'))
    .pipe(data(getJsonData))
    .pipe(swig({defaults: { cache: false }}))
    .pipe(gulp.dest(destPath.root))
    .pipe(reload({stream: true}));
});

gulp.task('sass', () => {
    return gulp.src(devPath.sass)
    .pipe(cache('sass'))
    .pipe(compass({
        sassDir: devPath.cssDir,
        cssDir: destPath.cssDir
    }))
    .pipe(reload({stream: true}));
});

gulp.task('browserify', bundleJs);

gulp.task('minify-html', () => {
    return gulp.src(destPath.html)
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

gulp.task('minify-js', () => {
    return gulp.src(destPath.js)
    .pipe(uglify())
    .pipe(gulp.dest(destPath.jsDir));
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
        prefix: 1
    }));
});

gulp.task('compress', () => {
    return gulp.src(util.compressFile)
    .pipe(zip(util.zipFile))
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
    sequence('clean', ['swig', 'sass', 'browserify'], cb);
});

gulp.task('default', ['compile'], () => {
    browserSync.init({
        port: 9000,
        server: {
            baseDir: util.browserSyncDir,
        },
    });

    gulp.watch([devPath.html, devPath.configFile], ['swig']);
    gulp.watch(devPath.sass, ['sass']);

    browserifyObjectArray.forEach((obj) => {
        obj.instance.on('update', obj.processor);
    });

    gulp.watch(util.devReloadSource).on('change', reload);
});

gulp.task('build', (cb) => {
    sequence('compile', ['minify-html', 'minify-css', 'minify-js', 'img'], 'copy', 'compress', 'complete', cb);
});
