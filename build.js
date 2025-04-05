/**
 * build.js
 * Script to bundle and transpile JavaScript (via Babel) and compile SASS using esbuild,
 * outputting minified files directly into the Shopify theme's assets folder.
 *
 * Usage:
 *   npm run build    -> One-time production build (minified)
 *   npm run watch    -> Watch mode with source maps enabled for development
 */

const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');

const watchMode = process.argv.includes('--watch');

(async () => {
  try {

    const { default: babelPlugin } = await import('esbuild-plugin-babel');

    const ctx = await esbuild.context({
      entryPoints: [
        'src/js/tabs.js',           
        'src/scss/landing-rse.scss'  
      ],
      outdir: 'assets',             
      entryNames: '[name]',         
      bundle: true,
      minify: true,
      plugins: [
        sassPlugin({
          type: 'css'              
        }),
        babelPlugin({
          filter: /\.(js|jsx)$/,
          babelOptions: {
            presets: ['@babel/preset-env']  
          }
        })
      ],
      loader: {
        '.png': 'dataurl',
        '.svg': 'dataurl'
      },
      sourcemap: watchMode,
      target: ['es2015']  
    });
    
    if (watchMode) {
      await ctx.watch();
      console.log('Watching for changes...');
    } else {
      await ctx.rebuild();
      console.log('Build succeeded');
    }
  } catch (err) {
    console.error('Build error:', err);
    process.exit(1);
  }
})();