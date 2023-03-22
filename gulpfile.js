var gulp = require("gulp")
var sass = require("gulp-sass")
var browserSync = require("browser-sync").create()
var concat = require("gulp-concat")
var babel = require("gulp-babel")
var npmDist = require("gulp-npm-dist")
var sourcemaps = require('gulp-sourcemaps')
const jsValidate = require('gulp-jsvalidate')
const minify = require('gulp-minify')

// SERVE
function serve () {
	// browserSync.init({
	// 	proxy: "http://localhost:8080/rederi/prototype/src/",
	// 	port: 3000
	// });
	gulp.watch("./src/assets/sass/**/*.scss", css);
	// gulp.watch("./src/assets/js-src/**/*.js", js);
	// gulp.watch("./src/assets/js-src/**/*.js").on("change", browserSync.reload);
	// gulp.watch("./src/**/*.html").on("change", browserSync.reload);
	// gulp.watch("./src/**/*.php").on("change", browserSync.reload);
}
gulp.task(serve)

// SASS
function css () {
	return (
		gulp
			.src("./src/assets/sass/app.scss")
			.pipe(concat("./styles.min.css"))
			.pipe(sourcemaps.init())
			.pipe(sass().on("error", sass.logError))
			.pipe(sass({ outputStyle: 'compressed' }))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest("./src/assets/css"))
			.pipe(browserSync.stream())
	)
}
gulp.task(css)

// JS
// function js () {
// 	return gulp
// 		.src(["./src/assets/js-src/**/*.js"])
// 		.pipe(jsValidate())
// 		.pipe(sourcemaps.init())
// 		.pipe(babel({ presets: ["@babel/env"] }))
// 		.pipe(concat("app.js"))
// 		.pipe(sourcemaps.write('.'))
// 		.pipe(minify({
// 			ext:{
// 				min:'.min.js'
// 			},
// 		}))
// 		.pipe(gulp.dest("./src/assets/js"))
// }
// gulp.task(js)

// LIBS
function libs () {
	return gulp
		.src(npmDist(), { base: "./node_modules" })
		.pipe(gulp.dest("./src/assets/libs"))
}
gulp.task(libs)

// gulp.task("default", gulp.series(css, libs))

gulp.task("start", gulp.series(css, libs, serve))
