<template>
    <div>
        <common-nav></common-nav>
        <div class="tool-box">
            <el-button size="mini" type="primary" plain icon="el-icon-circle-plus-outline"
                       style="margin: 20px 0" @click="addTemplate">add
            </el-button>
        </div>
        <div style="margin-top: 20px;clear: both;display: flex;flex-wrap: wrap;justify-content:flex-start;">
            <div v-for="chart in templates" class="chart-box" :id="chart.id">
                <img class="chart-img" :src="chart.icon">
                <div class="mask">
                    <div class="btn-box">
                        <p style="">id : {{chart.id}}</p>
                        <el-button size="mini" type="primary" class="btns" @click="preview(chart.id)">预览</el-button>
                        <el-button size="mini" type="warning" class="btns" @click="editTemplate(chart.id)">编辑</el-button>
                        <el-button size="mini" type="danger" class="btns" @click="delTemplate(chart.id)">删除</el-button>
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
                templates: []
            }
        },
        methods: {
            addTemplate() {
                this.$router.push({name: 'templateEdit'})
            }
        }
    }
</script>

<style scoped>
    .tool-box{
        text-align: center;
    }
</style>