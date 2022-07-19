/* eslint-disable no-undef */
'use strict';

const destFolder = './dist';
const destNpmFolder = `${destFolder}/npm-package`;
const srcFolder = './src';

const destfilename = 'checkout.js'
const destBundlefilename = 'main.js'
const destFile = `${destFolder}/${destfilename}`;
const destBundleFile = `${srcFolder}/${destBundlefilename}`;

const packageJson = 'package.json';
const readme = 'README.md';

const { series, src, dest, watch } = require('gulp');
const rollup = require('rollup');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const babel = require('gulp-babel');

async function build() {
    const bundle = await rollup.rollup({
        input: destBundleFile
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
        .pipe(dest(destFolder))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest(destFolder));
}

function minifyES5(){
    return src(destFile)
        .pipe(babel({
            presets: ["@babel/preset-env"]   
        }))
        .pipe(rename(`checkout.es5.js`))
        .pipe(dest(destFolder))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest(destFolder));
}

function generateNpmPackage(){
    return src([destFile, packageJson, readme])
        .pipe(dest(destNpmFolder));
}

exports.build = series(build, minify, minifyES5, generateNpmPackage);
exports.default = function(){
    watch(['src/*.js', 'src/*/*.js'], { ignoreInitial: false }, series(build, minify, minifyES5));
};