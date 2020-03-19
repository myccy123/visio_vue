const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: isProduction ? '/static/vue_vision/' : '/',
    configureWebpack: config => {
        if (isProduction) {
            config.plugins.push(new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,  //10 Kb
                    minRatio: 0.8
                })
            )
        }
    },
    pages:{
        index:{
          entry:'src/main.js',
          template:'public/index.html',
          filename:'index.html'
        },
        preview:{
          entry:'preview_src/main.js',
          template:'public/preview.html',
          filename:'preview.html',    
        }
      },
      // 生产环境是否生成 sourceMap 文件
      productionSourceMap: false
};