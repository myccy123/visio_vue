<template>
    <div>
        <common-nav></common-nav>
        <source-list></source-list>
        <div style="float: left; width: 300px;">
            <h2 class="mydata-title">我的数据源</h2>
            <el-form class="src-info" ref="form" :model="srcInfo" label-width="120px" size="mini">
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
                <el-form-item>
                    <el-button type="primary">修改</el-button>
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
        }
    }
</script>

<style scoped>
    .mydata-title {
        font-size: 18px;
        color: #909399;
        position: relative;
        padding-top: 8px;
    }
</style>