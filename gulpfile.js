var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');

gulp.task('minify-css', function(){
    return gulp.src('dev/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', function () {
    return gulp.src('dev/build/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
    return gulp.src('dist')
    .pipe(clean());
});

gulp.task('imagemin', function(){
    return gulp.src('dev/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});
