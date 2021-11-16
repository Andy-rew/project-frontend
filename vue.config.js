module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/etuclasses' : '/',
  configureWebpack: {
    devtool: 'source-map',
    plugins: []
  },
  runtimeCompiler: true
}
