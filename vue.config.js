module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    runtimeCompiler: true,
    configureWebpack: {
      // Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
      resolve: {
        symlinks: false
      },
      externals: {
        // global app config object
        config: JSON.stringify({
          apiUrl: process.env.VUE_APP_API_BASE_URL
        })
      }
    },
    devServer: {
      disableHostCheck: true
    }
  }
  