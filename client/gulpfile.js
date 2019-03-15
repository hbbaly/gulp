var gulp = require('gulp')
var uglify  = require('gulp-uglify')
var gutil = require('gulp-util')
var watchPath = require('gulp-watch-path')
var combiner = require('stream-combiner2')
var sourcemaps = require('gulp-sourcemaps')
var handleError = function (err) {
  var colors = gutil.colors;
  console.log('\n')
  gutil.log(colors.red('Error!'))
  gutil.log('fileName: ' + colors.red(err.fileName))
  gutil.log('lineNumber: ' + colors.red(err.lineNumber))
  gutil.log('message: ' + err.message)
  gutil.log('plugin: ' + colors.yellow(err.plugin))
}
// 处理js
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
      sourcemaps.init(),
      uglify(),
      sourcemaps.write(),
      gulp.dest(paths.distDir)
    ])
    combined.on('error',handleError)
  })
})
var minifycss = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
gulp.task('watchcss',function(){
  gulp.watch('public/css/*.css',function(event){
    var paths = watchPath(event,'public/','../server/')

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('Dist ' + paths.distPath)

    gulp.src(paths.srcPath)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: 'last 3 versions'
    }))
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.distDir))
  })
})
// less 
var less = require('gulp-less')
gulp.task('watchless', function () {
  gulp.watch('public/less/**/*.less', function (event) {
      var paths = watchPath(event, 'public/less/', '../server/css/')

  gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)
      var combined = combiner.obj([
          gulp.src(paths.srcPath),
          sourcemaps.init(),
          autoprefixer({
            browsers: 'last 2 versions'
          }),
          less(),
          minifycss(),
          sourcemaps.write('./'),
          gulp.dest(paths.distDir)
      ])
      combined.on('error', handleError)
  })
})
gulp.task('default',['watchjs','watchcss','watchless'])