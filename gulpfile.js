var gulp = require('gulp');
var compass = require( 'gulp-for-compass' );
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var zip = require('gulp-zip');


gulp.task('sass', function(){
    return gulp.src('dev/style/**/*.scss')
    .pipe(compass({
        sassDir: 'dev/style',
        cssDir: '.tmp/css'
    }))
    .pipe(reload({stream: true}));;
});

gulp.task('es6', function(){
    return gulp.src('dev/script/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('.tmp/js'))
    .pipe(reload({stream: true}));;
});

gulp.task('html', function(){
    return gulp.src('dev/**/*.html')
    .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function(){
    return gulp.src('.tmp/css/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function(){
    return gulp.src('.tmp/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('img', function(){
    return gulp.src('dev/image/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function(){
    return gulp.src(['.tmp', 'dist'])
    .pipe(clean());
});

gulp.task('copy', function(){
    return gulp.src([
        'dev/**/*',
        '!dev/**/*.html',
        '!dev/style/**/*',
        '!dev/script/**/*',
        '!dev/image/**/*',
        '!dev/vendors/**/*',
    ])
    .pipe(copy('dist/', {
        prefix: 1
    }));
});

gulp.task('compress', function(){
    return gulp.src('dist/**')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./'));
});


gulp.task('compile', ['sass', 'es6']);

gulp.task('default', ['compile'], function(){
    browserSync.init({
        port: 9000,
        server: {
            baseDir: ['dev', '.tmp']
        }
    });

    gulp.watch('dev/style/**/*.scss', ['sass']);
    gulp.watch('dev/script/**/*.js', ['es6']);

    gulp.watch([
        'dev/*.html',
        'dev/image/**/*',
        'dev/font/**/*'
    ]).on('change', reload);
});

gulp.task('build', function(cb){
    sequence('clean', 'compile', ['html', 'css', 'js', 'img'], 'copy', 'compress', cb);
});
