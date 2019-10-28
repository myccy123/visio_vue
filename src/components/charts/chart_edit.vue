<template>
    <div>
        <common-nav></common-nav>
        <div style="width: 1200px; margin: 20px auto 0 auto;height: calc(100vh - 77px);">
            <div class="left-side">
                <h2 class="h2-title">chart类型</h2>
                <div class="chart-cate">
                    <ul>
                        <el-tooltip v-for="cate in cates" effect="dark" :content="cate.name" placement="left">
                            <li @click="chartCate=cate.value"><img :src="cate.icon"></li>
                        </el-tooltip>
                    </ul>
                </div>
                <div class="chart-type">
                    <ul>
                        <li v-for="tp in types[chartCate]" class="seled-type">
                            <div><img :src="tp.icon"></div>
                            <h3>{{tp.name}}</h3></li>
                    </ul>
                </div>
            </div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    import CommonNav from "../common/nav";

    export default {
        name: "chartEdit",
        components: {CommonNav},
        data() {
            return {
                cates: [
                    {
                        name: '折线图', value: 'line', icon: '/img/line.png'
                    },
                    {
                        name: '面积图', value: 'area', icon: '/img/area.png'
                    },
                    {
                        name: '垂直柱图', value: 'column', icon: '/img/bar-v.png'
                    },
                    {
                        name: '水平柱图', value: 'bar', icon: '/img/bar-h.png'
                    },
                    {
                        name: '饼图', value: 'pie', icon: '/img/pie.png'
                    },
                    {
                        name: '散点图', value: 'scatter', icon: '/img/scatter.png'
                    },
                    {
                        name: '表格', value: 'table', icon: '/img/data-table.png'
                    },
                ],
                types: {
                    line: [{name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'},
                        {name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'},
                        {name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'},
                        {name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'},
                        {name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'},]
                },
                chartCate: 'line',
                chartType: 'line',
            }
        }
    }
</script>

<style scoped>
    .left-side {
        width: 220px;
        height: 100%;
        float: left;
    }

    .h2-title {
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        color: #909399;
        margin: 0px;
        padding: 5px;
        background-color: #F2F6FC;
    }

    .chart-cate {
        background-color: #F2F6FC;
        float: left;
        height: calc(100% - 30px);
    }

    .chart-cate li {
        width: 20px;
        height: 20px;
        padding: 5px;
        margin-top: 10px;
        cursor: pointer;
    }

    .chart-cate li:hover {
        background-color: #e8f6fd;
    }

    .chart-cate img {
        width: 100%;
        height: 100%;
    }

    .chart-type {
        float: right;
        width: 189px;
        height: calc(100% - 30px);
        overflow: auto;
    }

    .chart-type li {
        width: 95%;
        margin: 7px auto 5px auto;
        cursor: pointer;
    }

    .chart-type li:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .chart-type img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .chart-type h3 {
        font-size: 14px;
        font-weight: 500;
        color: #6b6fce;
        text-align: center;
        margin: 0px;
        padding: 2px;
        background-color: #F2F6FC;
    }
</style>