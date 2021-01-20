'use strict';

const destFolder = './dist';

const destfilename = 'checkout.js'
const destFile = `${destFolder}/${destfilename}`;

const { series, src, dest, watch } = require('gulp');
const rollup = require('rollup');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const babel = require('gulp-babel');


async function build() {
    const bundle = await rollup.rollup({
        input: './src/main.js',
        plugins: [
            babel({ 
                presets: [
                    "@babel/preset-env",
                    {
                        "modules": true
                    }
                ],
                babelHelpers: 'bundled' 
            })
        ]
    });

    return await bundle.write({
        file: destFile,
        format: 'es',
        name: destfilename,
        sourcemap: true
    });
}

function minify() {
    return src(destFile)
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest(destFolder));
}


exports.build = build;
exports.default = function(){
    watch(['src/*.js', 'src/*/*.js'], { ignoreInitial: false }, series(build, minify));
};