
var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  babelify = require('babelify'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  notify = require('gulp-notify'),
  less = require('gulp-less'),
  cssmin = require('gulp-cssmin'),
  glob = require('glob'),
  fs = require('fs'),
  shell = require('gulp-shell'),
  mkdirp = require('mkdirp');

  var development = false;

// An array of npm dependencies included in vendor.
var dependencies = [
  'react' // react is part of this boilerplate
];

gulp.task('default', ['development', 'setup', 'less', 'watch', 'browserify']);

// set development option
gulp.task('development', function() {
  development = true;
});

// Watch vendor and app scripts
gulp.task('browserify', function () {
  browserifyTask({
    src: ['./src/js/frontend.js'],
    dest: './app/res/'
  });

});

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

// Runs workflow and deploys the code. based on http://christianalfoni.github.io/javascript/2014/10/30/react-js-workflow-part2.html
var browserifyTask = function(options) {

// First define application bundler.
  var appBundler = browserify({
    entries: options.src, // The entry file, normally "main.js"
    transform: [babelify], // Convert JSX style
    debug: development, // Sourcemapping
    cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  });

// Set dependencies as externals of the app bundler
//  For some reason it does not work to set these in the options above
  (development ? dependencies : []).forEach(function (dep) {
    appBundler.external(dep);
  });

// The actual rebundle process, which produces a "main.js" file in the dest folder
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .on('error', error)
      .pipe(source('main.js'))
      .pipe(gulpif(!development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
    };

  // When developing watch for changes and trigger a rebundle
  if (development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }

  // Trigger the initial bundling
  rebundle();

  if (development) {
    var vendorsBundler = browserify({
      debug: true, // It is nice to have sourcemapping when developing
      require: dependencies
    });

    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', error)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function() {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));
  }
};

function error(err) {
  console.error('\n[ERROR]', err.message, '\n');
}

var lessTask = function() {
  gulp.src(['./src/less/*.less'])
  .pipe(less())
  .pipe(gulpif(!development,cssmin()))
  .pipe(gulp.dest('./app/res/'))
  .on('error', error);
};
