/// <binding />

var gulp = require("gulp"),
    extreplace = require('gulp-ext-replace'),
    typescript = require('gulp-typescript'),
    rename = require("gulp-rename"),
    minifyCss = require("gulp-minify-css"),    //壓縮css
    minifyHtml = require("gulp-minify-html"),  //壓縮html
    concat = require("gulp-concat"),    //合併js文件
    uglify = require("gulp-uglify"),    //壓縮js代碼
    cache = require("gulp-cache");    //圖片緩存，只有圖片替換了才壓縮

var tsProject = typescript.createProject('tsconfig.json');

//壓縮css
gulp.task("minify-css", function () {
    return gulp.src("assets/css/**/*.css")  //原文件
    .pipe(rename({ suffix: '.min' }))  //在原文件名後面加.min
    .pipe(minifyCss())
    .pipe(gulp.dest("dist/css"));        //目標目錄
});
//合併js
gulp.task("concat", function () {
    return gulp.src("assets/js/**/*.js")
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
});
//壓縮js
gulp.task("uglify", function () {
    return gulp.src("assets/js/**/*.js")
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
});
gulp.task('buildts', function () {
    return gulp.src("assets/ts/**/*.ts")
        .pipe(rename({ suffix: '.min' }))
        .pipe(typescript(tsProject))
        .pipe(uglify())
        .pipe(extreplace('.js'))
        .pipe(gulp.dest("dist/js"));
});
gulp.task('buildtsapp', function () {
    return gulp.src("assets/app/**/*.ts")
        .pipe(typescript(tsProject))
        .pipe(uglify())
        .pipe(extreplace('.js'))
        .pipe(gulp.dest("app"));
});

//默認任務，後面為默認執行的所有任務
gulp.task("default", ["minify-css", "concat", "uglify", "buildts", "watchl"]);   //執行defaul

//監聽文件
gulp.task("watchl", function () {
    gulp.watch("assets/css/**/*.css", ['minify-css']);
    gulp.watch("assets/js/**/*.js", ['concat', "uglify"]);
    gulp.watch("assets/ts/**/*.ts", ["buildts"]);
    //gulp.watch("assets/app/**/*.ts", ["buildtsapp"]);
});