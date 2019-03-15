var gulp = require('gulp')
var uglify  = require('gulp-uglify')
var gutil = require('gulp-util')
gulp.task('script',function(){
  gulp.src('public/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('../server/public/js'))
})
gulp.task('default',function(){
  gutil.log(gutil.colors.red('打包完成'))
  gutil.log(gutil.colors.green('打包完成'))
})