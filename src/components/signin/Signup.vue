<template>
    <div class="signup-wrap">
        <vue-particles color="#97846C" linesColor="#97846C" :particlesNumber="120" :linesWidth="1"
                       style="position: absolute; width: 100vw; height: 100vh;overflow: hidden"></vue-particles>
        <div style='position:absolute;top:24px;left:24px'>
            <el-button style='font-size:24px' type="primary" icon="el-icon-s-home" circle
                       @click="$router.replace('/')"></el-button>
        </div>
        <div class="signup-input-wrap">
            <el-form :model="signModel" :rules="signRules" ref="ruleForm">
                <el-form-item prop="user">
                    <el-input
                        clearable
                        v-model="signModel.user"
                        placeholder="请输入用户名"
                        @keyup.enter.native="handleSubmit"
                    ></el-input>
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
                <el-form-item prop="verify">
                    <el-input
                        clearable
                        v-model="signModel.verify"
                        show-password
                        type="password"
                        placeholder="请确认密码"
                        @keyup.enter.native="handleSubmit"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="capt">
                    <el-input
                        clearable style="width: 150px"
                        v-model="signModel.capt"
                        type=""
                        placeholder="验证码"
                        @keyup.enter.native="handleSubmit">
                        <i
                            class="el-icon-refresh el-input__icon"
                            slot="suffix" style="cursor: pointer"
                            @click="initCaptcha">
                        </i>
                    </el-input>
                    <img ref="capt" src="" alt="" @click="initCaptcha"
                         style="cursor: pointer; height: 40px; float: right; margin-right: 40px;">
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="handleSubmit">注册</el-button>
                    <el-button type="text" style="z-index: 99;position: absolute;right: 0;bottom: -34px;padding: 0"
                               @click="$router.push({ name: 'signin' })">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "Signup",
    data() {
        //二次校验
        const validator = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.signModel.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            signModel: {
                user: "",
                password: "",
                verify: "",
                captId: '',
                capt: '',
            },
            signRules: {
                user: [
                    {required: true, message: "请输入用户名"},
                    {
                        pattern: /^[a-zA-Z0-9_]{4,16}$/,
                        message: "4到16位（只能由字母，数字，下划线组成）"
                    }
                ],
                password: [
                    {required: true, message: "请输入密码"},
                    // {
                    //     pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
                    //     message:
                    //         "最少6位，包括至少1个大写字母，1个小写字母，1个数字"
                    // }
                ],
                verify: [
                    {required: true, message: "请确认密码"},
                    {validator: validator, trigger: 'blur'}
                ]
            }
        };
    },
    mounted() {
        this.initCaptcha()
    },
    methods: {
        handleSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.signup();
                } else {
                    return false;
                }
            });
        },
        initCaptcha() {
            this.$axios.post(this.$api.getCaptcha).then(res => {
                this.signModel.captId = res.data.data.cid
                this.$refs.capt.src = res.data.data.data
            })
        },
        //注册
        signup() {
            const {user, password, captId, capt} = this.signModel;
            let params = {
                userid: user,
                passWord: password,
                captId: captId,
                capt: capt,
            };
            this.$axios
                .post(this.$api.authSignup, params)
                .then(res => {
                    const resData = res.data;
                    if (res.status === 200 && resData.code === "00") {
                        this.$message.success("注册成功");
                        this.$router.replace({name: 'signin'})
                    } else {
                        this.$message.error(resData.message);
                    }
                })
                .catch(err => console.log(err));
        }
    }
};
</script>
<style scoped>
.signup-wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-input-wrap {
    width: 320px;
    padding: 24px;
    border-radius: 2px;
    border: 1px solid #eee;
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.1)
}

.signup-btn-forget {
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
}

.signup-btn-forget:hover {
    color: #409eff;
}
</style>