<template>
    <div class="left">
        <h2 class="mydata-title">我的数据源
            <i class="el-icon-plus add-btn" @click="addSource"></i>
        </h2>
        <el-tag v-for="src in sources"
                :key="src.id"
                closable
                style="text-align: center;"
                @close="delSource(src.id)"
                class="source-tag">
            {{ src.data_name }}
        </el-tag>

        <el-dialog
                title="选择数据源类型"
                :visible.sync="showDialog"
                width="50%">
            <el-row :gutter="40">
                <el-col :span="4" :offset="10">
                    <div class="source-icon" @click="addMySQL">
                        <img src="@/assets/img/MySQL.png">
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "source_list",
        data() {
            return {
                sources: [],
                showDialog: false,
            };
        },
        mounted() {
            this.getSource()
        },
        methods: {
            getSource() {
                this.$axios.post(this.$api.sourceList, {userid: 'yujiahao'}).then((res) => {
                    if (res.data.code === '00') {
                        this.sources = []
                        this.sources = res.data.data
                    }
                }).catch((err) => {

                })
            },
            addSource() {
                this.showDialog = true
            },
            delSource(srcid) {
                this.$axios.post(this.$api.delSource, {id: srcid}).then((res) => {
                    if (res.data.code === '00') {
                        this.getSource()
                    }
                }).catch((err) => {

                })
            },
            addMySQL() {
                this.$router.push({name: 'addMysql'})
            },
        }
    };
</script>

<style scoped>
    .left {
        width: 300px;
        height: calc(100vh - 57px);
        float: left;
        border-right: 1px solid #ebeef5;
        margin-top: 8px;
    }

    .mydata-title {
        font-size: 18px;
        color: #909399;
        position: relative;
        text-align: center;
    }

    .add-btn {
        position: absolute;
        right: 10px;
        top: 3px;
        cursor: pointer;
        color: #409EFF;
    }

    .add-btn:hover {
        color: #409EFF;
        font-weight: bold;
    }

    .source-icon {
        height: 200px;
        cursor: pointer;
    }

    .source-icon:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .source-icon img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

</style>

<style>
    .el-tag .el-icon-close {
        position: absolute !important;
        top: 8px !important;
        right: 5px !important;
    }

    .source-tag {
        width: 90%;
        position: relative;
        margin-top: 8px;
        cursor: pointer;
        overflow: hidden;
        white-space: normal !important;
        padding-right: 22px !important;
    }
</style>
