let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    concat = require('gulp-concat'),
    uglifyJs = require('gulp-uglifyjs'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    runSequence = require('run-sequence'),
    minifyCSS = require('gulp-minify-css');


//Development Tasks
//--------------------
gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer([
            'last 10 versions'
        ], {
            cascade: true
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream : true
        }));
});

//Watchers
//-----------------
gulp.task('watch', ['browserSync'], () => {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/**/*.html', browserSync.reload);
});

// Start browserSync server
gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: 'src'
        },
    })
});


//Optimisation Tasks
//----------------

//Optimising Css and JavaScript
gulp.task('useref', () => {

    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', minifyCSS()))
        .pipe(gulpIf('*.js', uglifyJs()))
        .pipe(gulp.dest('build'))
});

gulp.task('min-js', () => {
    return gulp.src('node_modules/angular/angular.js')
        .pipe(concat('angular.min.js'))
        .pipe(uglifyJs())
        .pipe(gulp.dest('src/js'));
});

//Optimising Images
gulp.task('images', () => {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('build/images'))
});

// Copying fonts
gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
});

//Copying Minified JS
gulp.task('copyFrameworkJS', () => {
    return gulp.src('src/js/*.min.js')
        .pipe(gulp.dest('build/scripts'))
});

//Copying assets
gulp.task('copyAssets', () => {
    return gulp.src('assets/*.html')
        .pipe(gulp.dest('build/assets'))
});

// Cleaning
gulp.task('clean', (callback) => {
    del('build');
    return cache.clearAll(callback);
});

gulp.task('clean-dist', () => {
    del(['build/**/*', '!build/images', '!build/images/**/*'])
});


// Build Sequences
// ---------------

//prod version
gulp.task('build', (callback) => {
    runSequence('clean-dist',
        'sass',
        'min-js',
        ['useref', 'copyFrameworkJS', 'copyAssets', 'images', 'fonts'],
        callback);
});

//realtime developing server
gulp.task('dev', (callback) => {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});
