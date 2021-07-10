module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: './',
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Vue-chatBotBox',
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'index',
      ],
    },
    TestingScript: {
      entry: 'src/TestingScript.ts',
      template: 'public/index.html',
      filename: 'TestingScript.html',
      title: '測試頁',
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'TestingScript',
      ],
    },
  },
};
