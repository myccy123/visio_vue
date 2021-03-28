<template>
    <div>
        <common-nav></common-nav>
        <source-list ref="srcList"></source-list>
        <div class="src-info">
            <h2 class="src-name" style="padding-top: 8px;text-align: center;">数据源详情</h2>
            <el-form :model="srcInfo" label-width="120px" size="mini">
                <el-form-item label="数据源名称">
                    <el-input v-model="srcInfo.data_name" :readonly="!editable"></el-input>
                </el-form-item>
                <el-form-item label="HOST / IP">
                    <el-input v-model="srcInfo.db_host" :readonly="!editable"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="srcInfo.db_user" :readonly="!editable"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="srcInfo.db_password" show-password :readonly="!editable"></el-input>
                </el-form-item>
                <el-form-item label="端口">
                    <el-input v-model="srcInfo.db_port" :readonly="!editable"></el-input>
                </el-form-item>
                <el-form-item label="库 / 表">
                    <el-cascader :options="options" filterable :disabled="!editable"
                                 v-model="srcInfo.dbTable" separator="." style="width: 100%;"></el-cascader>
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
                <el-form-item>
                    <div>
                        <el-button :disabled="false" type="danger" @click="updateSource">保存修改</el-button>
                        <el-button :disabled="false" @click="cloneSource" style="margin-left: 35px;">克隆</el-button>
                    </div>
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
    import lodash from 'lodash'

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
                    dbTable: [],
                    db_name: '',
                    table_name: '',
                    data_type: '',
                    id: ''
                },
                srcValid: false,
                editable: true,
                rows: [],
                colnames: [],
                options: [],
            }
        },
        mounted() {
            this.$bus.$on('currSource', (src) => {
                this.srcInfo = lodash.cloneDeep(src);
                this.srcInfo.dbTable = [this.srcInfo.db_name, this.srcInfo.table_name];
                this.checkSource();
                this.previewData();
                this.getDbTable();
            });
            this.$bus.$on('cleanSource', () => {
                this.cleanSource();
            })
        },
        destroyed() {
            this.$bus.$off(['currSource', 'cleanSource']);
        },
        methods: {
            checkSource() {
                let data = {
                    ip: this.srcInfo.db_host,
                    user: this.srcInfo.db_user,
                    passWord: this.srcInfo.db_password,
                    port: this.srcInfo.db_port,
                    id: this.srcInfo.id
                };
                this.$axios.post(this.$api.mysqlCheck, data).then((res) => {
                    if(res.data.data.statusCode === '00'){
                        this.srcValid = 'success'
                    } else {
                        this.srcValid = 'fail'
                    }
                }).catch((err) => {

                })
            },
            cleanSource() {
                this.srcInfo = {
                    data_name: '',
                    db_host: '',
                    db_user: '',
                    db_password: '',
                    db_port: '',
                    dbTable: [],
                    db_name: '',
                    table_name: '',
                    id: ''
                };
                this.srcValid = false;
                this.rows = [];
                this.colnames = [];
            },
            getCols() {
                this.$axios.post(this.$api.sourceDetail, {id: this.srcInfo.id}).then((res) => {
                    if (res.data.code === '00') {
                        this.colnames = res.data.data
                    }
                }).catch((err) => {

                })
            },
            getDbTable() {
                let srcInfo = {
                    ip: this.srcInfo.db_host,
                    user: this.srcInfo.db_user,
                    passWord: this.srcInfo.db_password,
                    port: this.srcInfo.db_port,
                    sourceType: this.srcInfo.data_type
                };
                this.$axios.post(this.$api.mysqlGetDb, srcInfo).then((res) => {
                    if (res.data.code === '00') {
                        for (let db in res.data.data) {
                            let tmp = {
                                value: db,
                                label: db,
                                children: []
                            };
                            for (let table of res.data.data[db]) {
                                tmp.children.push({
                                    value: table,
                                    label: table
                                })
                            }
                            this.options.push(tmp)
                        }
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'error',
                            showClose: true,
                            duration: 3,
                        });
                    }
                }).catch((err) => {
                    this.$message({
                        message: '无法连接到数据库！请确认网络通畅,用户名密码正确,且有足够权限。',
                        type: 'error',
                        showClose: true,
                        duration: 3,
                    });
                })
            },
            updateSource() {
                this.$confirm('是否修改此数据源?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: this.srcInfo.id,
                        name: this.srcInfo.data_name,
                        ip: this.srcInfo.db_host,
                        user: this.srcInfo.db_user,
                        passWord: this.srcInfo.db_password,
                        port: this.srcInfo.db_port,
                        db: this.srcInfo.dbTable[0],
                        table: this.srcInfo.dbTable[1],
                    };
                    this.$axios.post(this.$api.mysqlEdit, params).then((res) => {
                        if (res.data.code === '00') {
                            this.$refs.srcList.getSource()
                        }
                    }).catch((err) => {

                    })
                }).catch(() => {

                });
            },
            cloneSource() {
                this.$axios.post(this.$api.mysqlClone, {id: this.srcInfo.id}).then((res) => {
                    if (res.data.code === '00') {
                        this.$refs.srcList.getSource()
                    }
                }).catch((err) => {

                })
            },
            previewData() {
                this.rows = [];
                this.$axios.post(this.$api.mysqlPreview, {id: this.srcInfo.id}).then((res) => {
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