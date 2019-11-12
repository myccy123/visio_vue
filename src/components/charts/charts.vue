<template>
    <div>
        <common-nav></common-nav>
        <el-radio-group v-model="chartCate" size="mini"
                        @change="chartList"
                        style="margin: 20px 0 15px 30%; float: left;">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="line">折线图</el-radio-button>
            <el-radio-button label="bar">柱图</el-radio-button>
            <el-radio-button label="pie">饼图</el-radio-button>
            <el-radio-button label="hot">热力图</el-radio-button>
            <el-radio-button label="diy">自定义图</el-radio-button>
        </el-radio-group>

        <el-button size="mini" type="primary" plain icon="el-icon-circle-plus-outline"
                   style="margin: 20px 0 0 50px;float: left;" @click="addChart">add
        </el-button>

        <div style="margin-top: 20px;clear: both;display: flex;flex-wrap: wrap;justify-content:flex-start;">
            <div v-for="chart in charts" class="chart-box" :id="chart.id">
                <img class="chart-img" :src="chart.icon">
                <div class="mask">
                    <div class="btn-box">
                        <p style="">id : {{chart.id}}</p>
                        <el-button size="mini" type="primary" class="btns" @click="preview(chart.id)">预览</el-button>
                        <el-button size="mini" type="warning" class="btns" @click="editChart(chart.id)">编辑</el-button>
                        <el-button size="mini" type="danger" class="btns" @click="delChart(chart.id)">删除</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommonNav from "../common/nav";
    import echarts from 'echarts'

    export default {
        name: "chart",
        components: {CommonNav},
        data() {
            return {
                chartCate: 'all',
                charts: []
            }
        },
        mounted() {
            this.chartList(this.chartCate)
        },
        methods: {
            chartList(cate) {
                this.$axios.post(this.$api.chartList, {cate: cate, userid: 'yujiahao'}).then((res) => {
                    if (res.data.code === '00') {
                        this.charts = res.data.data;
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            preview(id) {
                window.open("http://127.0.0.1:8000/preview/chart/?id=" + id, "_blank");
            },
            addChart() {
                this.$router.push({name: 'chartEdit'})
            },
            editChart(id) {
                this.$router.push({name: 'chartEdit', query: {id: id}})
            },
            delChart(id) {
                this.$confirm('是否删除该图表?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.$api.delChart, {id: id}).then((res) => {
                        if (res.data.code === '00') {
                            this.chartList(this.chartCate)
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
    .chart-box {
        cursor: pointer;
        overflow: hidden;
        width: 250px;
        height: 250px;
        line-height: 250px;
        margin: 5px;
        position: relative;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .chart-box:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .chart-img {
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
        top: 0px;
        left: 0px;
    }

    .mask:hover {
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        opacity: 1;
        position: absolute;
        top: 0px;
        left: 0px;
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

</style>