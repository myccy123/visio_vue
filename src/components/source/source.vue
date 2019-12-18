<template>
    <div>
        <common-nav></common-nav>
        <source-list></source-list>
        <div class="src-info">
            <h2 class="src-name" style="padding-top: 8px;text-align: center;">数据源详情</h2>
            <el-form :model="srcInfo" label-width="120px" size="mini">
                <el-form-item label="数据源名称">
                    <el-input v-model="srcInfo.data_name"></el-input>
                </el-form-item>
                <el-form-item label="HOST / IP">
                    <el-input v-model="srcInfo.db_host"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="srcInfo.db_user"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="srcInfo.db_password"></el-input>
                </el-form-item>
                <el-form-item label="端口">
                    <el-input v-model="srcInfo.db_port"></el-input>
                </el-form-item>
                <el-form-item label="库 / 表">
                    <el-input v-model="srcInfo.port"></el-input>
                </el-form-item>
                <el-form-item v-show="srcValid">
                    <el-alert style="width: 180px; margin: auto; padding: 0;"
                              title="数据源可用"
                              show-icon
                              :closable="false"
                              type="success">
                    </el-alert>
                </el-form-item>
                <el-form-item>
<!--                    <el-button type="primary">修改</el-button>-->
<!--                    <el-button type="primary">主要按钮</el-button>-->
                </el-form-item>
            </el-form>
        </div>
        <div class="preview">
            <h2 class="src-name" style="padding-top: 8px;text-align: center;">数据预览</h2>
            <el-table :data="rows" :highlight-current-row="true" :row-style="{cursor: 'pointer'}"
                      max-height="500" stripe
                      style="width: 90%;margin: auto;"
                      :border="true">
                <template v-for="col in colnames">
                    <el-table-column :prop="col" :label="col" align="center"
                                     :show-overflow-tooltip="true"></el-table-column>
                </template>
            </el-table>
        </div>
    </div>
</template>

<script>
    import commonNav from '../common/nav'
    import sourceList from './source_list'

    export default {
        name: "Source",
        components: {commonNav, sourceList},
        data() {
            return {
                srcInfo: {
                    data_name: '',
                    db_host: '',
                    db_user: '',
                    db_password: '',
                    db_port: '',
                    db_name: '',
                    table_name: '',
                    data_name: '',
                    id: ''
                },
                srcValid: false,
                rows: [],
                colnames: []
            }
        },
        mounted() {
            this.$bus.$on('currSource', (src) => {
                this.srcInfo = src;
                this.checkSource();
                this.previewData()
            })
        },
        methods: {
            checkSource() {
                let data = {
                    ip: this.srcInfo.db_host,
                    user: this.srcInfo.db_user,
                    passWord: this.srcInfo.db_password,
                    port: this.srcInfo.db_port,
                };
                this.$axios.post(this.$api.mysqlCheck, data).then((res) => {
                    if (res.data.code === '00') {
                        this.srcValid = true
                    } else {
                        this.srcValid = false
                    }
                }).catch((err) => {

                })
            },
            getCols() {
                this.$axios.post(this.$api.sourceDetail, {id: this.srcInfo.id}).then((res) => {
                    if (res.data.code === '00') {
                        this.colnames = res.data.data
                    }
                }).catch((err) => {

                })
            },
            previewData() {
                this.$axios.post(this.$api.mysqlPreview, {id: this.srcInfo.id}).then((res) => {
                    this.rows = [];
                    if (res.data.code === '00') {
                        let columns = res.data.data.columns;
                        let rows = res.data.data.rows;
                        this.colnames = columns;
                        for(let row of rows) {
                            let tmp = {};
                            for(let i=0; i < row.length; i++) {
                                tmp[columns[i]] = row[i]
                            }
                            this.rows.push(tmp)
                        }
                    }
                }).catch((err) => {

                })
            }
        }
    }
</script>

<style scoped>
    .src-info {
        float: left;
        width: 300px;
    }

    .src-name {
        font-size: 18px;
        color: #909399;
    }

    .preview {
        width: calc(100% - 601px);
        float: left;
        height: 500px;
    }
</style>