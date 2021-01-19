'use strict';

const destFolder = './dist';
const filename = 'checkout.js'
const resultFile = `${destFolder}/${filename}`;

const { series, src, dest, watch } = require('gulp');
const rollup = require('rollup');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');

async function build() {
    const bundle = await rollup.rollup({
        input: './src/main.js'
    });

    return await bundle.write({
        file: resultFile,
        format: 'es',
        name: filename,
        sourcemap: true
    });
}

function minify() {
    return src(resultFile)
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest(destFolder));
}


exports.build = build;
exports.default = function(){
    watch('src/*.js', { ignoreInitial: false }, series(build, minify));
};