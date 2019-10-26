<template>
    <footer class="hidden-xs-only">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col class="contact" :span="4">
                <h4>联系我们</h4>
                <ul>
                    <li>邮箱 : <a href="mailto:clientservice@realtoraccess.com">xjq110826@163.com</a></li>
                    <li>客服 : <a href="tel:4008771896">400-877-1896</a></li>
                    <li>地址 : 厦门市集美区乐安南里35号702</li>
                </ul>
            </el-col>
            <el-col class="friend-links" :span="4">
                <h4>友情链接</h4>
                <ul>
                    <li><a href="http://www.realtoraccess.com/">海外瑞安居</a></li>
                    <li><a href="http://www.janetech.cn/">简则科技</a></li>
                    <li><a href="http://www.webmainland.com/">Webmainland</a></li>
                    <li><a href="http://glyphicons.com/">Glyphicons</a></li>
                </ul>
            </el-col>
            <el-col class="cooperation" :span="4">
                <h4>商务合作</h4>
                <img src="@/assets/img/wechat.jpg">
            </el-col>
        </el-row>
        <p class="copy-right">©海外瑞安居（北京）科技发展有限公司 版权所有|京ICP备17003593号</p>
    </footer>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        name: "commonFooter"
    }
</script>

<style scoped>
    a{
        text-decoration: none;
        color: #FFFFFF;
    }

    li{
        list-style: none;
    }

    ul{
        padding: 0px;
    }

    footer{
        padding: 50px 50px 10px 50px;
        background-color: #303133;
    }

    .copy-right{
        text-align: center;
        color: #b9b9b9;
        font-size: 0.9rem;
        margin: 0px;
    }

    footer h4{
        color: #606266;
    }
    .contact{
        height: 200px;
        text-align: center;
    }

    footer li{
        font-size: 14px;
        margin-top: 10px;
        color: #333;
    }

    .friend-links{
        text-align: center;
    }

    .cooperation{
        text-align: center;
    }

    .cooperation img{
        width: 100px;
        height: 100px;
    }
</style>