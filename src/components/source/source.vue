<template>
    <div>
        <common-nav></common-nav>
        <source-list></source-list>
        <div class="src-info">
            <h2 class="src-name" style="padding-top: 8px;">我的数据源</h2>
            <el-form :model="srcInfo" label-width="120px" size="mini">
                <el-form-item label="数据源名称">
                    <el-input v-model="srcInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="HOST / IP">
                    <el-input v-model="srcInfo.ip"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="srcInfo.user"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="srcInfo.passWord"></el-input>
                </el-form-item>
                <el-form-item label="端口">
                    <el-input v-model="srcInfo.port"></el-input>
                </el-form-item>
                <el-form-item label="库 / 表">
                    <el-input v-model="srcInfo.port"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-alert style="width: 200px; margin: auto; padding: 0;"
                              title="数据源可用"
                              show-icon
                              :closable="false"
                              type="success">
                    </el-alert>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">修改</el-button>
                    <el-button type="primary">主要按钮</el-button>
                </el-form-item>
            </el-form>
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
                srcInfo: {}
            }
        },
    }
</script>

<style scoped>
    .src-info {
        float: left;
    }

    .src-name {
        font-size: 18px;
        color: #909399;
    }
</style>