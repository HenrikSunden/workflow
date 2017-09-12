var gulp = require('gulp');
var sass = require('gulp-sass');


/* make taks called "sass" functioning and compiling sass to css */
gulp.task('sass', function(){
	return gulp.src('src/scss/app.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('app/css'))
});

/* make */
gulp.task('default' , ['sass']);