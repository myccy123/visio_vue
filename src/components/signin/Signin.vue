<template>
    <div class="signin-wrap">
        <div class="signin-input-wrap">
            <el-form :model="signModel" :rules="signRules" ref="ruleForm" >
                <el-form-item prop="user">
                    <el-input clearable v-model="signModel.user" placeholder="请输入用户名" @keyup.enter.native="handleSubmit"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        clearable
                        v-model="signModel.password"
                        show-password
                        type="password"
                        placeholder="请输入密码"
                        @keyup.enter.native="handleSubmit"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="handleSubmit">{{signText}}</el-button>
                </el-form-item>
            </el-form>
            <div style="display:flex;justify-content:space-between">
                <el-checkbox :disabled="isSignup" label="记住密码" v-model="isRememberPwd"></el-checkbox>
                <span class="signin-btn-forget" @click="toggleSign">{{toggleText}}</span>
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
            signModel: {
                user: "",
                password: ""
            },
            isRememberPwd: false,
            isSignup: false,
            signRules: {
                user: [
                    { required: true, message: "请输入用户名" },
                    {
                        pattern: /^[a-zA-Z0-9_]{4,16}$/,
                        message: "4到16位（只能由字母，数字，下划线组成）"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码" },
                    {
                        pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message: "最少6位，包括至少1个大写字母，1个小写字母，1个数字"
                    }
                ]
            }
        };
    },
    computed: {
        signText() {
            return this.isSignup ? "注册" : "登录";
        },
        toggleText() {
            return this.isSignup ? "登录" : "注册";
        },
        signMethod() {
            return this.isSignup ? this.signup : this.signin;
        }
    },
    watch: {
        isRememberPwd(val) {
            this.setLsItem(KEY_REMEMBER, val);
        }
    },
    mounted() {
        this.isRememberPwd = this.getLsItem(KEY_REMEMBER);
        this.signModel.user = this.getLsItem(KEY_USER);
        this.signModel.password = this.getLsItem(KEY_PASSWORD);
    },
    methods: {
        handleSubmit(){
            this.$refs.ruleForm.validate(valid=>{
                if(valid){
                    this.signMethod()
                }else{
                    return false;
                }
            })
        },
        //注册
        signup() {
            const { user, password } = this.signModel;
            let params = {
                userid: user,
                passWord: password
            };
            this.$axios
                .post(this.$api.authSignup, params)
                .then(res => {
                    const resData = res.data;
                    if (res.status === 200 && resData.code === "00") {
                        this.$message.success("注册成功");
                        this.isSignup = false;
                    } else {
                        this.$message.error(resData.message);
                    }
                })
                .catch(err => console.log(err));
        },
        //登录
        signin() {
            const { user, password } = this.signModel;
            let params = {
                userid: user,
                passWord: password
            };
            this.$axios
                .post(this.$api.authSignin, params)
                .then(res => {
                    console.log(res);
                    const resData = res.data;
                    if (res.status === 200 && resData.code === "00") {
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
                        let fullPath = this.getSsItem(KEY_INTERCEPT) || "/";
                        this.$router.replace({ path: fullPath });
                        //保存登录状态
                        this.$store.commit("setIsSignin", true);
                        //保存用户信息
                        this.$store.commit("setUserInfo", resData.data);
                    } else {
                        this.$message.error(resData.message);
                        this.$store.commit("setIsSignin", false);
                    }
                })
                .catch(err => {
                    this.$store.commit("setIsSignin", false);
                    console.log(err);
                });
        },
        toggleSign() {
            this.isSignup = !this.isSignup;
        }
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