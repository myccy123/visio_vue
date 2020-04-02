<template>
    <div class="signin-wrap">
        <div class="signin-input-wrap">
            <el-form :model="signinModel" :rules="signinRules" class="demo-ruleForm">
                <el-form-item prop="user">
                    <el-input v-model="signinModel.user" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="signinModel.password"
                        show-password
                        type="password"
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="handleSignin">登录</el-button>
                </el-form-item>
            </el-form>
            <div style="display:flex;justify-content:space-between">
                <el-checkbox label="记住密码" v-model="isRememberPwd"></el-checkbox>
                <span class="signin-btn-forget" @click="handleForgetPwd">忘记密码?</span>
            </div>
        </div>
    </div>
</template>
<script>
const KEY_USER = "user",
    KEY_PASSWORD = "password",
    KEY_REMEMBER = "isRemember",
    KEY_SIGNIN = "isSignin",
    KEY_INTERCEPT = "routerIntercept";
export default {
    name: "Signin",
    data() {
        return {
            signinModel: {
                user: "",
                password: ""
            },
            isRememberPwd: false,
            signinRules: {
                user: [{ required: true, message: "请输入用户名" }],
                password: [{ required: true, message: "请输入密码" }]
            }
        };
    },
    watch: {
        isRememberPwd(val) {
            this.setLsItem(KEY_REMEMBER, val);
        }
    },
    mounted() {
        this.isRememberPwd = this.getLsItem(KEY_REMEMBER);
        this.signinModel.user = this.getLsItem(KEY_USER);
        this.signinModel.password = this.getLsItem(KEY_PASSWORD);
    },
    methods: {
        handleSignin() {
            const { user, password } = this.signinModel;
            let params = {
                user,
                password
            };
            //TODO 登录成功之后
            if (params.user == "admin" && params.password == "123456") {
                let lsUser = "";
                let lsPassword = "";
                //如果勾选记住密码
                if (this.getLsItem(KEY_REMEMBER)) {
                    let lsUser = params.user;
                    let lsPassword = params.password;
                }
                this.setLsItem(KEY_USER, lsUser);
                this.setLsItem(KEY_PASSWORD, lsPassword);

                //保存登录状态
                this.setSsItem(KEY_SIGNIN, true);

                //跳转到登录前的页面
                let fullPath = this.getSsItem(KEY_INTERCEPT);
                this.$router.replace({ path: fullPath });
            }
        },
        handleForgetPwd() {}
    }
};
</script>
<style scoped>
.signin-wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signin-input-wrap {
    width: 320px;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #eee;
}

.signin-btn-forget {
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
}

.signin-btn-forget:hover {
    color: #409eff;
}
</style>

<style>
</style>