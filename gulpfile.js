const {src, dest, series, parallel, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const browser = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const {notify} = require("browser-sync");

function styles() {
  return src('src/sass/main.scss', {sourcemaps: true})
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(dest('src/css/', {sourcemaps: '.'}))
}

function server(cb) {
  browser.init({
    server: {
      baseDir: 'src'
    },
    ui: false,
    cors: true,
    notify: false
  })
  cb()
}

function reload(cb) {
  browser.reload()
  cb()
}

function watcher() {
  watch('src/sass/**/*.scss', series(styles, reload))
  watch('src/*.html', reload)
}

exports.default = series(
  styles,
  server,
  watcher
)