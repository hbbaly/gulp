var gulp = require('gulp')
var uglify  = require('gulp-uglify')
var gutil = require('gulp-util')
var watchPath = require('gulp-watch-path')
var combiner = require('stream-combiner2')
var handleError = function (err) {
  var colors = gutil.colors;
  console.log('\n')
  gutil.log(colors.red('Error!'))
  gutil.log('fileName: ' + colors.red(err.fileName))
  gutil.log('lineNumber: ' + colors.red(err.lineNumber))
  gutil.log('message: ' + err.message)
  gutil.log('plugin: ' + colors.yellow(err.plugin))
}
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

    var combined = combiner.obj([
      gulp.src(paths.srcPath),
      uglify(),
      gulp.dest(paths.distDir)
    ])
    combined.on('error',handleError)
  })
})
gulp.task('default',['watchjs'])