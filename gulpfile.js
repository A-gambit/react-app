var gulp = require('gulp')
var webpack = require('webpack')

var minifyCSS = require('gulp-minify-css')
var concat = require('gulp-concat')
var autoprefixer = require('gulp-autoprefixer')
var stylus = require('gulp-stylus')
var Filter = require('gulp-filter')


var tasks = ['client', 'server']
var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
]

tasks.forEach(function (name) {
  gulp.task('build:' + name, function (done) {
    var config = require('./webpack.' + name)
    webpack(config, function () {done()})
  })
})

gulp.task('build:style', function () {
  return gulp.src('./src/**/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer('last 15 versions'))
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/assets/'))
})

gulp.task('watch', function() {
  gulp.watch('./src/server/**/*.js', ['build:server'])
  gulp.watch('./src/client/**/*.js', ['build:client'])
  gulp.watch('./src/**/*.styl', ['build:stylus'])
})

gulp.task('build', ['build:client', 'build:server', 'build:style'])
gulp.task('default', ['build', 'watch'])

if (process.env.NODE_ENV !== 'production') {
  var nodemon = require('gulp-nodemon')
  var sh = require('shelljs')

  gulp.task('serve:nodemon', ['build'], function () {
    nodemon({
      script: './dist/index.js',
      tasks: 'build-server',
      watch: './src/index.js'
    })
  })

  gulp.task('serve:webpack', function (done) {
    sh.exec('webpack-dev-server --hot --inline --colors --content-base=\'./src\' --config=\'webpack.client.js\'',
      function() {done()})
  })
}