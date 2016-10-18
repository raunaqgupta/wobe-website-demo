var gulp = require('gulp'),

//dev
  changed = require('gulp-changed'),
  concat = require('gulp-concat'),
  cssPreprocess = require('gulp-sass'),
  eslint = require('gulp-eslint'),
  filter = require('gulp-filter'),
  gutil = require('gulp-util'),
  gulpConnectSsi = require('gulp-connect-ssi'),
  include = require('gulp-include'),
  jest = require('jest-cli'),
  jslint = require('gulp-jslint'),
  uglify = require('gulp-uglify'),
  path = require('path'),
  sourcemaps = require('gulp-sourcemaps'),
  tap = require('gulp-tap'),
  watch = require('gulp-watch'),
  wrap = require('gulp-wrap'),
  connect = require('gulp-connect-multi')();

var webroot = './';

var paths = {
  src: webroot + 'src/',
  dist: webroot + 'dist/',
  type: {
    scripts: 'assets/scripts/',
    styles: 'assets/styles/',
    font: 'assets/fonts/',
    images: 'assets/images/',
    sampleData: 'data/'
  }
};

var assets = {
  src: {
    scripts: [
      paths.src + paths.type.scripts + '*.js'
    ],
    styles: [
      paths.src + paths.type.styles + '*.scss'
    ],
    images: [
      paths.src + paths.type.images + '**/*'
    ],
    font: [
      paths.src + paths.type.font + '**/*'
    ],
    views: [
      paths.src + '**/*.*htm*'
    ],
    sampleData: [
      paths.src + paths.type.sampleData + '**/*'
    ]
  }
};

/**
 * sass
 */
gulp.task('compile-styles', function () {
  var sassOptions = {
    outputStyle: 'compressed',
    errLogToConsole: false
  };

  var handlesassError = function (error) {
    var message = new gutil.PluginError('sass', error.messageFormatted).toString(); // Generate formatted error message
    process.stderr.write('\n' + message + '\n\n'); // Write error to console
    this.emit('end');
  };

  return gulp.src(assets.src.styles)
    .pipe(cssPreprocess(sassOptions).on('error', handlesassError)) // Compile sass files to CSS
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('styles.min.css')) // Concatenate all scripts to a single file
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist + paths.type.styles))
    .pipe(connect.reload());
});

/**
 * Compile scripts
 */
gulp.task('compile-scripts', function () {

  return gulp.src(assets.src.scripts)
    // load linter
    .pipe(eslint({
      "extends": [
        "defaults",
        "defaults/configurations/eslint",
        "defaults/configurations/google"
      ]
    }))
    .pipe(eslint.format())
    .pipe(include())
    .pipe(uglify())
    .pipe(sourcemaps.init({loadMaps: true}))
    // write sourcemaps
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist + paths.type.scripts))
    .pipe(connect.reload())
});

/**
 * Images Assets
 */
gulp.task('copy-images', function () {

  return gulp.src(assets.src.images)
    .pipe(gulp.dest(paths.dist + paths.type.images))
    .pipe(connect.reload())
});

/**
 * Fonts Assets
 */
gulp.task('copy-font', function () {

  return gulp.src(assets.src.font)
    .pipe(gulp.dest(paths.dist + paths.type.font))
    .pipe(connect.reload())
});

/**
 * sample Data
 */
gulp.task('copy-data', function () {

  return gulp.src(assets.src.sampleData)
    .pipe(gulp.dest(paths.dist + paths.type.sampleData))
    .pipe(connect.reload())
});

/**
 * Enable livereload for changes to views.
 *
 * @return {Stream}
 */
gulp.task('views', function () {
  var destination = paths.dist;
  return gulp.src(assets.src.views)
    .pipe(gulp.dest(destination))
    .pipe(connect.reload())
});

/**
 * Server
 */
gulp.task('connect', connect.server({
  root: ['dist'],
  port: 3030,
  livereload: {
    'port': 35729
  },
  middleware: function(){
    return [gulpConnectSsi({
      baseDir: paths.dist,
      ext: '.htm',
      method: 'readOnLineIfNotExist'  // readOnLine|readLocal|readOnLineIfNotExist|downloadIfNotExist
    })];
  }
}));

/**
 * group task
 **/

/**
 * Default task.
 */
gulp.task('default', ['compile'], function () {});


/**
 * Serve Task
 */
gulp.task('serve', ['compile', 'watch'], function (){});


/**
 * Watch assets for changes.
 */
gulp.task('watch', function () {
  // gulp.start('connect');

  // Watch our views
  watch(assets.src.views, function() {
    gulp.start('views');
  });

  // Watch our styles
  watch(assets.src.styles, function(){
    gulp.start('compile-styles');
  });

  // Watch our scripts
  watch(assets.src.scripts, function() {
    gulp.start('compile-scripts');
  });

  // Watch our images
  watch(assets.src.images, function() {
    gulp.start('copy-images');
  });

  // Watch our data
  watch(assets.src.sampleData, function() {
    gulp.start('copy-data');
  });

  // Watch our font
  watch(assets.src.font, function() {
    gulp.start('copy-font');
  });

});

/**
 * Compile styles and scripts.
 */
gulp.task('compile', ['views',
  'compile-styles',
  'copy-images',
  'copy-font',
  'compile-scripts',
  'copy-data'
], function () {

});
