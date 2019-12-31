<template>
    <div>
        <common-nav></common-nav>
        <source-list></source-list>
        <div class="src-info">
            <h2 class="src-name" style="padding-top: 8px;text-align: center;">数据源详情</h2>
            <el-form :model="srcInfo" label-width="120px" size="mini">
                <el-form-item label="数据源名称">
                    <el-input v-model="srcInfo.data_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="HOST / IP">
                    <el-input v-model="srcInfo.db_host" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="srcInfo.db_user" readonly></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="srcInfo.db_password" show-password readonly></el-input>
                </el-form-item>
                <el-form-item label="端口">
                    <el-input v-model="srcInfo.db_port" readonly></el-input>
                </el-form-item>
                <el-form-item label="库 / 表">
                    <el-input v-model="dbDotTable" readonly></el-input>
                </el-form-item>
                <el-form-item>
                    <el-alert v-if="srcValid === 'success'"
                              style="width: 180px; margin: auto; padding: 0;"
                              title="数据源可用"
                              show-icon
                              :closable="false"
                              type="success">
                    </el-alert>
                    <el-alert v-else-if="srcValid === 'fail'"
                              style="width: 180px; margin: auto; padding: 0;"
                              title="数据源不可用"
                              show-icon
                              :closable="false"
                              type="error">
                    </el-alert>
                    <el-alert v-else
                              style="width: 180px; margin: auto; padding: 0;"
                              title="未选择数据源"
                              show-icon
                              :closable="false"
                              type="info">
                    </el-alert>
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
                    id: ''
                },
                srcValid: false,
                rows: [],
                colnames: []
            }
        },
        computed: {
            dbDotTable() {
                return `${this.srcInfo.db_name}.${this.srcInfo.table_name}`
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
                    if(res.data.code === '00'){
                        this.srcValid = 'success'
                    } else {
                        this.srcValid = 'fail'
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
                        for (let row of rows) {
                            let tmp = {};
                            for (let i = 0; i < row.length; i++) {
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