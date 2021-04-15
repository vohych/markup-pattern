const  projectFolder = "./build-app";
const sourceFolder = "./src";

const path = {

    build: {

        html: projectFolder + "/",
        extendHtml: projectFolder + "/extend-file/",
        css: projectFolder + "/css/",
        extendCss: projectFolder + "/css/",
        fonts: projectFolder + "/fonts/",
        js: projectFolder + "/js/",
        jsFolder: projectFolder + "/js/",
        img: projectFolder + "/img/",
        svg: projectFolder + "/svg/",
        tempSvg: projectFolder + "/svg/temp-file/",
        video: projectFolder + "/video/",

    },
    src: {

        html: [sourceFolder + "/*.html", '!' + sourceFolder + "/extend.*.html"],
        extendHtml: [sourceFolder + "extend-file/extend-*/*.html", '!' + sourceFolder + "extend-file/extend-*/extend.*.html"],
        css: sourceFolder + "/scss/style.*.scss",
        extendCss: sourceFolder + "/scss/*.scss",
        fonts: sourceFolder + "/fonts/*",
        js: sourceFolder + "/js/*.js",
        jsFolder: sourceFolder + "/js/extend-*/*.js",
        img: sourceFolder + "/img/*",
        svg: sourceFolder + "/svg/*",
        tempSvg: sourceFolder + "/svg/temp-file/*.*",
        video: sourceFolder + "/video/*",

    },
    watch: {

        html: sourceFolder + "/*.html",
        extendHtml: sourceFolder + "/extend-file/extend-*/*.html",
        css: sourceFolder + "/scss/style.*.scss",
        extendCss: sourceFolder + "/scss/extend-*/extend.*.scss",
        fonts: sourceFolder + "/fonts/*",
        js: sourceFolder + "/js/*.js",
        jsFolder: sourceFolder + "/js/extend-*/*.js",
        img: sourceFolder + "/img/*",
        svg: sourceFolder + "/svg/*.svg",
        tempSvg: sourceFolder + "/svg/temp-file/*.svg",
        video: sourceFolder + "/video/*",

    },

    clean: './' + projectFolder

}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

const option = [

    queue = true,
    useFsEvents = false,
    usePolling = false,
    interval = 1,
    binaryInterval = 1,
    useFsEvents = true,
    atomic = 1,

]

function browserSync(params) {

    browsersync.init({

        server: {
            baseDir: './' + projectFolder + '/',
        },
        port: 3000,
        notify: false

    });

}

function html() {

    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html, option))
        .pipe(browsersync.stream())

}

function extendHtml() {

    return src(path.src.extendHtml)
        .pipe(fileinclude())
        .pipe(dest(path.build.extendHtml, option))
        .pipe(browsersync.stream())

}

function img() {

    return src(path.src.img)

        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())

}

function js() {

    return src(path.src.js)

        .pipe(dest(path.build.js, option))
        .pipe(browsersync.stream())

}

function jsFolder() {

    return src(path.src.jsFolder)

        .pipe(dest(path.build.jsFolder, option))
        .pipe(browsersync.stream())

}

function svg() {

    return src(path.src.svg)

        .pipe(dest(path.build.svg))
        .pipe(browsersync.stream())

}

function tempSvg() {

    return src(path.src.tempSvg)

        .pipe(dest(path.build.tempSvg))
        .pipe(browsersync.stream())

}

function video() {

    return src(path.src.video)

        .pipe(dest(path.build.video))
        .pipe(browsersync.stream())

}

function fonts() {

    return src(path.src.fonts)

        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())

}

function css() {

    return src(path.src.css)

        .pipe(scss({

                // outputStyle: 'compressed', // всё в одну строку
                outputStyle: 'expanded',

            })
        )
        // .pipe(autoprefixer({
        //
        //     overrideBrowserslist: ['last 4 versions'],
        //
        // }))
        .pipe(dest(path.build.css, option))
        .pipe(browsersync.stream())

}

function extendCss() {

    return src(path.src.extendCss)
        .pipe(scss({

                outputStyle: 'expanded'

            })
        )
        // .pipe(autoprefixer({
        //
        //     overrideBrowserslist: ['last 0 versions'],
        //
        // }))
        .pipe(dest(path.build.extendCss, option))
        .pipe(browsersync.stream())

}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.extendHtml], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.extendCss], extendCss);
    gulp.watch([path.watch.js], js);
}

function clean() {
    return del(path.clean)
}

let buildGlobal = gulp.series(clean, css, html, js, jsFolder ,extendHtml,extendCss, img, svg, tempSvg, fonts, video);
let build = gulp.series(gulp.parallel(css ,extendCss), html, js, jsFolder ,extendHtml);
let watch = gulp.parallel(  watchFiles, browserSync );

const exportVar = exports;
// exportVar.fonts = fonts;
exportVar.video = video;
exportVar.css = css;
exportVar.extendCss = extendCss;
exportVar.img = img;
exportVar.js = js;
exportVar.jsFolder = jsFolder;
// exportVar.svg = svg;
exportVar.tempSvg = tempSvg;
exportVar.html = html;
exportVar.extendHtml = extendHtml;
exportVar.build = build;
exportVar.buildGlobal = buildGlobal;
// exports.watch = watch;
exportVar.default = watch;