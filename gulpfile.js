const {src, dest, series, parallel, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const browser = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const squoosh = require('gulp-libsquoosh')
const terser = require('gulp-terser')
const del = require('del')
const htmlmin = require('gulp-htmlmin');


function styles() {
  return src('src/sass/main.scss', {sourcemaps: true})
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(dest('build/css/', {sourcemaps: '.'}))
}

function js() {
  return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('build/js'))
}

function html() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build'))
}

function server(cb) {
  browser.init({
    server: {
      baseDir: 'build'
    },
    ui: false,
    cors: true,
    notify: false
  })
  cb()
}

function clear() {
  return del('build')
}

function sprite() {
  return src('src/img/icons/*.svg')
    .pipe(svgmin({
      multipass: true
    }))
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(dest('build/img'))
}

function svg() {
  return src('src/img/*.svg')
    .pipe(svgmin({
      multipass: true
    }))
    .pipe(dest('build/img'))
}

function img() {
  return src('src/img/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(dest('build/img'))
}

function webp() {
  return src(['src/img/*.{jpg,png}', '!src/img/favicons/*.{jpg,png}'])
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(dest('build/img'))
}

function copy() {
  return src([
    'src/fonts/*.woff2',
    'src/js/*.js'
  ], {
    base: 'src'
  })
    .pipe(dest('build'))
}

function reload(cb) {
  browser.reload()
  cb()
}

function watcher() {
  watch('src/sass/**/*.scss', series(styles, reload))
  watch('src/*.html', series(html, reload))
}

exports.default = series(
  clear,
  copy,
  img,
  parallel(
    styles,
    js,
    html,
    svg,
    sprite,
    webp,
  ),
  series(
    server,
    watcher
  )
)

exports.build = series(
  clear,
  copy,
  img,
  parallel(
    styles,
    js,
    html,
    svg,
    sprite,
    webp,
  )
)