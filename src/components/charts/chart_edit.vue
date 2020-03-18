<template>
    <div style="height:100vh">
        <common-nav></common-nav>
        <div style="display:flex">
            <div>
                <h2 class="h2-title">chart类型</h2>
                <div class="chart-edit-menu-wrap">
                    <div class="chart-cate">
                        <ul>
                            <el-tooltip
                                v-for="(cate,index) in options.CHART_CATES"
                                effect="dark"
                                :content="cate.name"
                                placement="left"
                                :key="index"
                            >
                                <li
                                    :class="{selCate: cate.value === chartCate}"
                                    @click="switchCate(cate.value)"
                                >
                                    <img :src="cate.icon" />
                                </li>
                            </el-tooltip>
                        </ul>
                    </div>
                    <div class="chart-type">
                        <ul>
                            <li
                                v-for="(tp,index) in options.CHART_TYPES[chartCate]"
                                :class="hitChartType(tp)"
                                @click="switchChart(tp)"
                                :key="index"
                            >
                                <div>
                                    <img :src="tp.icon" />
                                </div>
                                <h3>{{tp.name}}</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="chart-edit-main-wrap">
                <div class="chart-main-router-wrap">
                    <h2 class="h2-title">chart设置</h2>
                    <div class="center-top-router">
                        <center-top></center-top>
                    </div>
                    <div class="center-bottom-router">
                        <center-bottom></center-bottom>
                    </div>
                    <div style="text-align:center;margin-top:10px">
                        <el-button
                            type="primary"
                            :disabled="false"
                            @click="saveChart"
                            :loading="$store.state.loading"
                            icon="el-icon-upload"
                            style="width: 200px;"
                        >保 存</el-button>
                        <el-button
                            type="info"
                            plain
                            @click="showSourceList = true"
                            style="width: 200px;margin-left: 80px;"
                        >切换数据源</el-button>
                    </div>
                </div>

                <div class="right-side-router">
                    <h2 class="h2-title">度量与维度</h2>
                    <right-side></right-side>
                </div>
            </div>
        </div>

        <el-dialog
            title="选择您的数据源"
            :visible.sync="showSourceList"
            :close-on-click-modal="srcid !== ''"
            width="800px"
            :show-close="srcid !== ''"
            :close-on-press-escape="false"
        >
            <el-table
                :data="sourceList"
                :highlight-current-row="true"
                @current-change="changeSource"
                height="50vh"
                :row-style="{cursor: 'pointer'}"
                stripe
            >
                <el-table-column type="index"></el-table-column>
                <el-table-column
                    property="data_name"
                    label="数据源"
                    align="center"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column property="data_type" label="类型" align="center"></el-table-column>
                <el-table-column
                    property="db_name"
                    label="库名"
                    align="center"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                    property="table_name"
                    label="表名"
                    align="center"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column property="db_host" align="center" label="IP/HOST"></el-table-column>
                <el-table-column property="create_date" align="center" label="创建日期"></el-table-column>
                <el-button
                    slot="empty"
                    size="mini"
                    type="primary"
                    plain
                    @click="$router.replace({name: 'source'})"
                >还没数据? 去添加</el-button>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import CommonNav from "../common/nav";
import options from "../../config/options";
import mixin from "./chart-mixin";
import CenterTop from "./chart_edit/CenterTop.vue";
import CenterBottom from "./chart_edit/CenterBottom.vue";
import RightSide from "./chart_edit/RightSide.vue";
import chartMixin from './chart-mixin';
export default {
    name: "chartEdit",
    mixins: [mixin],
    components: { CommonNav, CenterTop, CenterBottom, RightSide },
    data() {
        return {
            options,
            showSourceList: true,
            sourceList: []
        };
    },
    computed: {
        hitChartType() {
            return tp => {
                let ret = false;
                if (tp.value === "diy") {
                    ret = tp.type === this.diy.diyType;
                } else {
                    ret = tp.value === this.chartType;
                }
                return { seledType: ret };
            };
        }
    },
    mounted() {
        this.init();
        this.getSource();
    },
    methods: {
        init() {
            this.initState();
            if (this.$route.query.id) {
                this.showSourceList = false;
                this.$axios
                    .post(this.$api.getChart, { id: this.$route.query.id })
                    .then(res => {
                        if (res.data.code === "00") {
                            let opt = res.data.data.formOptions;
                            for (let key in opt) {
                                let upKey =
                                    key.substr(0, 1).toUpperCase() +
                                    key.substr(1, key.length - 1);
                                if (this[`set${upKey}`])
                                    this[`set${upKey}`](opt[key]);
                            }

                            this.getCols();
                            this.initMap().then(() => {
                                let theme = this.baseConfig.theme;
                                echarts.dispose(
                                    document.getElementById("chart")
                                );
                                if (this.chartType === "diy") {
                                    this.$store.commit("setDefTab", "fourth");
                                    let jsCode = `${res.data.data.diyCode};
                                    var diyChart = echarts.init(document.getElementById('chart'), '${theme}')
                                    diyChart.setOption(option)
                                    return diyChart`;
                                    let jsFun = new Function(jsCode);
                                    chartObj = jsFun();
                                } else {
                                    echarts.dispose(
                                        document.getElementById("chart")
                                    );
                                    let myChart = echarts.init(
                                        document.getElementById("chart"),
                                        theme
                                    );
                                    myChart.setOption(
                                        res.data.data.chartOptions
                                    );
                                    chartObj = myChart;
                                }
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

            for (let theme of options.THEME) {
                require("../../assets/themes/" + theme.value);
            }
        },
        getSource() {
            this.$axios
                .post(this.$api.sourceList, { userid: "yujiahao" })
                .then(res => {
                    if (res.data.code === "00") {
                        this.sourceList = [];
                        this.sourceList = res.data.data;
                    }
                })
                .catch(err => {});
        },
        getCols() {
            this.$axios
                .post(this.$api.sourceDetail, { id: this.srcid })
                .then(res => {
                    if (res.data.code === "00") {
                        this.$store.commit("setColOptions", res.data.data);
                    }
                })
                .catch(err => {});
        },
        //切换小图
        switchCate(cate) {
            if (cate !== "diy" && cate !== "html") {
                this.$store.commit("setDefTab", "first");
            } else {
                this.$store.commit("setDefTab", "fourth");
            }
            this.setChartCate(cate);
        },
        //切换大图
        switchChart(type) {
            this.setChartType(type.value);
            let chart = document.getElementById("chart");
            if (chart) {
                echarts.dispose(chart);
            }

            if (type.value === "diy") {
                this.$axios.get(type.js).then(res => {
                    this.diy.code = res.data;
                    this.diy.diyType = type.type;
                    this.genVision();
                });
            }else {
                this.diy.code = "";
                this.diy.diyType = "";
                this.genVision();
            }
        },
        //提交数据
        saveChart() {
            let chart = echarts.getInstanceByDom(
                document.getElementById("chart")
            );
            if (chart) {
                this.isSave = true;
                this.baseConfig.icon = chart.getDataURL();
                this.setChartCate(this.getCateOfType());
                this.$nextTick(() => {
                    this.genVision();
                });
            } else {
                this.$message.error("图片未生成，无法保存！");
            }
        },
        getCateOfType() {
            for (let cate in options.CHART_TYPES) {
                for (let tp of options.CHART_TYPES[cate]) {
                    if (tp.value === this.chartType) {
                        return cate;
                    }
                }
            }
        },
        changeSource(newrow, oldrow) {
            this.setSrcid(newrow.id);
            this.showSourceList = false;
            this.getCols();
        }
    },
    destroyed() {
        if(chartObj){
            echarts.dispose(chartObj);
        }   
    }
};
</script>

<style scoped>
.chart-edit-menu-wrap {
    width: 250px;
    height: calc(100vh - 80px);
    display: flex;
}

.h2-title {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #909399;
    margin: 0;
    padding: 5px;
    background-color: #f2f6fc;
}

.chart-edit-menu-wrap .chart-cate {
    background-color: #f2f6fc;
    height: calc(100vh - 160px);
}

.chart-cate li {
    width: 20px;
    height: 20px;
    padding: 5px;
    margin-top: 10px;
    cursor: pointer;
}

.chart-cate img {
    width: 100%;
    height: 100%;
}

.chart-type {
    width: 220px;
    height: calc(100vh - 110px);
    overflow: auto;
}

.chart-type li {
    width: 95%;
    margin: 7px auto 5px auto;
    cursor: pointer;
    transition: 0.3s;
}

.chart-type li:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transform: translate(4px, 0);
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
    margin: 0;
    padding: 2px;
    background-color: #f2f6fc;
}

.chart-edit-main-wrap {
    width: calc(100vw - 250px);
    display: flex;
}

.right-side-router {
    height: calc(100vh - 42px);
    width: 280px;
    overflow: auto;
}

.selCate {
    background-color: #dcdfe6;
}

/* 中间路由区域 */
.chart-main-router-wrap {
    padding: 0 12px;
    height: calc(100vh - 80px);
    width: calc(100% - 280px);
}
.center-top-router {
    height: 140px;
    margin: 10px auto auto;
    border: 1px solid #79aec8;
    border-radius: 2px;
}

.center-bottom-router {
    height: calc(100% - 210px);
    /* width: calc(90% + 20px); */
    margin: 10px auto 0;
    border: 1px solid #79aec8;
}
</style>
<style >
</style>