<template>
    <div class="change-pwd-wrap">
        <div class="change-pwd-input-wrap">
            <el-form :model="changeModel" :rules="changeRules" ref="ruleForm">
                <el-form-item prop="password">
                    <el-input
                        clearable
                        show-password
                        type="password"
                        v-model="changeModel.password"
                        placeholder="请输入新密码"
                        @keyup.enter.native="changePwd"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        style="width:100%"
                        @click="changePwd"
                    >修改密码</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "ChangePwd",
    data() {
        return {
            changeModel: {
                password: ""
            },
            password: "",
            changeRules: {
                password: [
                    { required: true, message: "请输入新密码" },
                    {
                        pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message:
                            "最少6位，包括至少1个大写字母，1个小写字母，1个数字"
                    }
                ]
            }
        };
    },
    mounted() {},
    methods: {
        changePwd() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    let params = {
                        newPassWord: this.changeModel.password
                    };
                    this.$axios
                        .post(this.$api.authChangePwd, params)
                        .then(res => {
                            const resData = res.data;
                            if (res.status === 200 && resData.code === "00") {
                                this.$message.success("修改成功");
                                this.setSsItem("isSignin", false);
                                this.$store.commit("setIsSignin", false);
                                this.$store.commit("setUserInfo", {});
                                this.$router.replace({ name: "signin" });
                            } else {
                                this.$message.error(resData.message);
                            }
                        })
                        .catch(err => console.log(err));
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style scoped>
.change-pwd-wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.change-pwd-input-wrap {
    width: 320px;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #eee;
}
</style>

<style>
</style>