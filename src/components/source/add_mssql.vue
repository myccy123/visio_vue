<template>
    <div>
        <common-nav></common-nav>
        <div style="width: 500px; margin: auto;">
            <h2 class="thedata-title">创建SQL Server数据源</h2>
            <el-steps class="steps-title" :active="addMysqlStep" align-center finish-status="success"
                      style="margin: 30px 0;" process-status="process">
                <el-step title="连接SQL Server"></el-step>
                <el-step title="选择数据表"></el-step>
            </el-steps>
            <el-form ref="form" v-show="addMysqlStep===0" :model="mysqlInfo" label-width="120px"
                     style="width: 400px;"
                     size="mini">
                <el-form-item label="数据源名称">
                    <el-input v-model="mysqlInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="HOST / IP">
                    <el-input v-model="mysqlInfo.ip"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="mysqlInfo.user"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="mysqlInfo.passWord" show-password></el-input>
                </el-form-item>
                <el-form-item label="端口">
                    <el-input v-model="mysqlInfo.port"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 200px;" @click="next" :loading="lding">下一步</el-button>
                </el-form-item>
            </el-form>
            <el-form v-show="addMysqlStep===1" :model="mysqlInfo" label-width="120px" size="mini"
                     style="width: 400px;">
                <el-form-item label="库 & 表">
                    <el-cascader :options="options" filterable
                                 v-model="dbTable" separator="." style="width: 100%;"></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" style="width: 100px;" @click="previous">上一步</el-button>
                    <el-button :loading="lding2" :disabled="!canSave" type="primary"
                               style="width: 100px;margin-left: 30px;" @click="save">保存
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import commonNav from '../common/nav'

    export default {
        name: "addMysql",
        components: {commonNav},
        data() {
            return {
                addMysqlStep: 0,
                mysqlInfo: {
                    name: '',
                    ip: '222.223.101.215',
                    user: 'sa',
                    passWord: 'Bjjttec2315',
                    port: '1433',
                    db: '',
                    table: '',
                    sourceType: 'mssql',
                    userid: 'yujiahao',
                },
                dbTable: [],
                lding: false,
                lding2: false,
                options: []
            }
        },
        computed: {
            canSave() {
                return this.dbTable.length >= 2
            }
        },
        methods: {
            next() {
                this.lding = true;
                this.$axios.post(this.$api.mysqlGetDb, this.mysqlInfo).then((res) => {
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
                        this.addMysqlStep++;
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'error',
                            showClose: true,
                            duration: 0,
                        });
                    }
                    this.lding = false;
                }).catch((err) => {
                    this.$message({
                        message: '无法连接到数据库！请确认网络通畅,用户名密码正确,且有足够权限。',
                        type: 'error',
                        showClose: true,
                        duration: 0,
                    });
                    this.lding = false;
                })
            },
            previous() {
                this.addMysqlStep--;
            },
            save() {
                this.lding2 = true;
                this.mysqlInfo.db = this.dbTable[0];
                this.mysqlInfo.table = this.dbTable[1];
                this.$axios.post(this.$api.mysqlSave, this.mysqlInfo).then((res) => {
                    if (res.data.code === '00') {
                        this.$router.replace({name: 'source'})
                    }
                    this.lding2 = false;
                }).catch((err) => {
                    this.lding2 = false;
                })

            },
        }
    }
</script>

<style scoped>
    .thedata-title {
        font-size: 18px;
        color: #909399;
        position: relative;
        text-align: center;
    }
</style>