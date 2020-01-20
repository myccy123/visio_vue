const path = require("path");
module.exports = {
    mode: "production", //打包为开发模式
    // 出口对象中，属性为输出的js文件名，属性值为入口文件
    entry: ["./public/packer/vision127"], //入口文件,从项目根目录指定
    output: { //输出路径和文件名，使用path模块resolve方法将输出路径解析为绝对路径
        path: path.resolve(__dirname, "./dist"), //将js文件打包到dist/js的目录
        filename: "vision.min.js"
    }
}
