const gulp = require('gulp')
const nunjucksRender = require('gulp-nunjucks-render')
const data = require('gulp-data')
const plumber = require('gulp-plumber')
const connect = require('gulp-connect-multi')()
const clean = require('gulp-clean')

const folderName = 'public'
const resourceFolders = './source'
const targetFolder = `./${folderName}`

gulp.task(
  'connect',
  connect.server({
    root: [folderName],
    port: 1337,
    livereload: true,
    open: {
      browser: 'Google Chrome' // if not working OS X browser: 'Google Chrome'
    }
  })
)

gulp.task('nunjucks', function () {
  return gulp
    .src(resourceFolders + '/nunjucks/*.+(html|nunjucks|njk)')
    .pipe(
      plumber(error => {
        const errName = error.name
        const errFile = error.fileName.split('/').pop()
        const errMsg = error.message
        console.log(`${errName} on ${errFile}\nMessage:\n${errMsg}`)
      })
    )
    .pipe(
      data(function () {
        return require(resourceFolders + '/nunjucks/data.json')
      })
    )
    .pipe(
      nunjucksRender({
        path: [resourceFolders + '/nunjucks'],
        ext: '.html'
      })
    )
    .pipe(gulp.dest(targetFolder))
    .pipe(connect.reload())
})

gulp.task('clean', function () {
  return gulp.src(`${folderName}/*.html`, { read: false }).pipe(clean())
})

gulp.task('watch', function (done) {
  gulp.watch(
    resourceFolders + '/nunjucks/**/*.+(html|nunjucks|njk)',
    gulp.parallel('nunjucks')
  )
  done()
})

gulp.task('compile', gulp.parallel('nunjucks'))

gulp.task(
  'default',
  gulp.parallel(
    'connect',
    'nunjucks',
    'watch'
  )
)
