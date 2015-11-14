var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var clean = require('gulp-clean');
var filter = require('gulp-filter');

var sourceHtmlPath = 'dev/**';
var sourceCssPath = 'dev/css/**';
var sourceJsPath = 'dev/js/**';
var sourceImagePath = 'dev/img/**';

var distHtmlPath = 'dist';
var distCssPath = 'dist/css';
var distJsPath = 'dist/js';
var distImagePath = 'dist/img';

var htmlFilter = filter(['**/*.html', '!vendors/**'], {restore: true});
var cssFilter = filter(['**/*.css', '!vendors/**'], {restore: true});
var jsFilter = filter(['**/*.js', '!vendors/**'], {restore: true});
var imageFilter = filter(['**/*.{png,jpg,jpeg,gif}', '!vendors/**'], {restore: true});


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
    .pipe(gulp.dest(distJsPath));
});

gulp.task('minify-image', function(){
    return gulp.src(sourceImagePath)
    .pipe(imageFilter)
    .pipe(imagemin())
    .pipe(gulp.dest(distImagePath));
});



gulp.task('clean', function(){
    return gulp.src('dist')
    .pipe(clean());
});

gulp.task('watch', function(){
    gulp.watch('dev/css/*.css', ['minify-css']);
});
