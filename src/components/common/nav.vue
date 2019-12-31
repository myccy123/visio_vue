<template>
    <div>

        <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="logo" @click="goTo"><div class="logo">
                <img :src="logo">
            </div></el-menu-item>
            <el-menu-item index="/" @click="goTo">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">工作台</template>
                <el-menu-item index="/source" @click="goTo">数据源管理</el-menu-item>
                <el-menu-item index="/chart/list/" @click="goTo">Chart管理</el-menu-item>
                <el-menu-item index="/template/list/" @click="goTo">模版管理</el-menu-item>
            </el-submenu>
<!--            <el-menu-item index="3">关于我们</el-menu-item>-->
            <el-menu-item v-if="!isLogin" class="right-item">登录</el-menu-item>
            <el-submenu v-else class="right-item" index="2">
                <template slot="title">{{userInfo.user_account}}</template>
                <el-menu-item index="/signin" style="width: 100px;">退出登录</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';
    import opt from '../../config/options'

    export default {
        name: "commonNav",
        data() {
            return {
                isLogin: false,
                userInfo: {},
                logo: opt.ASSETS.logo,
            };
        },
        mounted() {

        },
        methods: {
            goTo(e) {
                if(this.$route.path !== e.index) {
                    if (e.index === 'logo') {
                        this.$router.replace({name: 'index'})
                    } else{
                        this.$router.replace(e.index)
                    }
                }
            },
        }
    }
</script>

<style>

    .logo {
        height: 100%;
        width: 155px;
    }

    .logo img{
        height: 100%;
        width: 100%;
        margin-bottom: 3px;
        object-fit: contain;
    }
    .common-nav {
        padding: 0 50px;
        padding-left: 50px !important;
    }

    .common-nav-m{
        padding: 0 5px;
    }

    .el-menu-item, .el-submenu, .el-menu-item, .el-submenu__title {
        height: 40px !important;
        line-height: 40px !important;
        /*padding-right: 0!important;*/
    }

    .right-item {
        float: right !important;
    }


    .right-item .el-submenu__title{
        padding-right: 0px!important;
    }

    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
        min-width: 137px !important;
        text-align: center;
    }

    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup li {
        margin: auto;
    }
</style>