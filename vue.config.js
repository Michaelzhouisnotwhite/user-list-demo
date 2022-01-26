module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    port: 8081, // 端口
    // proxy: 'https://www.escook.cn'
  }
}