<template>
    <div>
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="logo" @click="goTo" class="logo-wrap">
                <div class="logo">
                    <img :src="logo"/>
                </div>
            </el-menu-item>
            <el-menu-item index="/" @click="goTo">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">工作台</template>
                <el-menu-item index="/source" @click="goTo">数据源管理</el-menu-item>
                <el-menu-item index="/chart/list/" @click="goTo">Chart管理</el-menu-item>
                <el-menu-item index="/template/list/" @click="goTo">模版管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/mapbox">mapbox</el-menu-item>
            <el-menu-item
                    v-if="!$store.state.isSignin"
                    class="right-item"
                    @click="$router.replace({name:'signin'})"
            >登录
            </el-menu-item>
            <el-submenu v-else class="right-item" index="3">
                <template slot="title">{{$store.state.userInfo.user_id}}</template>
                <el-menu-item index="changePwd" style="width: 100px;">修改密码</el-menu-item>
                <el-menu-item index="logout" style="width: 100px;">退出登录</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import "element-ui/lib/theme-chalk/display.css";
    import opt from "../../config/options";

    export default {
        name: "commonNav",
        data() {
            return {
                logo: opt.ASSETS.logo
            };
        },
        mounted() {
        },
        methods: {
            goTo(e) {
                if (this.$route.path !== e.index) {
                    if (e.index === "logo") {
                        this.$router.replace({name: "index"});
                    } else {
                        this.$router.replace(e.index);
                    }
                }
            },
            logout() {
                this.$axios
                    .post(this.$api.authLogout)
                    .then(res => {
                        if (res.status === 200 && res.data.code === "00") {
                            this.setSsItem("isSignin", false);
                            this.$router.replace({name: "signin"});
                            this.$store.commit("setIsSignin", false);
                            this.$store.commit("setUserInfo", {});
                        }
                    })
                    .catch(err => this.$message.error(err));
            },
            changePwd() {
                this.$router.push({name: 'changePwd'});
            },
            handleSelect(key, keyPath) {
                if (typeof this[key] === 'function') {
                    this[key]();
                }
            }
        }
    };
</script>

<style>
    .logo-wrap {
        padding: 0;
    }
    .logo {
        height: 100%;
        width: 155px;
    }

    .logo img {
        height: 100%;
        width: 100%;
        margin-bottom: 3px;
        object-fit: contain;
    }

    .common-nav {
        padding: 0 50px;
        padding-left: 50px !important;
    }

    .common-nav-m {
        padding: 0 5px;
    }

    .el-menu-item,
    .el-submenu,
    .el-menu-item,
    .el-submenu__title {
        height: 40px !important;
        line-height: 40px !important;
        /*padding-right: 0!important;*/
    }

    .right-item {
        float: right !important;
        margin-right: 12px;
    }

    .right-item .el-submenu__title {
        padding-right: 0px !important;
    }

    .el-menu--collapse .el-menu .el-submenu,
    .el-menu--popup {
        min-width: 137px !important;
        text-align: center;
    }

    .el-menu--collapse .el-menu .el-submenu,
    .el-menu--popup li {
        margin: auto;
    }
</style>