'use strict';

const gulp = require('gulp'),
      newer = require('gulp-newer'),
      imagemin = require('gulp-imagemin'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      gutil = require('gulp-util'),
      pump = require('pump'),
      lodash = require('lodash'),
      browsersync = require('browser-sync');


const folder = { 
    src: 'src/',     // source files
    dist: 'dist/'   // build/distribution files
};


// 
// Copy assets/vendors from their node_module package to scss & js folder
//
// 1. Example: `fullcalendar` plugin:
//
// After installing `fullcalendar` plugin through npm, we copy its main css
// file to Dashboard's scss folder and copy its main js file to our Dashboard's 
// js folder. Same method used for other plugins/vednors.
// 
// Read More: https://florian.ec/articles/frontend-dependencies-npm/
//

gulp.task('copy-assets', function() {
    var assets = {
        js: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', // bootstrap & popper.js
            './node_modules/moment/min/moment.min.js',
            './node_modules/fullcalendar/dist/fullcalendar.js', // [1]
            './node_modules/chart.js/dist/chart.min.js',
            './node_modules/dragula/dist/dragula.min.js',
            './node_modules/select2/dist/js/select2.full.min.js',
            './node_modules/dropzone/dist/min/dropzone.min.js',
            './node_modules/datatables.net/js/jquery.dataTables.js',
            './node_modules/@fengyuanchen/datepicker/dist/datepicker.min.js',
            './node_modules/jqvmap/dist/jquery.vmap.min.js',
            './node_modules/jqvmap/dist/maps/jquery.vmap.world.js',
            './node_modules/jquery-match-height/dist/jquery.matchHeight-min.js',
            './node_modules/imagesloaded/imagesloaded.pkgd.min.js'
        ],
        scss: [
            './node_modules/bootstrap/dist/css/bootstrap-grid.css',
            './node_modules/fullcalendar/dist/fullcalendar.css', // [1]
            './node_modules/dragula/dist/dragula.css',
            './node_modules/select2/dist/css/select2.css',
            './node_modules/dropzone/dist/dropzone.css',
            './node_modules/@fengyuanchen/datepicker/dist/datepicker.css',
            './node_modules/jqvmap/dist/jqvmap.css'
        ] 
    };
    lodash(assets).forEach(function (assets, type) {
        if (type == "scss") { 
            gulp.src(assets)
            .pipe(rename({ // rename example.css to _example.scss
                prefix: '_',
                extname: '.scss'
            }))
            .pipe(gulp.dest(folder.src + 'scss/vendor'));
        } else {
            gulp.src(assets).pipe(gulp.dest(folder.src + 'js/vendor'));
        }
    });
});

// image processing
gulp.task('imageMin', function(){
    var out = folder.dist + 'img';
    return gulp.src(folder.src + 'img/**/*')
        .pipe(newer(out))
        .pipe(imagemin())
        .pipe(gulp.dest(out));
});

// copy fonts
// copy fonts from src folder to dist folder
gulp.task('fonts', function(){
    var out = folder.dist + 'fonts/';

    return gulp.src([
            folder.src + 'fonts/**/*', 
        ])
        .pipe(gulp.dest(out));
});

// copy html
// copy html files from src folder to dist folder, also copy favicons
gulp.task('html', function(){
    var out = folder.dist;

    return gulp.src([
            folder.src + '*.html',
            folder.src + '*.ico', // favicons
            folder.src + 'browserconfig.xml',
            folder.src + '*.png'
        ])
        .pipe(gulp.dest(out));
});

// compile & minify sass
gulp.task('css', function () {
    return gulp.src([
            folder.src + '/scss/main.scss',
            folder.src + '/scss/front.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(autoprefixer({
            browsers: ['last 2 version']
        }))
        .pipe(gulp.dest(folder.dist + 'css/'))
        .pipe(rename({ // rename main.css to main.min.css
            suffix: ".min"
        }))
        .pipe(cssnano({ // minify css
            discardComments: {removeAllButFirst: true}
        }))
        .pipe(sourcemaps.write('./')) // source maps for main.min.css
        .pipe(gulp.dest(folder.dist + 'css/'));
});

// js
gulp.task('javascript', function(){
    var out = folder.dist + 'js/';

    // It's important to keep files at this order 
    // so that `main.min.js` can be executed properly
    return gulp.src([
            folder.src + 'js/vendor/jquery.min.js',
            folder.src + 'js/vendor/bootstrap.bundle.min.js', 
            folder.src + 'js/vendor/moment.min.js',
            folder.src + 'js/vendor/chart.min.js',
            folder.src + 'js/vendor/dragula.min.js',
            folder.src + 'js/vendor/select2.full.min.js',
            folder.src + 'js/vendor/dropzone.min.js', 
            folder.src + 'js/vendor/jquery.dataTables.js',
            folder.src + 'js/vendor/fullcalendar.js', 
            folder.src + 'js/vendor/datepicker.min.js',
            folder.src + 'js/vendor/jquery.vmap.min.js',
            folder.src + 'js/vendor/jquery.vmap.world.js',
            folder.src + 'js/vendor/jquery.matchHeight-min.js',
            folder.src + 'js/fullcalendar-custom.js',
            folder.src + 'js/chart-custom.js',
            folder.src + 'js/sidebar.js',
            folder.src + 'js/switch.js',
            folder.src + 'js/toggle.js',
            folder.src + 'js/todo.js',
            folder.src + 'js/chat-dialogue.js',
            folder.src + 'js/main.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(out))
        .pipe(rename({ // rename main.css to main.min.css
            suffix: ".min"
        }))
        .pipe(uglify())
        //.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(out));
});

// live browser loading
gulp.task('browserSync', function() {
    browsersync.init({
        server: {
            baseDir: folder.dist 
        }
    });
});

// watch all changes
gulp.task('watch', function(){
    gulp.watch(folder.src + '*.html', ['html', browsersync.reload]);
    gulp.watch(folder.src + 'img/**/*', ['imageMin', browsersync.reload]);
    gulp.watch(folder.src + 'fonts/**/*', ['fonts', browsersync.reload]);
    gulp.watch(folder.src + 'scss/**/*', ['css', browsersync.reload]);
    gulp.watch(folder.src + 'js/**/*', ['javascript', browsersync.reload]);
});

// default task
gulp.task('default', 
    ['copy-assets', 'html', 'imageMin', 'fonts', 'css', 'javascript', 'browserSync', 'watch']);