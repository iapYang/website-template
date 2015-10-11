var gulp = require('gulp'),
   uglify = require('gulp-uglify');

gulp.task('minify', function () {
   gulp.src('dev/js/app.js')
      .pipe(uglify())
      .pipe(gulp.dest('release'))
});
