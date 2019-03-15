var gulp = require('gulp')
var uglify  = require('gulp-uglify')
var gutil = require('gulp-util')
var watchPath = require('gulp-watch-path')
// gulp.task('script',function(){
//   gulp.src('public/js/*.js')
//   .pipe(uglify())
//   .pipe(gulp.dest('../server/public/js'))
// })
gulp.task('watchjs',function(){
  gulp.watch('public/js/*.js',function(event){
    var paths = watchPath(event,'public/','../server/')
  //  console.log(paths);
  //  { srcFilename: 'index.js',
  // distFilename: 'index.js',
  // srcPath: 'public/js/index.js',
  // srcDir: 'public/js',
  // distPath: '../server/js/index.js',
  // distDir: '../server/js' }
    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('Dist ' + paths.distPath)
    gulp.src(paths.srcPath)
    .pipe(uglify())
    .pipe(gulp.dest(paths.distDir))
  })
})
gulp.task('default',['watchjs'])