<template>
    <div>
        <common-nav></common-nav>
        <div style="width: 500px; margin: auto;">
            <h2 class="thedata-title">创建Excel数据源</h2>
            <el-form ref="form" :model="srcInfo" label-width="120px"
                     style="width: 400px;"
                     size="mini">
                <el-form-item label="数据源名称">
                    <el-input v-model="srcInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="文件">
                    <el-upload
                        class="upload-demo"
                        :headers="{'sessionid': sessionid}"
                        :action="$api.uploadExcel"
                        name="excel"
                        :limit="1"
                        :on-success="uploaded"
                        :on-remove="delFile"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" style="margin-left: 10px;color: #909399">只能上传xls / xlsx文件</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="sheet">
                    <el-select v-model="srcInfo.sheet" placeholder="请选择" :disabled="!isUpload">
                        <el-option
                            v-for="item in sheets"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳过">
                    <el-input-number v-model="srcInfo.skipRow" :min="0" :disabled="!isUpload"></el-input-number>
                    <span style="margin-left: 10px;">行</span>
                </el-form-item>
                <el-form-item label="跳过">
                    <el-input-number v-model="srcInfo.skipCol" :min="0" :disabled="!isUpload"></el-input-number>
                    <span style="margin-left: 10px;">列</span>
                </el-form-item>
                <el-form-item label="表头">
                    <el-switch
                        v-model="srcInfo.hasTitle"
                        :active-value="true" :disabled="!isUpload"
                        :inactive-value="false">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="ld" type="primary"
                               style="width: 100px;margin-left: 80px;" @click="save">保存
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import commonNav from '../common/nav'

export default {
    name: "addExcel",
    components: {commonNav},
    data() {
        return {
            srcInfo: {
                name: '',
                excelId: '',
                sheet: '',
                skipCol: 0,
                skipRow: 0,
                hasTitle: true,
            },
            sessionid: sessionStorage.getItem('sessionid'),
            fileList: [],
            sheets: [],
            ld: false,
        }
    },
    computed: {
        isUpload() {
            return this.fileList.length > 0
        }
    },
    methods: {
        uploaded(res, f, fl) {
            this.srcInfo.excelId = res.data.excelId
            this.sheetList(res.data.excelId)
            this.fileList = fl
        },
        delFile(f, fl) {
            this.fileList = fl
            this.sheets = []
        },
        sheetList(excelId) {
            let params = {
                excelId: excelId
            }
            this.$axios.post(this.$api.getSheets, params).then((res) => {
                if (res.data.code === '00') {
                    for (let item of res.data.data) {
                        this.sheets.push({label: item, value: item})
                        if (this.srcInfo.sheet === '') {
                            this.srcInfo.sheet = item
                            console.log(item)
                        }
                    }
                } else {
                    this.$message.error(res.data.message)
                }
            }).catch((err) => {
            })
        },
        save() {
            let params = {
                name: this.srcInfo.name,
                sheet: this.srcInfo.sheet,
                hasTitle: this.srcInfo.hasTitle,
                skipCol: this.srcInfo.skipCol,
                skipRow: this.srcInfo.skipRow,
                excelId: this.srcInfo.excelId,
            }
            this.$axios.post(this.$api.excelSave, params).then((res) => {
                if (res.data.code === '00') {
                    this.$router.push({name: 'source'})
                } else {
                    this.$message.error(res.data.message)
                }
            }).catch((err) => {
            })
        }
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