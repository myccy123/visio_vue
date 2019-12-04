<template>
    <div>
        <common-nav></common-nav>
        <div class="left" v-loading="loading">
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
                 @dragstart="dragStart($event, chart)"
            >
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
                        <el-button :loading="loading2" size="mini" type="primary" @click="publish"
                                   icon="el-icon-upload">发布
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="draw-box"
                 :style="{width: templateConfig.width != ''?templateConfig.width+'px':'', height: templateConfig.height != ''?templateConfig.height+'px':'', paddingRight: templateConfig.width != ''?'20px':''}">
                <grid-layout
                        id="draw-win"
                        ref="layout"
                        :layout.sync="layout"
                        :col-num="cols"
                        :row-height="rowHeight"
                        :max-rows="maxRow"
                        :is-draggable="true"
                        :is-resizable="true"
                        :is-mirrored="false"
                        :vertical-compact="true"
                        :useCssTransforms="false"
                        :margin="margin"
                        :auto-size="true"
                        :use-css-transforms="true"
                        style="margin-bottom: 20px;border: 1px dashed #79aec8"
                        :style="{'background-color': templateConfig.backgroundColor}">

                    <grid-item v-for="item in layout" class="box"
                               @resized="rerefshBox(item)"
                               dragAllowFrom=".move-btn"
                               :x="item.x"
                               :y="item.y"
                               :w="item.w"
                               :h="item.h"
                               :i="item.i"
                               :key="item.i">
                        <div :id="item.i" style="height: 100%; width: 100%;position: absolute;top: 0;z-index: 98">
                            <div v-for="(row, i) in item.charts" :style="{height: 100/item.charts.length + '%'}"
                                 :key="row.id"
                                 style="display: flex;justify-content:space-around;">
                                <div v-for="(col, j) in row.cols"
                                     :key="col.id"
                                     style="position: relative;padding:12px; box-sizing: border-box"
                                     :style="{height: '100%', width: 100/row.cols.length + '%'}"
                                     class="box-div"
                                     @dragend="dragEnd"
                                     @dragover.prevent
                                     @drop="dropDown">
                                    <div style="height: 100%">
                                        <div class="chartCtnClass" :id="'chartContainer' + col.id"
                                             style="height: 100%"></div>
                                    </div>
                                    <div v-if="item.showMask" class="arrow-box">
                                        <i @click="addLeft(item, i, j)" class="el-icon-arrow-left arrow-btn"></i>
                                        <i @click="addRight(item, i, j)" class="el-icon-arrow-right arrow-btn"></i>
                                        <i @click="addDown(item, i, j)" class="el-icon-arrow-down arrow-btn"></i>
                                        <i @click="addUp(item, i, j)" class="el-icon-arrow-up arrow-btn"></i>
                                        <i @click="delChart(item, i, j)" class="el-icon-delete-solid arrow-btn"></i>
                                        <i @click="editHTML(item, i, j)" class="el-icon-edit-outline arrow-btn"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tool-box">
                            <i class="el-icon-delete del-btn" @click="delBox(item)"></i>
                            <i class="el-icon-full-screen refresh-btn" @click="changeBorder(item)"></i>
                            <i class="el-icon-setting refresh-btn" @click="item.showMask = !item.showMask"></i>
                            <i class="el-icon-refresh refresh-btn" @click="rerefshBox(item)"></i>
                            <i class="el-icon-rank move-btn"></i>
                        </div>
                        <SvgBorder v-if="item.svgBorder == 'border1' || !item.svgBorder"
                                   style="position: absolute;z-index: 97"
                                   :svgKey="'svg-filter-' + item.i"></SvgBorder>
                    </grid-item>
                </grid-layout>

                <el-dialog title="嵌入HTML" :visible.sync="showEditCode" width="800px" top="50px" :modal="false">
                    <div class="edit-code">
                        <el-input type="textarea" v-model="htmlCode"></el-input>
                    </div>
                    <span slot="footer">
                        <el-button @click="showEditCode = false" size="mini">取 消</el-button>
                        <el-button @click="confirmHTML" type="primary" size="mini">确 定</el-button>
                    </span>
                </el-dialog>

                <el-dialog title="选择边框" :visible.sync="showEditBorder" width="800px" top="50px" :modal="false">
                    <div class="edit-border" style="display: flex; justify-content: space-around;">
                        <div v-for="b in borderOptions" class="source-icon" @click="confirmBorder(b.value)">
                            <img :src="b.icon">
                            <span>{{b.label}}</span>
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import commonNav from '../common/nav';
    import SvgBorder from '../common/SvgBorder';
    import opt from '../../config/options';
    import VueGridLayout from 'vue-grid-layout';
    import echarts from "echarts";
    import 'echarts-gl';
    import lodash from 'lodash';
    import html2canvas from 'html2canvas';

    export default {
        name: "template_edit",
        components: {
            commonNav,
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            SvgBorder,
        },
        data() {
            return {
                showEditCode: false,
                showEditBorder: false,
                editingBox: null,
                editingItem: null,
                htmlCode: '',
                templateId: '',
                chartCate: 'all',
                charts: [],
                templateConfig: {
                    name: '',
                    backgroundColor: '',
                    width: '',
                    height: ''
                },
                layout: [{
                    "x": 0,
                    "y": 0,
                    "w": 4,
                    "h": 6,
                    "i": "0",
                    showMask: false,
                    svgBorder: 'border1',
                    charts: [
                        {
                            id: 20000,
                            cols: [{id: 10000, chart: null, chartId: '', domId: 'chartContainer10000', html: ''}]
                        }
                    ]
                }],
                cols: 30,
                rowHeight: 30,
                margin: [10, 10], //[left-right, top-bottom]
                maxId: 0,
                maxChartId: 10000,
                maxRowId: 20000,
                cateOptions: opt.CATE_OPTIONS,
                borderOptions: opt.SVG_BORDERS,
                loading: false,
                loading2: false,
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
        created() {
            for (let theme of opt.THEME) {
                require('../../assets/themes/' + theme.value);
            }
        },
        mounted() {
            this.chartList('all');

            if (this.$route.query.id) {
                this.$axios.post(this.$api.getTemplate, {id: this.$route.query.id}).then((res) => {
                    if (res.data.code === '00') {
                        this.templateId = res.data.data.id;
                        this.layout = res.data.data.layout_info.layout;
                        this.templateConfig = res.data.data.layout_info.templateInfo;
                        this.margin = res.data.data.layout_info.templateInfo.margin;
                        this.cols = res.data.data.layout_info.templateInfo.cols;
                        this.maxId = res.data.data.layout_info.templateInfo.maxId;
                        this.maxChartId = res.data.data.layout_info.templateInfo.maxChartId;
                        this.maxRowId = res.data.data.layout_info.templateInfo.maxRowId;

                        for (let item of this.layout) {
                            for (let row of item.charts) {
                                for (let col of row.cols) {
                                    if (col.html) {
                                        this.$nextTick(() => {
                                            this.renderHTML(document.getElementById(col.domId), col.html)
                                        })
                                    }
                                    if (col.chartId !== '') {

                                        this.$axios.post(this.$api.getChart, {id: col.chartId}).then((res) => {
                                            if (res.data.code === '00') {
                                                let domId = col.domId;

                                                if (res.data.data.chartType === 'diy') {
                                                    let js = document.createElement('script');
                                                    js.innerHTML = `${res.data.data.diyCode};
                                                    var ${domId} = echarts.init(document.getElementById('${domId}'), ${res.data.data.diyCode.theme});
                                                    ${domId}.setOption(option)`;
                                                    document.querySelector('body').appendChild(js);
                                                    col.chart = echarts.getInstanceByDom(document.getElementById(domId))

                                                } else {
                                                    let myChart = echarts.init(document.getElementById(domId), res.data.data.theme);
                                                    myChart.setOption(res.data.data.chartOptions);
                                                    col.chart = myChart;
                                                }
                                            } else {
                                                this.$message.error(res.data.message)
                                            }
                                        }).catch((err) => {

                                        })
                                    }
                                }
                            }
                        }
                    }
                }).catch((err) => {

                })
            }
        },
        methods: {
            chartList(cate) {
                this.loading = true;
                this.$axios.post(this.$api.chartList, {cate: cate, userid: 'yujiahao'}).then((res) => {
                    this.charts = [];
                    if (res.data.code === '00') {
                        this.charts = res.data.data;
                    }
                    this.loading = false
                }).catch((err) => {
                    console.log(err);
                    this.loading = false
                })
            },
            addBox() {
                this.maxId++;
                this.maxChartId++;
                this.maxRowId++;
                this.layout.push({
                    "x": 0,
                    "y": 0,
                    "w": 4,
                    "h": 6,
                    "i": this.maxId,
                    showMask: false,
                    svgBorder: 'border1',
                    charts: [
                        {
                            id: this.maxRowId,
                            cols: [{
                                id: this.maxChartId,
                                chart: null,
                                chartId: '',
                                domId: 'chartContainer' + this.maxChartId,
                                html: ''
                            }]
                        }
                    ]
                })

            },
            changeBorder(item) {
                this.editingItem = item;
                this.showEditBorder = true;
            },
            confirmBorder(v) {
                this.editingItem.svgBorder = v;
                this.showEditBorder = false;
            },
            delBox(item) {
                this.layout.splice(this.layout.indexOf(item), 1)
            },
            rerefshBox(item) {
                this.$nextTick(() => {
                    for (let row of item.charts) {
                        for (let col of row.cols) {
                            if (col.chart) {
                                col.chart.resize()
                            }
                        }
                    }
                })
            },
            dragStart(e, chart) {
                e.dataTransfer.setData('chartid', chart.id);
            },
            dragEnd(e) {
                e.dataTransfer.clearData();
            },
            chartBoxHover(col) {
                col.showMask = true
            },
            chartBoxLeave(col) {
                col.showMask = false
            },
            getChartBox(el) {
                if (el.className === 'box-div') {
                    return el.childNodes[0].childNodes[0]
                } else {
                    return this.getChartBox(el.parentNode)
                }
            },
            dropDown(e) {
                let domId = this.getChartBox(e.target).id;
                let chartid = e.dataTransfer.getData('chartid');
                this.$axios.post(this.$api.getChart, {id: chartid}).then((res) => {
                    if (res.data.code === '00') {

                        echarts.dispose(document.getElementById(domId));

                        if (res.data.data.chartType === 'diy') {
                            let js = document.createElement('script');
                            js.innerHTML = `${res.data.data.diyCode};
                            var ${domId} = echarts.init(document.getElementById('${domId}'), ${res.data.data.diyCode.theme});
                            ${domId}.setOption(option)`;
                            document.querySelector('body').appendChild(js);

                            this.setChart(domId, echarts.getInstanceByDom(document.getElementById(domId)), chartid)

                        } else {
                            let myChart = echarts.init(document.getElementById(domId), res.data.data.theme);
                            myChart.setOption(res.data.data.chartOptions);
                            this.setChart(domId, myChart, chartid)
                        }

                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch((err) => {

                })
            },
            setChart(boxId, chart, chartId) {
                for (let item of this.layout) {
                    for (let row of item.charts) {
                        for (let col of row.cols) {
                            if (col.domId == boxId) {
                                col.chart = chart;
                                col.chartId = chartId;
                                col.html = '';
                                return
                            }
                        }
                    }
                }
            },
            publish() {
                this.loading2 = true;
                let _this = this;
                html2canvas(document.getElementById('draw-win'), {
                    ignoreElements: (el) => {
                        if (el.className === 'tool-box') {
                            return true
                        }
                        if (el.className === 'vue-resizable-handle') {
                            return true
                        }
                    },
                    width: document.getElementById('draw-win').offsetWidth,
                    height: document.getElementById('draw-win').offsetHeight
                }).then(function (canvas) {
                    let lo = lodash.cloneDeepWith(_this.layout, (val, key) => {
                        if (key === 'chart') {
                            return null
                        }
                    });
                    let rows = _this.maxRow;
                    if (_this.maxRow === Infinity) {
                        let max = 0;
                        for (let l of _this.layout) {
                            if ((l.y + l.h) > max) {
                                max = l.y + l.h
                            }
                        }
                        rows = max
                    }
                    let data = {
                        id: _this.templateId,
                        userid: '',
                        name: _this.templateConfig.name,
                        icon: canvas.toDataURL("image/png"),
                        data: {
                            layout: lo,
                            templateInfo: {
                                height: _this.templateConfig.height,
                                width: _this.templateConfig.width,
                                backgroundColor: _this.templateConfig.backgroundColor,
                                name: _this.templateConfig.name,
                                offsetHeight: _this.$refs.layout.$el.offsetHeight,
                                offsetWidth: _this.$refs.layout.$el.offsetWidth,
                                margin: _this.margin,
                                cols: _this.cols,
                                rows: rows,
                                rowHeight: _this.rowHeight,
                                maxId: _this.maxId,
                                maxChartId: _this.maxChartId,
                                maxRowId: _this.maxRowId,
                            }
                        }
                    };
                    _this.$axios.post(_this.$api.publish, data).then((res) => {
                        if (res.data.code === '00') {
                            _this.$router.push({name: 'templateList'})
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                });

            },
            editHTML(item, i, j) {
                this.htmlCode = item.charts[i].cols[j].html;
                this.editingBox = item.charts[i].cols[j];
                this.showEditCode = true;
            },
            confirmHTML() {
                this.editingBox.html = this.htmlCode;
                if (this.htmlCode) {
                    this.renderHTML(document.getElementById(this.editingBox.domId), this.htmlCode);
                }
                this.showEditCode = false;
            },
            renderHTML(dom, html) {
                if (html) {
                    let c = echarts.getInstanceByDom(dom);
                    if (c) {
                        c.dispose()
                    }
                    dom.innerHTML = html
                }
            },
            addLeft(item, i, j) {
                this.maxChartId++;
                item.charts[i].cols.splice(j, 0, {
                    id: this.maxChartId,
                    chart: null,
                    domId: 'chartContainer' + this.maxChartId,
                    html: ''
                });
                this.rerefshBox(item)
            },
            addRight(item, i, j) {
                this.maxChartId++;
                item.charts[i].cols.splice(j + 1, 0, {
                    id: this.maxChartId,
                    chart: null,
                    domId: 'chartContainer' + this.maxChartId,
                    html: ''
                });
                this.rerefshBox(item)
            },
            addUp(item, i, j) {
                this.maxChartId++;
                this.maxRowId++;
                item.charts.splice(i, 0, {
                    id: this.maxRowId,
                    cols: [{id: this.maxChartId, chart: null, domId: 'chartContainer' + this.maxChartId, html: ''}]
                });
                this.rerefshBox(item)
            },
            addDown(item, i, j) {
                this.maxChartId++;
                this.maxRowId++;
                item.charts.splice(i + 1, 0, {
                    id: this.maxRowId,
                    cols: [{id: this.maxChartId, chart: null, domId: 'chartContainer' + this.maxChartId, html: ''}]
                });
                this.rerefshBox(item)
            },
            delChart(item, i, j) {
                if (item.charts[i].cols[j].chart) {
                    item.charts[i].cols[j].chart.dispose();
                }
                item.charts[i].cols.splice(j, 1);
                if (item.charts[i].cols.length === 0) {
                    item.charts.splice(i, 1)
                }
                if (item.charts.length === 0) {
                    this.maxChartId++;
                    this.maxRowId++;
                    item.charts.push({
                        id: this.maxRowId,
                        cols: [
                            {
                                id: this.maxChartId,
                                chart: null,
                                chartId: '',
                                domId: 'chartContainer' + this.maxChartId,
                                html: ''
                            }
                        ]
                    })
                }
                this.rerefshBox(item)
            },
        }
    }
</script>

<style scoped>
    svg line {
        shape-rendering: crispEdges;
    }

    svg text {
        fill: none;
    }

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
        border-radius: 5px;
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
        min-height: calc(100vh - 115px);
        margin: 0 8px 8px 8px;
        /*border: 1px dashed #79aec8;*/
    }

    .box {
        /*border: 1px solid #79aec8;*/
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
        z-index: 99;
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


    .arrow-box {
        height: 100%;
        width: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        z-index: 0;
        top: 0;
        left: 0;
    }

    .arrow-btn {
        cursor: pointer;
        position: absolute;
        color: white;
    }

    .el-icon-arrow-left {
        left: 0;
        top: calc(50% - 8px);
    }

    .el-icon-arrow-right {
        right: 0;
        top: calc(50% - 8px);
    }

    .el-icon-arrow-up {
        left: calc(50% - 8px);
        top: 0;
    }

    .el-icon-arrow-down {
        left: calc(50% - 8px);
        bottom: 0;
    }

    .el-icon-delete-solid {
        left: calc(50% - 8px + 20px);
        top: calc(50% - 8px);
        color: red;
    }

    .el-icon-edit-outline {
        left: calc(50% - 8px - 20px);
        top: calc(50% - 8px);
    }

    .source-icon {
        height: 100px;
        width: 100px;
        margin: 20px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        transition: .3s;
    }

    .source-icon:hover {
        transform: scale(1.1);
    }

    .source-icon img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
</style>

<style>
    .vue-resizable-handle {
        z-index: 99 !important;
    }

    /*.chartCtnClass > div:first-child {*/
    /*    box-sizing: border-box;*/
    /*    padding: 10px !important;*/
    /*}*/

    /*.chartCtnClass canvas {*/
    /*    width: calc(100% - 24px) !important;*/
    /*    height: calc(100% - 24px) !important;*/
    /*    left: 12px !important;*/
    /*    top: 12px !important;*/
    /*}*/
</style>