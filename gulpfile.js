var gulp = require('gulp'),
    watchify = require('watchify'),
    less = require('gulp-less'),
    fs = require('fs'),
    shell = require('gulp-shell'),
    mkdirp = require('mkdirp');

gulp.task('setup', function(done) {
  if (!fs.existsSync('build')) {
    mkdirp('web/assets', done);
  }
});

gulp.task('less', function(done) {
  gulp.src(['./src/less/*.less'])
      .pipe(less())
      .pipe(gulp.dest('./web/assets/'))
      .on('error', error);

  done();
});


// watch other files
gulp.task('watch', function(done) {
  // web assets
  gulp.watch('src/less/*.less', gulp.series('less'));

  done();
});

gulp.task('build', gulp.series('setup', 'less'));
gulp.task('default', gulp.series('setup', 'less', 'watch'));

// watch other files
gulp.task('watch-tests', function() {
  // cause the server to restart
  gulp.watch(['./**/*js'], shell.task('mocha test/process.js', {ignoreErrors: true}));
});


gulp.task('lint', function() {
  return gulp.src(jsfiles)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// task functions
function error(err) {
  console.error('\n[ERROR]', err.message, '\n');
}