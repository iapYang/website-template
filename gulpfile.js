var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var zip = require('gulp-zip');

var compass = require( 'gulp-for-compass' );
var babel = require('gulp-babel');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;




gulp.task('sass', function(){
    return gulp.src('dev/styles/**/*.scss')
    .pipe(compass({
        sassDir: 'dev/styles',
        cssDir: 'tmp/styles'
    }))
    .pipe(reload({stream: true}));;
});

gulp.task('es6', function(){
    return gulp.src('dev/scripts/**/*.ts')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('tmp/scripts'))
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
    return gulp.src('tmp/styles/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('js', function(){
    return gulp.src('tmp/scripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('img', function(){
    return gulp.src('dev/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function(){
    return gulp.src(['tmp', 'dist'])
    .pipe(clean());
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
            baseDir: ['dev', 'tmp']
        }
    });

    gulp.watch('dev/styles/*.scss', ['sass']);
    gulp.watch('dev/scripts/*.js', ['es6']);

    gulp.watch([
        'dev/*.html',
        'dev/images/**/*',
        'dev/fonts/**/*'
    ]).on('change', reload);
});

gulp.task('build', function(cb){
    sequence('clean', 'compile', ['html', 'css', 'js', 'img'], 'compress', cb);
});


// gulp.task('copy', function(){
//     return gulp.src(sourceAllPath)
//     .pipe(copy(distPath, {
//         prefix: 1
//     }));
// });
