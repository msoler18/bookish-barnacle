const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');

const watchMode = process.argv.includes('--watch');

(async () => {
  try {
    const { default: babelPlugin } = await import('esbuild-plugin-babel');

    const ctx = await esbuild.context({
      entryPoints: [
        'src/js/theme.js',
        'src/scss/main.scss'
      ],
      outdir: 'assets',
      entryNames: '[name]',
      bundle: true,
      minify: !watchMode,
      plugins: [
        sassPlugin({ type: 'css' }),
        babelPlugin({
          filter: /\.(js|jsx)$/,
          babelOptions: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]]
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
      console.log('👀 Watching for changes...');
    } else {
      await ctx.rebuild();
      console.log('🚀 Build succeeded');
      await ctx.dispose();
    }
  } catch (err) {
    console.error('❌ Build error:', err);
    process.exit(1);
  }
})();
