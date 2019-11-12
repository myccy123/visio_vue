<template>
    <div>
        <common-nav></common-nav>
        <div class="left">
            <el-select v-model="chartCate" placeholder="请选择" size="mini"
                       @change="chartList"
                       style="margin: 10px 0 10px 0;">
                <el-option
                        v-for="item in cateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <div v-for="chart in charts" class="chart-box"
                 draggable="true"
                 @dragstart="dragChart($event, chart)"
                 @dragend="dragend">
                <img :src="chart.icon">
            </div>
        </div>
        <div class="right">
            <div class="temp-setting">
                <el-form label-width="80px" :model="templateConfig" size="mini" :inline="true">
                    <el-form-item label="名称">
                        <el-input v-model="templateConfig.name"></el-input>
                    </el-form-item>
                    <el-form-item label="宽">
                        <el-input v-model="templateConfig.width"></el-input>
                    </el-form-item>
                    <el-form-item label="高">
                        <el-input v-model="templateConfig.height"></el-input>
                    </el-form-item>
                    <el-form-item label="背景色" style="height: 28px">
                        <el-color-picker v-model="templateConfig.backgroundColor" color-format="hex"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" plain icon="el-icon-circle-plus-outline"
                                   style="margin-left: 20px;" @click="addBox">add
                        </el-button>
                        <el-button size="mini" type="primary" @click="publish">发布</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="draw-box"
                 :style="{width: templateConfig.width != ''?templateConfig.width+'px':'', height: templateConfig.height != ''?templateConfig.height+'px':''}">
                <grid-layout
                        :layout.sync="layout"
                        :col-num="cols"
                        :row-height="rowHeight"
                        :max-rows="maxRow"
                        :is-draggable="true"
                        :is-resizable="true"
                        :is-mirrored="false"
                        :vertical-compact="true"
                        :margin="margin"
                        :auto-size="true"
                        :use-css-transforms="true"
                        :style="{border: '1px dashed #79aec8', 'background-color': templateConfig.backgroundColor}"
                >

                    <grid-item v-for="item in layout" class="box"
                               @dragover.native.prevent
                               @drop.native="dropDown"
                               @resized="rerefshBox(item)"
                               dragAllowFrom=".move-btn"
                               :x="item.x"
                               :y="item.y"
                               :w="item.w"
                               :h="item.h"
                               :i="item.i"
                               :key="item.i">
                        <div :id="item.i" style="height: 100%; width: 100%;" class="box-div">

                        </div>
                        <div class="tool-box">
                            <i class="el-icon-setting refresh-btn" @click="rerefshBox(item)"></i>
                            <i class="el-icon-refresh refresh-btn" @click="rerefshBox(item)"></i>
                            <i class="el-icon-rank move-btn"></i>
                            <i class="el-icon-delete del-btn" @click="delBox(item)"></i>
                        </div>
                    </grid-item>
                </grid-layout>
            </div>

        </div>
    </div>
</template>

<script>
    import commonNav from '../common/nav';
    import opt from '../../config/options';
    import VueGridLayout from 'vue-grid-layout';
    import echarts from "echarts";
    import 'echarts-gl';

    export default {
        name: "template_edit",
        components: {
            commonNav,
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem
        },
        data() {
            return {
                chartCate: 'all',
                charts: [],
                templateConfig: {
                    name: '',
                    backgroundColor: '',
                    width: '',
                    height: ''
                },
                layout: [{"x": 0, "y": 0, "w": 4, "h": 6, "i": "0", chart: null}],
                cols: 30,
                rowHeight: 30,
                margin: [10, 10], //[left-right, top-bottom]
                maxId: 0,
                cateOptions: opt.CATE_OPTIONS
            }
        },
        computed: {
            maxRow() {
                if (!this.templateConfig.height) {
                    return Infinity
                } else {
                    return (parseInt(this.templateConfig.height) - this.margin[1]) / (this.rowHeight + this.margin[1])
                }
            },
        },
        mounted() {
            this.chartList('all')
        },
        methods: {
            chartList(cate) {
                this.$axios.post(this.$api.chartList, {cate: cate, userid: 'yujiahao'}).then((res) => {
                    this.charts = [];
                    if (res.data.code === '00') {
                        this.charts = res.data.data;
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            addBox() {
                this.maxId++;
                this.layout.push({"x": 0, "y": 0, "w": 4, "h": 6, "i": this.maxId, chart: null})
            },
            delBox(item) {
                this.layout.splice(this.layout.indexOf(item), 1)
            },
            rerefshBox(item) {
                if (item.chart) {
                    item.chart.resize()
                }
            },
            dragChart(e, chart) {
                e.dataTransfer.setData('chartid', chart.id);
            },
            dragend(e) {
                e.dataTransfer.clearData();
            },
            getElementbyClass(el, className) {
                if (el.className.indexOf(className) === -1) {
                    return this.getElementbyClass(el.parentElement, className)
                } else {
                    return el
                }
            },
            dropDown(e) {
                let domId = this.getElementbyClass(e.target, 'box-div').id;
                let chartid = e.dataTransfer.getData('chartid');
                this.$axios.post(this.$api.getChart, {id: chartid}).then((res) => {
                    if (res.data.code === '00') {
                        echarts.dispose(document.getElementById(domId));
                        let myChart = echarts.init(document.getElementById(domId));
                        for(let f of res.data.data.functions) {
                            eval('res.data.data.chartOptions' + f.name + '='+ f.fun)
                        }
                        myChart.setOption(res.data.data.chartOptions);
                        this.setChart(parseInt(domId), myChart)
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch((err) => {

                })
            },
            setChart(boxId, chart) {
                for (let item of this.layout) {
                    if (item.i == boxId) {
                        item.chart = chart
                    }
                }
            },
            publish() {
                let temp = {
                    layout: this.layout,
                    height: this.height,
                    width: this.width,
                    margin: this.margin,
                    cols: this.cols,
                    rows: this.maxRow,
                    rowHeight: this.rowHeight
                };
                console.log(temp)
            }
        }
    }
</script>

<style scoped>
    .left {
        width: 300px;
        float: left;
        height: calc(100vh - 57px);
        text-align: center;
        overflow: auto;
    }

    .right {
        float: left;
        width: calc(100vw - 320px);
        height: calc(100vh - 57px);
    }

    .chart-box {
        width: 280px;
        height: 220px;
        margin: 6px auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .chart-box img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .temp-setting {
        padding: 10px 0;
    }

    .draw-box {
        height: calc(100vh - 115px);
        margin: 0 8px 8px 8px;
        /*border: 1px dashed #79aec8;*/
    }

    .box {
        border: 1px solid #79aec8;
        overflow: hidden;
    }

    .temp-setting .el-form-item {
        margin-bottom: 0 !important;
    }

    .tool-box {
        height: 30px;
        line-height: 30px;
        width: 200px;
        text-align: right;
        position: absolute;
        top: 0;
        right: 0;
    }

    .del-btn {
        height: 5px;
        width: 5px;
        margin-right: 15px;
        cursor: pointer;
        color: red;
    }

    .move-btn {
        height: 5px;
        width: 5px;
        margin-right: 15px;
        cursor: move;
        color: #79aec8;
    }

    .refresh-btn {
        height: 5px;
        width: 5px;
        margin-right: 15px;
        cursor: pointer;
        color: #79aec8;
    }
</style>