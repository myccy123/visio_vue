<template>
    <div>
        <common-nav></common-nav>
        <div class="tool-box">
            <el-button size="mini" type="primary" plain icon="el-icon-circle-plus-outline"
                       style="margin: 20px 0" @click="addTemplate">add
            </el-button>
        </div>
        <div v-loading="loading"
             style="margin-top: 20px;clear: both;display: flex;flex-wrap: wrap;justify-content:space-around;min-height: calc(100vh - 120px);">
            <div v-for="temp in templates" class="temp-box" :id="temp.id">
                <img class="temp-img" :src="temp.icon">
                <div class="mask">
                    <div class="btn-box">
                        <p style="">{{temp.name}}</p>
                        <p style="">id : {{temp.id}}</p>
                        <el-button size="mini" type="primary" class="btns" @click="preview(temp.id)">预览</el-button>
                        <el-button size="mini" type="warning" class="btns" @click="editTemplate(temp.id)">编辑</el-button>
                        <el-button size="mini" type="danger" class="btns" @click="delTemplate(temp.id)">删除</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import commonNav from '../common/nav'

    export default {
        name: "template_list",
        components: {commonNav},
        data() {
            return {
                templates: [],
                loading: false
            }
        },
        mounted() {
            this.templateList()
        },
        methods: {
            addTemplate() {
                this.$router.push({name: 'templateEdit'})
            },
            templateList() {
                this.loading = true
                this.$axios.post(this.$api.templateList, {userid: ''}).then((res) => {
                    if (res.data.code === '00') {
                        this.templates = res.data.data
                    }
                    this.loading = false
                }).catch((err) => {
                    console.log(err)
                    this.loading = false
                })
            },
            preview(id) {
                window.open(this.$api.baseUrl + "/preview/template/?id=" + id, "_blank");
            },
            editTemplate(id) {
                this.$router.push({name: 'templateEdit', query: {id: id}})
            },
            delTemplate(id) {
                this.$confirm('是否删除该模版?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.$api.delTemplate, {id: id}).then((res) => {
                        if (res.data.code === '00') {
                            this.templateList()
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>
    .tool-box{
        text-align: center;
    }

    .temp-box {
        overflow: hidden;
        width: 450px;
        height: 300px;
        line-height: 250px;
        margin: 5px;
        position: relative;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        transition-duration: 0.4s;
    }

    .temp-box:hover {
        transform: scale(1.02);
    }

    .temp-img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        vertical-align: middle;
    }

    .mask {
        height: 100%;
        width: 100%;
        opacity: 0;
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .mask:hover {
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        opacity: 1;
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .btn-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

    .btn-box p {
        height: 30px;
        line-height: 30px;
        color: #fff;
        text-align: center;
        margin: 0 0 10px 0;
        font-weight: bold;
        font-size: 16px;
    }

    .btns {
        display: block;
        width: 100px;
        margin: 4px auto 4px auto !important;
        z-index: 100;
    }
</style>