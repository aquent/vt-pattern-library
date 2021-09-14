import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import cssnano from 'cssnano';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';

const target = process.env.TARGET;

const postcssConfig = [
  postcssImport(),
  autoprefixer({
    overrideBrowserslist: 'last 4 versions',
  })
];

let minfile = '';

// If we are in production mode, then add cssnano to minify CSS
if (target === 'production') {
  minfile = 'min.';

  postcssConfig.push(
    cssnano({
      preset: 'default',
    })
  );
} 

export default {
  input: 'main.js',
  output: [
    {
      file: 'dist/main.js',
      format: 'iife',
      sourcemap: 'inline'
    },
    {
      file: 'dist/main.min.js',
      format: 'iife',
      plugins:[
        terser()
      ]
    },
  ],
  plugins: [
    nodeResolve({
      moduleDirectories: [
        'node_modules/',
        'js/'
      ]
    }),
    commonjs(),
    babel(),
    scss({
      includePaths: [
          'node_modules/'
        ],
      output: `dist/styles.${minfile}css`,
      processor: () => postcss(postcssConfig),
      sourceMap: (target === 'development' ? true : false),
      watch: 'partials'
    }),
    copy({
      hook: 'writeBundle',
      targets: [
        { src: 'dist/styles.css', dest: '../public/css/dist' },
        { src: 'dist/main.js', dest: '../public/js' }
      ],
      verbose: true
    })
  ],
  watch: 'js/**'
}
