var gulp = require('gulp'),
	sass = require('gulp-sass'),
	minifycss = require('gulp-cssmin'),
	config = require('./package.json'),
	mergeStream = require('merge-stream'),
	replace = require('gulp-replace'),
	preprocess = require('gulp-preprocess')

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

gulp.task('js', function() {
	gulp.src('src/js/**/*')
		.pipe(preprocess({context: {env: 'dev'}}))
		.pipe(gulp.dest('dist/js'))
})

gulp.task('html', function() {
	gulp.src('src/index.html')
		.pipe(preprocess({context: {env: 'dev'}}))
		.pipe(gulp.dest('dist'))
})

gulp.task('default', ['images', 'sass', 'html', 'js'], function() {
	gulp.watch('src/css/**/*', ['sass'])
	gulp.watch('src/index.html', ['html'])
	gulp.watch('src/js/**/*', ['js'])
	gulp.watch('src/images/**/*', ['images'])
})

gulp.task('cuat', function() {
	var base = config.name;
	var tasks  = []

	tasks.push(gulp.src('./src/css/**/*.scss')
		.pipe(replace('./fonts/', ''))
		.pipe(replace('/src/css/fonts/', '/css/'+base+'/'))
		.pipe(replace('../images/', '/images/'+base+'/'))
		.pipe(replace('../../src/images/', '/images/'+base+'/'))
		.pipe(sass())
		.pipe(minifycss())
		.pipe(gulp.dest('./cuat/css/'+base+'/')))

	tasks.push(gulp.src('./src/css/fonts/**/*')
		.pipe(gulp.dest('./cuat/css/'+base+'/')))

	tasks.push(gulp.src('./src/js/**/*.js')
		.pipe(preprocess({context: {env: 'prod'}}))
		.pipe(gulp.dest('./cuat/javascript/'+base+'/')))

	tasks.push(gulp.src('./src/images/**/*')
		.pipe(gulp.dest('./cuat/images/'+base+'/')))

	tasks.push(gulp.src('src/index.html')
		.pipe(preprocess({context: {env: 'prod'}}))
		.pipe(replace('src/','/javascript/'+base+'/'))
		.pipe(replace(/("|')(node_modules\/.*)("|')/g, function(string) {
			var filename = string.match(/[^\/]*$/g)[0].replace(/"|'/g, '');
			return '"./js/'+filename+'"'
		}))
		.pipe(replace('./js', '/javascript/'+base))
		.pipe(replace('./css', '/css/'+base))
		.pipe(replace('./images', '/images/'+base))
		.pipe(replace(/<html.*>/g,'')).pipe(replace('</html>',''))
		.pipe(replace(/<body.*>/g,'')).pipe(replace('</body>',''))
		.pipe(replace(/<head.*>/g,'')).pipe(replace('</head>',''))
		.pipe(replace(/<head.*>/g,'')).pipe(replace('</head>',''))
		.pipe(replace(/<!DOCTYPE html>/g, ''))
		.pipe(gulp.dest('./cuat'))
	)

	return mergeStream(tasks)
});