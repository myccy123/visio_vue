<template>
    <div>
        <common-nav></common-nav>
        <el-radio-group v-model="chartCate" size="mini"
                        @change="chartList"
                        style="margin: 20px 0 0 30%; float: left;">
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

        <el-row :gutter="20" style="clear: both;">
            <el-col v-for="chart in charts" :sm="6" :md="6" :lg="4" style="margin-top: 20px;">
                <div class="chart-box" :id="chart.id">
                    <img class="chart-img" :src="chart.icon">
                </div>
            </el-col>
        </el-row>
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
            this.$nextTick(() => {
                let boxes = document.querySelectorAll('.chart-box');
                for (let item of boxes) {
                    item.style.height = item.style.width;
                }
            });

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
            renderChart(id, dom) {
                this.$axios.post(this.$api.getChart, {id: id}).then((res) => {
                    if (res.data.code === '00') {
                        let myChart = echarts.init(dom);
                        myChart.setOption(res.data.data.chartOptions);
                        myChart.resize()
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            addChart() {
                this.$router.push({name: 'chartEdit'})
            }
        }
    }
</script>

<style scoped>
    .chart-box {
        cursor: pointer;
        overflow: hidden;
        height: 240px;
        line-height: 240px;
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
</style>