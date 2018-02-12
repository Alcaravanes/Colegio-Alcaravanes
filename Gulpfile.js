var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var babel = require('babelify')
var preset =  require('babel-preset-es2015');
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var watchify = require('watchify')

gulp.task('assets_web', function () {
	gulp
		.src('assets/*')
		.pipe(gulp.dest('public/sitio_web'))
})

gulp.task('styles_web', function () {
    gulp
        .src('app/public/index.scss')
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('public/sitio_web'))
})

gulp.task('colegio_styles_web', function () {
    gulp
        .src('app/colegio/index.scss')
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('public/colegio'))
})

function compile(watch) {
	var bundle = browserify('./app/public/src/index.js', {debug: true})

	if (watch) {
		bundle = watchify(bundle)
		bundle.on('update', () => {
			console.log('--> Bundling...')
			rebundle()
		})
	}
	function rebundle() {
    	bundle
      		.transform(babel, { presets: ['es2015']})
		    .bundle()
		    .on('error',(err) => { console.log(err); this.emit('end') })
		    .pipe(source('index.js'))
		    .pipe(rename('app.js'))
		    .pipe(gulp.dest('public/sitio_web'));
		}
	rebundle()
}


function colegioCompile(watch) {
    var bundle = browserify('./app/colegio/src/index.js', {debug: true})

    if (watch) {
        bundle = watchify(bundle)
        bundle.on('update', () => {
            console.log('--> Bundling...')
            colegioRebundle()
        })
    }
    function colegioRebundle() {
        bundle
            .transform(babel, { presets: ['es2015']})
            .bundle()
            .on('error',(err) => { console.log(err); this.emit('end') })
            .pipe(source('index.js'))
            .pipe(rename('app.js'))
            .pipe(gulp.dest('public/colegio'));
        }
    colegioRebundle()
}

gulp.task('build_web', function () {
	return compile()
})

gulp.task('watch_web', function () {
	return compile(true)
})

gulp.task('colegio_build_web', function () {
    return colegioCompile()
})

gulp.task('colegio_watch_web', function () {
    return colegioCompile(true)
})

gulp.task('colegio', ['colegio_styles_web', 'colegio_build_web', 'colegio_watch_web'])
gulp.task('web', ['styles_web', 'build_web', 'watch_web', 'assets_web'])


