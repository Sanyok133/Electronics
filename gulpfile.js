const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const browser = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const sprite = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');

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

function svg() {
  return src('src/img/icons/*.svg')
    .pipe(svgmin({
      multipass: true,
      js2svg: {
        pretty: true,
        indent: 2,
      }
    }))
    .pipe(sprite())
    .pipe(rename('sprite.svg'))
    .pipe(dest('src/img'))
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
  svg,
  server,
  watcher
)