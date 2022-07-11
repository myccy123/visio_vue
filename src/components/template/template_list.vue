<template>
    <div style="height: 100vh">
        <common-nav></common-nav>
        <div class="tool-box">
            <el-button size="mini" type="primary" plain icon="el-icon-circle-plus-outline"
                       style="margin: 20px 0" @click="addTemplate">创建模版
            </el-button>
        </div>
        <div v-infinite-scroll="templateList"
             :infinite-scroll-disabled="disabled"
             style="margin-top: 20px;overflow: auto;display: flex;flex-wrap: wrap;justify-content:space-around;">
            <div v-for="temp in templates" class="temp-box" :id="temp.id">
                <img class="temp-img" :src="temp.icon">
                <div class="mask">
                    <el-tooltip effect="dark" content="克隆模版" placement="top">
                        <i @click="cloneTemplate(temp.id)" class="el-icon-document-copy"
                           style="position: absolute;top: 3px;right: 3px;cursor: pointer;color: #fff;"></i>
                    </el-tooltip>
                    <div class="btn-box">
                        <p style="">{{temp.name?temp.name:'未命名'}}</p>
                        <p style="">id : {{temp.id}}</p>
                        <el-button size="mini" type="primary" class="btns" @click="preview(temp.id)">预览</el-button>
                        <el-button size="mini" type="warning" class="btns" @click="editTemplate(temp.id)">编辑
                        </el-button>
                        <el-button size="mini" type="danger" class="btns" @click="delTemplate(temp.id)">删除
                        </el-button>
                    </div>
                </div>
            </div>
			<p v-if="loading" class="load-msg">加载中...</p>
			<p v-if="isEnd" class="load-msg">―我是有底线的哦―</p>
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
                loading: false,
				page: 0,
				pageSize: 6,
				isEnd: false,
            }
        },
        mounted() {
            this.templateList()
        },
		computed: {
			disabled() {
				return this.loading || this.isEnd
			},
		},
        methods: {
            addTemplate() {
                this.$router.push({name: 'templateEdit'})
            },
            templateInit() {
                this.page = 0
                this.templates = []
                this.templateList()
            },
            templateList() {
                this.loading = true;
				this.page++;
                this.$axios.post(this.$api.templateList, {
					page: this.page,
					pageSize: this.pageSize,
				}).then((res) => {
                    if (res.data.code === '00') {
                        this.templates = this.templates.concat(res.data.data.list)
						if (res.data.data.total === this.page) {
						    this.isEnd = true
						}
                    }
                    this.loading = false
                }).catch((err) => {
                    console.log(err);
                    this.loading = false
                })
            },
            preview(id) {
                window.open(`${this.$api.baseUrl}/preview/#/?type=template&id=${id}`, "_blank");
            },
            editTemplate(id) {
                this.$router.push({name: 'templateEdit', query: {id: id}})
            },
            cloneTemplate(id) {
                this.$axios.post(this.$api.cloneTemplate, {id: id}).then((res) => {
                    if (res.data.code === '00') {
                        this.templateInit()
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            delTemplate(id) {
                this.$confirm('是否删除该模版?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.$api.delTemplate, {id: id}).then((res) => {
                        if (res.data.code === '00') {
                            this.templateInit()
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
    .tool-box {
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
        top: 0;
        left: 0;
    }

    .mask:hover {
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        opacity: 1;
        position: absolute;
        top: 0;
        left: 0;
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
	
	.load-msg {
		flex: 100vw;
		color: #909399;
		font-size: 14px;
		text-align: center;
	}
</style>