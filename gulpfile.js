var gulp = require('gulp')
var webpack = require('webpack')
var sh = require('shelljs')

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

gulp.task('serve:nodemon', function (done) {
  sh.exec('./node_modules/.bin/nodemon --watch ./src/server ./node_modules/.bin/babel-node ./src/server/index.js',
    function() {done()})
})

gulp.task('serve:webpack', function (done) {
  sh.exec('webpack-dev-server --hot --inline --colors --content-base=\'./src\' --config=\'webpack.client.js\'',
    function() {done()})
})

gulp.task('serve:nodemon:debug', function() {
  sh.exec('./node_modules/.bin/nodemon --watch ./src/server ./node_modules/.bin/babel-node --debug --stage 0 -- ./src/server/index.js --debug',
    function() {done()})
})

gulp.task('serve:nodemon:inspector', function() {
  sh.exec('./node_modules/.bin/nodemon --watch ./src/server ./node_modules/.bin/node-inspector --web-port=8081',
    function() {done()})
})

gulp.task('debug', ['serve:webpack', 'serve:nodemon:debug', 'serve:nodemon:inspector', 'build:style', 'watch'])


if (process.env.NODE_ENV !== 'production') {

  gulp.task('watch', function() {
    gulp.watch('./src/**/*.styl', ['build:style'])
    gulp.watch('./src/client/**/*.js', ['build:client'])
  })

  gulp.task('build', ['build:client', 'serve:nodemon', 'build:style'])
  gulp.task('default', ['build', 'watch'])
}
else {
  gulp.task('watch', function() {
    gulp.watch('./src/server/**/*.js', ['build:server'])
    gulp.watch('./src/client/**/*.js', ['build:client'])
    gulp.watch('./src/**/*.styl', ['build:style'])
  })

  gulp.task('build', ['build:client', 'build:server', 'build:style'])
  gulp.task('default', ['build', 'watch'])
}