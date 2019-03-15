var gulp = require('gulp')
var uglify  = require('gulp-uglify')
gulp.task('script',function(){
  gulp.src('public/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('../server/public/js'))
})
gulp.task('default',['script'])