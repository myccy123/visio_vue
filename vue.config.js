module.exports = {
    // assetsDir: 'static/vue_vision/',
    publicPath: process.env.NODE_ENV === 'production'? '/static/vue_vision/': '/',
    // devServer: {
    //     disableHostCheck: true,
    //     // 设置请求代理
    //     proxy: {
    //         '/': {
    //             target: 'http://192.168.43.180:8000',
    //             ws: false,
    //             changeOrigin: true
    //         }
    //     }
    // }
}