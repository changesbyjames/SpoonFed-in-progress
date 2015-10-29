var gulp = require('gulp'),
    connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('prefix', function () {
    return gulp.src('styles/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('styles'));
});

gulp.task('serve', function() {
    connect.server({
        root: [__dirname],
        port: 7000,
        livereload: true
    });
});