var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var imagemin = require('gulp-imagemin');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var zip = require('gulp-zip');

var compass = require( 'gulp-for-compass' );
var babel = require('gulp-babel');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


// gulp.task('html', function(){
//     return gulp.src('dev/*.html')
//     .pipe(htmlmin({
//         removeComments: true,
//         collapseWhitespace: true
//     }))
//     .pipe(gulp.dest('dist'))
//     .pipe(reload({stream: true}));;
// });



gulp.task('sass', function(){
    return gulp.src('dev/styles/*.scss')
    .pipe(compass({
        sassDir: 'dev/styles',
        cssDir: 'tmp/styles'
    }))
    .pipe(reload({stream: true}));;
});

gulp.task('es6', function(){
    return gulp.src('dev/scripts/*.ts')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('tmp/scripts'))
    .pipe(reload({stream: true}));;
});


gulp.task('generate', ['sass', 'es6']);

gulp.task('default', ['generate'], function(){
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



// gulp.task('minify-html', function(){
//     return gulp.src(sourceHtmlPath)
//     .pipe(htmlmin({
//         removeComments: true,
//         collapseWhitespace: true
//     }))
//     .pipe(gulp.dest(distHtmlPath));
// });
//
// gulp.task('minify-css', function(){
//     return gulp.src(sourceStylePath)
//     .pipe(minifyCss())
//     .pipe(gulp.dest(distStylePath));
// });
//
// gulp.task('minify-js', function () {
//     return gulp.src(sourceScriptPath)
//     .pipe(uglify())
//     .pipe(stripDebug())
//     .pipe(gulp.dest(distScriptPath));
// });
//
// gulp.task('minify-img', function(){
//     return gulp.src(sourceImagePath)
//     .pipe(imagemin())
//     .pipe(gulp.dest(distImagePath));
// });
//
// gulp.task('copy', function(){
//     return gulp.src(sourceAllPath)
//     .pipe(copy(distPath, {
//         prefix: 1
//     }));
// });
//
// gulp.task('clean', function(){
//     return gulp.src([distPath, archiveName, archivePath.concat(archiveName, archiveExt)])
//     .pipe(clean());
// });
//
// gulp.task('compress', function(){
//     return gulp.src(distAllPath)
//     .pipe(zip(archiveName.concat(archiveExt)))
//     .pipe(gulp.dest(archivePath));
// });
//
//
// gulp.task('build', function(cb){
//     sequence('clean', ['minify-html', 'minify-css', 'minify-js', 'minify-img'], 'copy', 'compress', cb);
// });
