
var gulp = require('gulp'),
  watchify = require('watchify'),
  less = require('gulp-less'),
  cssmin = require('gulp-cssmin'),
  fs = require('fs'),
  shell = require('gulp-shell'),
  mkdirp = require('mkdirp');

gulp.task('build', ['setup', 'less', 'browserify']);
gulp.task('default', ['setup', 'less', 'watch']);

// watch other files
gulp.task('watch-tests', function() {
  // cause the server to restart
  gulp.watch(['./**/*js'], shell.task('mocha test/process.js', {ignoreErrors: true}));
});

// watch other files
gulp.task('watch', function() {
  // web assets
  gulp.watch('src/less/*.less', ['less']);

});

gulp.task('less', function() {
  lessTask();
});

gulp.task('lint', function() {
  return gulp.src(jsfiles)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('setup', function(done) {
  if (!fs.existsSync('build') ){
    mkdirp('app/res', done);
  }
});

// # task functions

function error(err) {
  console.error('\n[ERROR]', err.message, '\n');
}

var lessTask = function() {
  gulp.src(['./src/less/*.less'])
  .pipe(less())
  .pipe(gulp.dest('./app/res/'))
  .on('error', error);
};
