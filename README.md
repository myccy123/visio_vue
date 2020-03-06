# visio_vue
本产品不同于传统的数据可视化开发，我们将数据展现与实际业务解耦，可嫁接在各种业务系统之上。除了主流的图表库，我们设计了一套自定义图表的制作方式，涵盖了所有的Echarts图表。随着图表的积累，可逐渐的形成数据资产，通过组合来生成多种高管驾驶舱。

## DEMO
http://www.janetech.cn:9000/

## Update log
最新版本：**v2.12** ，于2020-3-5更新。

**2020-3-5 更新日志:**  
1、在编辑模版中，新增容器不会再影响已有的大屏布局。  
2、在编辑模版中，删除容器时，移除弹窗确认，改用气泡确认。  
3、新增克隆Chart图的功能。  
4、自定义图的编辑代码，会有语法提示和关键字高亮。

**已知BUG：**  
无


## Project setup
```
npm install
```

##### Compiles and hot-reloads for development
```
npm run serve
```

##### Compiles and minifies for production
```
npm run build
```

##### Configuration

编辑配置文件`/project_root_path/conf/base.js`，
将`getBaseUrl()`函数中的URL改为实际后台服务的地址
```
function getBaseUrl() {
    return 'http://192.168.43.180:8000' //根据实际地址修改
}
```
## Developers
- 于家浩 932320908@qq.com
- 任雄辉

