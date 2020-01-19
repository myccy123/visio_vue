<template>
    <div>
        <common-nav
                style="position: fixed;top: 0;width: calc(100% - 16px);padding-top: 8px;background-color: #fff;z-index: 9999"></common-nav>
        <div class="left" v-loading="loading">
            <div style="display: flex;justify-content: space-around;margin: 10px 0;">
                <el-select v-model="chartCate" placeholder="请选择" size="mini"
                           @change="chartList"
                           style="width: 45%">
                    <el-option
                            v-for="item in cateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="customCate" placeholder="请选择" size="mini"
                           @change="chartList"
                           style="width: 45%">
                    <el-option
                            v-for="item in customCates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div v-for="chart in charts" class="chart-box"
                 draggable="true"
                 @dragstart="dragStart($event, chart)"
            >
                <img :src="chart.icon">
                <div class="chart-title">{{chart.title?chart.title:'未命名'}}</div>
            </div>
        </div>
        <div class="right">
            <div class="temp-setting">
                <el-form label-width="80px" :model="templateConfig" size="mini" :inline="true">
                    <el-form-item label="名称">
                        <el-input v-model="templateConfig.name"></el-input>
                    </el-form-item>
                    <el-form-item label="主题">
                        <el-select v-model="templateConfig.theme"
                                   placeholder="请选择"
                                   @change="switchTheme"
                                   clearable
                                   style="">
                            <el-option v-for="item in themeOptions" :key="item.value" :value="item.value"
                                       :label="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="背景色" style="height: 28px">
                        <el-color-picker v-model="templateConfig.backgroundColor" color-format="hex"
                                         :predefine="predefineColors"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="宽">
                        <el-input v-model="templateConfig.width" style="width: 80px;"></el-input>
                    </el-form-item>
                    <el-form-item label="高">
                        <el-input v-model="templateConfig.height" style="width: 80px;"></el-input>
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

                    <grid-item v-for="(item, idx) in layout" class="box"
                               @resized="refreshBox(item)"
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
                                    <div :mode="item.charts[i].cols[j].mode"
                                         :itemid="idx"
                                         :rowid="i"
                                         :colid="j"
                                         style="height: 100%;position: relative;overflow: hidden">
                                        <div class="chartCtnClass" :id="col.domId"
                                             style="width: 100%;height: 100%;position: absolute"></div>
                                    </div>
                                    <div v-if="item.showMask" class="arrow-box">
                                        <i @click="addLeft(item, i, j)" class="el-icon-arrow-left arrow-btn"></i>
                                        <i @click="addRight(item, i, j)" class="el-icon-arrow-right arrow-btn"></i>
                                        <i @click="addDown(item, i, j)" class="el-icon-arrow-down arrow-btn"></i>
                                        <i @click="addUp(item, i, j)" class="el-icon-arrow-up arrow-btn"></i>
                                        <div class="chart-btns">
                                            <el-dropdown size="mini" split-button
                                                         type="primary"
                                                         @click="editMode(item, i, j)"
                                                         @command="switchMode($event, item, i, j)">
                                                {{cmdMap(item.charts[i].cols[j].mode)}}
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item command="1">单图模式</el-dropdown-item>
                                                    <el-dropdown-item command="2">HTML模式</el-dropdown-item>
                                                    <el-dropdown-item command="3">轮播模式</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                            <el-button @click="delChart(item, i, j)" class="del-chart-btn chart-btn"
                                                       type="danger"
                                                       size="mini">删除
                                            </el-button>
                                            <el-button @click="item.showMask = !item.showMask"
                                                       class="del-chart-btn chart-btn"
                                                       size="mini">返回
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tool-box">
                            <el-tooltip effect="dark" content="删除" placement="top">
                                <i class="el-icon-delete del-btn" @click="delBox(item)"></i>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="刷新" placement="top">
                                <i class="el-icon-refresh refresh-btn" @click="refreshBox(item)"></i>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="设置边框" placement="top">
                                <i class="el-icon-full-screen refresh-btn" @click="changeBorder(item)"></i>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="设置容器" placement="top">
                                <i class="el-icon-setting refresh-btn" @click="item.showMask = !item.showMask"></i>
                            </el-tooltip>
                            <i class="el-icon-rank move-btn"></i>
                        </div>
                        <SvgBorder v-if="item.svgBorder == 'border1' || !item.svgBorder"
                                   style="position: absolute;z-index: 97"
                                   :bgColor="templateConfig.backgroundColor?templateConfig.backgroundColor:'#fff'"
                                   :borderColor="templateConfig.borderColor"
                                   :svgKey="'svg-filter-' + item.i"></SvgBorder>
                        <SvgBorder2 v-else-if="item.svgBorder == 'border2'"
                                    style="position: absolute;z-index: 97"
                                    :bgColor="templateConfig.backgroundColor?templateConfig.backgroundColor:'#fff'"
                                    :borderColor="templateConfig.borderColor"
                                    :svgKey="'svg-filter2-' + item.i"></SvgBorder2>
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

                <el-dialog title="选择边框" :visible.sync="showEditBorder" width="800px" top="50px" :modal="false"
                           class="border-dialog">
                    <el-color-picker v-model="templateConfig.borderColor" color-format="hex"
                                     :predefine="predefineColors" size="mini"></el-color-picker>
                    <div class="edit-border" style="display: flex; justify-content: space-around;">
                        <div v-for="b in borderOptions" class="source-icon" @click="confirmBorder(b.value)">
                            <div v-if="b.value == 'border0'"
                                 style="height: 100%;width: 100%;border: 1px dashed #1586ee;position: absolute;z-index: 197">
                            </div>
                            <SvgBorder v-else-if="b.value == 'border1' && showEditBorder"
                                       style="position: absolute;z-index: 197"
                                       bgColor="transparent"
                                       :borderColor="templateConfig.borderColor"
                                       :svgKey="'svg-filter-demo-' + b.value"></SvgBorder>
                            <SvgBorder2 v-else-if="b.value == 'border2' && showEditBorder"
                                        style="position: absolute;z-index: 197"
                                        bgColor="transparent"
                                        :borderColor="templateConfig.borderColor"
                                        :svgKey="'svg-filter-demo2-' + b.value"></SvgBorder2>
                            <span>{{b.label}}</span>
                        </div>
                    </div>
                </el-dialog>

                <el-dialog title="设置轮播" :visible.sync="showEditSlider" width="800px" top="50px"
                           :modal="false">
                    <div class="edit-slider" style="height: 400px;"
                         v-if="showEditSlider">
                        <draggable v-model="editingBox.slider" group="people"
                                   @start="drag=true" @end="drag=false"
                                   :options="{animation: 500}"
                                   style="height: 100%;display: flex;justify-content: center">
                            <div v-for="(sld, idx) in editingBox.slider" :key="'sld'+idx"
                                 class="slider-icon">
                                id: {{sld}}
                                <i class="el-icon-circle-close"
                                   style="color: red;position: absolute;top: 0;right: 0;cursor: pointer;"
                                   @click="delSlder(idx)"></i>
                            </div>
                        </draggable>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import commonNav from '../common/nav';
    import SvgBorder from '../common/SvgBorder';
    import SvgBorder2 from '../common/SvgBorder2';
    import opt from '../../config/options';
    import VueGridLayout from 'vue-grid-layout';
    import echarts from "echarts";
    import 'echarts-gl';
    import 'echarts-liquidfill';
    import 'echarts/extension/bmap/bmap'
    import lodash from 'lodash';
    import html2canvas from 'html2canvas';
    import draggable from 'vuedraggable'

    let chartSet = new Set();

    export default {
        name: "template_edit",
        components: {
            commonNav,
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            SvgBorder, SvgBorder2,
            draggable,
        },
        data() {
            return {
                showEditCode: false,
                showEditBorder: false,
                showEditSlider: false,
                editingBox: null,
                editingItem: null,
                predefineColors: ['#222974', '#293441', '#FDFCF5', '#323232', '#5B5C6E', '#FEF8EF'],
                timer: null,
                htmlCode: '',
                templateId: '',
                chartCate: 'all',
                customCate: 'all',
                charts: [],
                templateConfig: {
                    name: '',
                    backgroundColor: '',
                    width: '',
                    height: '',
                    theme: '',
                    borderColor: '#00c0FF',
                },
                layout: [{
                    "x": 0,
                    "y": 0,
                    "w": 15,
                    "h": 6,
                    "i": "0",
                    showMask: false,
                    svgBorder: 'border1',
                    charts: [
                        {
                            id: 20000,
                            cols: [{
                                id: 10000,
                                chart: null,
                                chartId: '',
                                domId: 'chartWrapper10000',
                                html: '',
                                slider: [],
                                sliderIndex: 0,
                                mode: '1',
                            }]
                        }
                    ]
                }],
                cols: 60,
                rowHeight: 30,
                margin: [10, 10], //[left-right, top-bottom]
                maxId: 0,
                maxChartId: 10000,
                maxRowId: 20000,
                cateOptions: opt.CATE_OPTIONS,
                customCates: [],
                borderOptions: opt.SVG_BORDERS,
                themeOptions: opt.THEME,
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

            this.chartList();
            this.customCateList();
            this.startTick();
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
                                    this.$nextTick(() => {
                                        this.renderChart(col)
                                    })
                                }
                            }
                        }
                    }
                }).catch((err) => {

                })
            }
        },
        destroyed() {
            window.clearInterval(this.timer);
            for (let c of chartSet) {
                echarts.dispose(c)
            }
        },
        methods: {
            startTick() {
                this.timer = setInterval(() => {
                    for (let item of this.layout) {
                        for (let row of item.charts) {
                            for (let col of row.cols) {
                                if (col.mode === '3' && col.slider.length > 1) {
                                    let domId = col.domId;
                                    let dom = document.getElementById(domId);
                                    if (col.sliderIndex >= col.slider.length) {
                                        col.sliderIndex = 0
                                    }
                                    col.chartId = col.slider[col.sliderIndex];
                                    this.renderChart(col);
                                    col.sliderIndex++;
                                }
                            }
                        }
                    }
                }, 3000)
            },
            initMap(map) {
                return new Promise((resolve, reject) => {
                    if (!map) {
                        resolve();
                    } else {
                        this.$axios.get(this.$api.mapDir, {params: {mapfile: map}}).then((res) => {
                            echarts.registerMap(map, res.data);
                            console.log(`地图（${map}）初始化成功！`);
                            resolve();

                        }).catch((err) => {
                            console.log(err);
                            resolve();
                        })
                    }
                })
            },
            chartList() {
                this.loading = true;
                this.$axios.post(this.$api.chartList, {
                    cate: this.chartCate,
                    customCate: this.customCate,
                    userid: 'yujiahao'
                }).then((res) => {
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
            customCateList() {
                this.$axios.post(this.$api.customCates).then((res) => {
                    if (res.data.code === '00') {
                        this.customCates = res.data.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            switchTheme(v) {
                if (v === '') {
                    this.templateConfig.backgroundColor = '';
                } else {
                    for (let t of this.themeOptions) {
                        if (t.value === v) {
                            this.templateConfig.backgroundColor = t.backgroundColor;
                            break;
                        }
                    }
                }

                for (let item of this.layout) {
                    for (let row of item.charts) {
                        for (let col of row.cols) {
                            this.renderChart(col)
                        }
                    }
                }
            },
            addBox() {
                this.maxId++;
                this.maxChartId++;
                this.maxRowId++;
                this.layout.push({
                    "x": 0,
                    "y": 0,
                    "w": 15,
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
                                domId: 'chartWrapper' + this.maxChartId,
                                html: '',
                                slider: [],
                                sliderIndex: 0,
                                mode: '1',
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
                this.$confirm('确定删除此容器?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    for(let row of item.charts) {
                        for(let col of row.cols) {
                            echarts.dispose(document.getElementById(col.domId))
                        }
                    }

                    this.layout.splice(this.layout.indexOf(item), 1)
                }).catch(() => {
                });

            },
            refreshBox(item) {
                this.$nextTick(() => {
                    for (let row of item.charts) {
                        for (let col of row.cols) {
                            let ct = echarts.getInstanceByDom(document.getElementById(col.domId));
                            if (ct) {
                                ct.resize()
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
            renderChart(col) {
                let dom = document.getElementById(col.domId);
                if (col.html) {
                    this.$nextTick(() => {
                        this.renderHTML(dom, col.html)
                    })
                }
                if (col.chartId !== '') {
                    this.$axios.post(this.$api.getChart, {id: col.chartId}).then((res) => {
                        if (res.data.code === '00') {
                            let domId = col.domId;

                            this.initMap(res.data.data.formOptions.moreConfig.map).then(() => {
                                echarts.dispose(dom);
                                let theme = res.data.data.theme;
                                if (this.templateConfig.theme) {
                                    theme = this.templateConfig.theme
                                }

                                if (res.data.data.chartType === 'diy') {
                                    let jsCode = `${res.data.data.diyCode};
                                        let ${domId} = echarts.init(document.getElementById('${domId}'), '${theme}', {renderer: 'canvas'});
                                        ${domId}.setOption(option);
                                        return ${domId}`;
                                    let jsFun = new Function(jsCode);
                                    let chart = jsFun();
                                    chartSet.add(chart)
                                } else {
                                    let myChart = echarts.init(dom, theme);
                                    myChart.setOption(res.data.data.chartOptions);
                                    chartSet.add(myChart)
                                }
                            });

                        } else {
                            this.$message.error(res.data.message)
                        }
                    }).catch((err) => {

                    })
                }
            },
            getChartBox(el, chartid) {
                if (el.className.indexOf('box-div') !== -1) {
                    let itemid = el.childNodes[0].getAttribute('itemid');
                    let rowid = el.childNodes[0].getAttribute('rowid');
                    let colid = el.childNodes[0].getAttribute('colid');
                    let colObj = this.layout[itemid].charts[rowid].cols[colid];

                    if (el.childNodes[0].getAttribute('mode') === '3') {
                        colObj.slider.push(chartid);
                    }
                    return colObj
                } else {
                    return this.getChartBox(el.parentNode, chartid)
                }
            },
            dropDown(e) {
                let chartid = e.dataTransfer.getData('chartid');
                let obj = this.getChartBox(e.target, chartid);
                obj.chartId = chartid;
                this.renderChart(obj)
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
                                theme: _this.templateConfig.theme,
                                borderColor: _this.templateConfig.borderColor,
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
                        console.log(err);
                        _this.loading2 = false;
                    })
                });

            },
            editMode(item, i, j) {
                let mode = item.charts[i].cols[j].mode;
                if (mode === '2') {
                    this.editHTML(item, i, j)
                } else if (mode === '3') {
                    this.editSlider(item, i, j)
                }
            },
            switchMode(cmd, item, i, j) {
                // item.charts[i].cols[j].mode = cmd
                this.$set(item.charts[i].cols[j], 'mode', cmd);
                echarts.dispose(document.getElementById(item.charts[i].cols[j].domId))
            },
            cmdMap(cmd) {
                if (cmd === '1') {
                    return '单图'
                } else if (cmd === '2') {
                    return '编辑HTML'
                } else if (cmd === '3') {
                    return '编辑轮播'
                }
            },
            editSlider(item, i, j) {
                this.editingBox = item.charts[i].cols[j];
                this.showEditSlider = true
            },
            delSlder(idx) {
                this.editingBox.slider.splice(idx, 1)
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
                    domId: 'chartWrapper' + this.maxChartId,
                    html: '',
                    slider: [],
                    sliderIndex: 0,
                    mode: '1',
                });
                this.refreshBox(item)
            },
            addRight(item, i, j) {
                this.maxChartId++;
                item.charts[i].cols.splice(j + 1, 0, {
                    id: this.maxChartId,
                    chart: null,
                    domId: 'chartWrapper' + this.maxChartId,
                    html: '',
                    slider: [],
                    sliderIndex: 0,
                    mode: '1',
                });
                this.refreshBox(item)
            },
            addUp(item, i, j) {
                this.maxChartId++;
                this.maxRowId++;
                item.charts.splice(i, 0, {
                    id: this.maxRowId,
                    cols: [{
                        id: this.maxChartId,
                        chart: null,
                        domId: 'chartWrapper' + this.maxChartId,
                        html: '',
                        slider: [],
                        sliderIndex: 0,
                        mode: '1',
                    }]
                });
                this.refreshBox(item)
            },
            addDown(item, i, j) {
                this.maxChartId++;
                this.maxRowId++;
                item.charts.splice(i + 1, 0, {
                    id: this.maxRowId,
                    cols: [{
                        id: this.maxChartId,
                        chart: null,
                        domId: 'chartWrapper' + this.maxChartId,
                        html: '',
                        slider: [],
                        sliderIndex: 0,
                        mode: '1',
                    }]
                });
                this.refreshBox(item)
            },
            delChart(item, i, j) {
                echarts.dispose(document.getElementById(item.charts[i].cols[j].domId));
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
                                domId: 'chartWrapper' + this.maxChartId,
                                html: '',
                                slider: [],
                                sliderIndex: 0,
                                mode: '1',
                            }
                        ]
                    })
                }
                this.refreshBox(item)
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
        height: calc(100vh - 57px);
        text-align: center;
        position: fixed;
        top: 49px;
        z-index: 1000;
        background-color: #fff;
        overflow: auto;
    }

    .right {
        float: left;
        margin-left: 300px;
        margin-top: 41px;
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
        position: relative;
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
        overflow: hidden;
    }

    .temp-setting .el-form-item {
        margin-bottom: 0 !important;
    }

    .tool-box {
        height: 30px;
        line-height: 30px;
        width: 100px;
        text-align: right;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 199;
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
        z-index: 100;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
    }

    .chart-btns {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 117px;
        height: 105px;
        margin: auto;
    }

    .chart-btn {
        margin: 0 !important;
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

    .source-icon {
        height: 100px;
        line-height: 100px;
        width: 100px;
        margin: 20px;
        /*padding: 20px;*/
        text-align: center;
        position: relative;
        cursor: pointer;
        border-radius: 5px;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
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

    .slider-icon {
        margin: 10px;
        height: 100px;
        line-height: 100px;
        width: 100px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        cursor: move;
        text-align: center;
        position: relative;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }

    .chart-title{
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        width: 100%;
        position: absolute;
        bottom: 0;
    }

</style>

<style>
    .vue-resizable-handle {
        z-index: 99 !important;
    }

    .border-dialog > .el-dialog .el-dialog__body {
        text-align: center;
    }

    .chart-btns .el-button-group .el-button:first-child {
        width: calc(100% - 28px) !important;
    }

</style>