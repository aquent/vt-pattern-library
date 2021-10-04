import autoprefixer from 'autoprefixer';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import cssnano from 'cssnano';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: 
    {
      file: 'scss/dist/main.js',
      format: 'iife',
      sourcemap: 'inline'
    },
  plugins: [
    nodeResolve({
      moduleDirectories: [
        'node_modules/',
        'js/'
      ]
    }),
    commonjs(),
    babel(),
    terser(),
    scss({
      output: 'scss/dist/styles.css',
      processor: () => postcss([
        postcssImport(),
        autoprefixer({
          overrideBrowserslist: 'last 4 versions',
        }),
        cssnano()
      ]),
      sourceMap: true,
      watch: 'scss/partials'
    }),
    copy({
      hook: 'writeBundle',
      targets: [
        { src: 'scss/dist/main.js', dest: 'public/js' },
        { src: 'scss/dist/styles.*', dest: 'public/css/dist' }
      ],
      verbose: true
    })
  ],
  watch: 'js/**'
}
