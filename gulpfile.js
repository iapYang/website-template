var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var imagemin = require('gulp-imagemin');
var copy = require('gulp-copy');
var filter = require('gulp-filter');
var changed = require('gulp-changed');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var zip = require('gulp-zip');


var sourcePath = 'dev';
var distPath = 'dist';

var htmlPath = '';
var cssPath = 'css';
var jsPath = 'js';
var imgPath = 'img';

var singlePath = '*';
var fullPath = '**';

var archivePath = './';
var archiveName = 'archive';
var archiveExt = '.zip';

var sourceAllPath = [sourcePath, fullPath].join('/');
var sourceHtmlPath = [sourcePath, htmlPath, singlePath].join('/');
var sourceCssPath = [sourcePath, cssPath, fullPath].join('/');
var sourceJsPath = [sourcePath, jsPath, fullPath].join('/');
var sourceImgPath = [sourcePath, imgPath, fullPath].join('/');

var distAllPath = [distPath, fullPath].join('/');
var distHtmlPath = [distPath, htmlPath].join('/');
var distCssPath = [distPath, cssPath].join('/');
var distJsPath = [distPath, jsPath].join('/');
var distImgPath = [distPath, imgPath].join('/');

var htmlFilter = filter(['**/*.html', '!vendors/**'], {restore: true});
var cssFilter = filter(['**/*.css', '!vendors/**'], {restore: true});
var jsFilter = filter(['**/*.js', '!vendors/**'], {restore: true});
var imageFilter = filter(['**/*.{png,jpg,jpeg,gif}', '!vendors/**'], {restore: true});
var otherFilter = filter(['**/*', '!*.html', '!{css,js,img,sass,build,vendors}/**'], {restore: true});


gulp.task('minify-html', function(){
    return gulp.src(sourceHtmlPath)
    .pipe(htmlFilter)
    .pipe(changed(distHtmlPath))
    .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true
    }))
    .pipe(gulp.dest(distHtmlPath));
});

gulp.task('minify-css', function(){
    return gulp.src(sourceCssPath)
    .pipe(cssFilter)
    .pipe(changed(distCssPath))
    .pipe(minifyCss())
    .pipe(gulp.dest(distCssPath));
});

gulp.task('minify-js', function () {
    return gulp.src(sourceJsPath)
    .pipe(jsFilter)
    .pipe(changed(distJsPath))
    .pipe(uglify())
    .pipe(stripDebug())
    .pipe(gulp.dest(distJsPath));
});

gulp.task('minify-img', function(){
    return gulp.src(sourceImgPath)
    .pipe(imageFilter)
    .pipe(imagemin())
    .pipe(gulp.dest(distImgPath));
});

gulp.task('copy', function(){
    return gulp.src(sourceAllPath)
    .pipe(otherFilter)
    .pipe(copy(distPath, {
        prefix: 1
    }));
});

gulp.task('clean', function(){
    return gulp.src([distPath, archiveName, archivePath.concat(archiveName, archiveExt)])
    .pipe(clean());
});

gulp.task('compress', function(){
    return gulp.src(distAllPath)
    .pipe(zip(archiveName.concat(archiveExt)))
    .pipe(gulp.dest(archivePath));
});

// gulp.task('watch', function(){
//     gulp.watch('dev/css/*.css', ['minify-css']);
// });

gulp.task('build', function(cb){
    sequence('clean', ['minify-html', 'minify-css', 'minify-js', 'minify-img'], 'copy', 'compress', cb);
});
