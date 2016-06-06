var gulp = require('gulp'),
	sass = require('gulp-sass'),
	minifycss = require('gulp-cssmin')

gulp.task('sass', function() {
	gulp.src('src/css/**/*.scss')
		.pipe(sass())
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'))

	gulp.src('src/css/fonts/*')
		.pipe(gulp.dest('dist/css/fonts'))
})

gulp.task('images', function() {
	gulp.src('src/images/**/*')
		.pipe(gulp.dest('dist/images'))
})

gulp.task('html', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'))
})

gulp.task('default', ['images', 'sass', 'html'], function() {
	gulp.watch('src/sass/**/*', ['sass'])
	gulp.watch('src/index.html', ['html'])
})