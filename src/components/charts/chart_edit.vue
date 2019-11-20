<template>
    <div>
        <common-nav></common-nav>
        <div class="container">
            <div class="left-side">
                <h2 class="h2-title">chart类型</h2>
                <div class="chart-cate">
                    <ul>
                        <el-tooltip v-for="cate in cates" effect="dark" :content="cate.name" placement="left">
                            <li @click="formOptions.chartCate=cate.value"><img :src="cate.icon"></li>
                        </el-tooltip>
                    </ul>
                </div>
                <div class="chart-type">
                    <ul>
                        <li v-for="tp in types[formOptions.chartCate]" class="seled-type" @click="switchChart(tp)">
                            <div><img :src="tp.icon"></div>
                            <h3>{{tp.name}}</h3></li>
                    </ul>
                </div>
            </div>
            <div class="main">
                <h2 class="h2-title">chart设置</h2>
                <el-tabs class="chart-config" v-model="defTab">
                    <el-tab-pane label="基本设置" name="first">
                        <el-form ref="form" :inline="true" :model="formOptions.baseConfig" size="mini"
                                 label-width="80px" style="text-align: left;">
                            <el-form-item label="主标题">
                                <el-input class="chart-base-info" v-model="formOptions.baseConfig.title"
                                          @blur="genChart"></el-input>
                            </el-form-item>
                            <el-form-item label="分类">
                                <el-input class="chart-base-info" v-model="formOptions.baseConfig.cate"
                                          placeholder="未分类"></el-input>
                            </el-form-item>
                            <el-form-item label="副标题">
                                <el-input class="chart-base-info" v-model="formOptions.baseConfig.subTitle"
                                          @blur="genChart"></el-input>
                            </el-form-item>
                            <el-form-item label="主题">
                                <el-select v-model="formOptions.baseConfig.theme"
                                           placeholder="请选择" @change="genChart"
                                           clearable
                                           style="width: 186px;">
                                    <el-option v-for="item in themeOptions" :key="item.value" :value="item.value"
                                               :label="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane id="flt" label="数据筛选" name="second"
                                 :disabled="formOptions.chartType==='diy'"
                                 style="height: 70px; overflow: auto;">
                        <el-button class="add-filter" type="primary" icon="el-icon-plus" plain size="mini"
                                   @click="addFilter"></el-button>
                        <el-form v-for="(item,idx) in formOptions.filter" :inline="true" :model="item" size="mini"
                                 label-width="60px">
                            <el-form-item label="数据项">
                                <el-select class="data-filter" :loading="colOptions.length == 0" v-model="item.col"
                                           placeholder="请选择" @change="filterColChange(item.col, idx)">
                                    <el-option v-for="col in colOptions" :value="col.colname" :key="col.colname"
                                               :label="col.coldesc">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <template v-if="item.filterType == 'val'">
                                <el-form-item label="条件">
                                    <el-select class="data-filter" v-model="item.opt" placeholder="请选择">
                                        <el-option v-for="opt in filterOptions" :key="opt.value" :value="opt.value"
                                                   :label="opt.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="条件值">
                                    <el-input class="data-filter" v-model="item.val"
                                              @blur="genChart"></el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-form-item label="开始">
                                    <el-date-picker v-model="item.bgndate" type="datetime" value-format="yyyyMMddHHmmss"
                                                    @change="genChart" placeholder="选择日期时间" style="width: 150px;">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="结束">
                                    <el-date-picker v-model="item.enddate" type="datetime" value-format="yyyyMMddHHmmss"
                                                    @change="genChart" placeholder="选择日期时间" style="width: 150px;">
                                    </el-date-picker>
                                </el-form-item>
                            </template>
                            <i class="el-icon-circle-close del-btn"
                               @click="delFilter(idx)"></i>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="高级设置" name="third">
                        <el-form ref="form" :inline="true" :model="formOptions.moreConfig" size="mini"
                                 label-width="80px">
                            <el-form-item label="排序">
                                <el-select v-model="formOptions.moreConfig.sort" placeholder="请选择"
                                           @change="genChart">
                                    <el-option v-for="item in orderOptions" :key="item.value" :value="item.value"
                                               :label="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据更新">
                                <el-select v-model="formOptions.moreConfig.static"
                                           placeholder="请选择">
                                    <el-option v-for="item in updateOptions" :key="item.value" :value="item.value"
                                               :label="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="自定义开发" name="fourth">
                        <el-form ref="form" :inline="true" :model="formOptions.diy" size="mini" label-width="80px">
                            <el-form-item style="margin-left: 30px;">
                                <el-button type="info" plain @click="showDemoCode = true">查看代码</el-button>
                            </el-form-item>
                            <el-form-item style="margin-left: 10px;">
                                <el-button type="primary" plain @click="showEditCode = true">编辑代码</el-button>
                            </el-form-item>
                        </el-form>
                        <el-dialog title="代码示例" :visible.sync="showDemoCode" width="800px" top="50px"
                                   :modal="false">
                            <div style="max-height: 60vh; overflow: auto;background-color: #FFFAFA;min-height: 300px;">
                                <pre><code class="javascript" id="demo">{{formOptions.diy.example}}</code></pre>
                            </div>
                            <span slot="footer">
                                <el-button data-clipboard-target="#demo" size="mini">复 制</el-button>
                            </span>
                        </el-dialog>
                        <el-dialog title="编辑代码" :visible.sync="showEditCode" width="800px" top="50px" :modal="false">
                            <div class="edit-code">
                                <el-input type="textarea" v-model="formOptions.diy.code"></el-input>
                            </div>
                            <span slot="footer">
                                <el-button @click="showEditCode = false" size="mini">取 消</el-button>
                                <el-button type="primary" @click="genChart" size="mini">运 行</el-button>
                            </span>
                        </el-dialog>
                    </el-tab-pane>
                </el-tabs>
                <div class="board" id="chart">
                </div>
                <div style="text-align: center;margin-top: 20px;">
                    <span>
                    <el-button type="primary" :disabled="false" @click="saveChart"
                               :loading="loading"
                               style="width: 200px;">生成图表</el-button>
                    <el-button type="info" plain @click="showSourceList = true"
                               style="width: 200px;margin-left: 80px;">切换数据源</el-button>
                    </span>
                    <el-dialog title="选择您的数据源" :visible.sync="showSourceList"
                               :close-on-click-modal="formOptions.srcid != ''"
                               style="min-width: 600px;"
                               :show-close="formOptions.srcid != ''" :close-on-press-escape="false">
                        <el-table :data="sourceList" :highlight-current-row="true" @current-change="changeSource"
                                  max-height="500" :row-style="{cursor: 'pointer'}" stripe>
                            <el-table-column type="index"></el-table-column>
                            <el-table-column property="data_name" label="数据源" align="center"
                                             :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="data_type" label="类型" align="center"></el-table-column>
                            <el-table-column property="db_name" label="库名" align="center"
                                             :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="table_name" label="表名" align="center"
                                             :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="db_host" align="center" label="IP/HOST"></el-table-column>
                            <el-table-column property="create_date" align="center" label="创建日期"></el-table-column>
                            <el-button slot="empty" size="mini" type="primary" plain
                                       @click="$router.replace({name: 'source'})">还没数据? 去添加
                            </el-button>
                        </el-table>
                    </el-dialog>
                </div>
            </div>
            <div class="right-side">
                <h2 class="h2-title">度量与维度</h2>
                <div class="dim" v-show="showX">
                    <el-form :model="formOptions.chartConfig.x" size="mini" label-width="60px"
                             style="padding: 10px 10px 0px 10px;">
                        <el-form-item label="X轴">
                            <el-select :loading="colOptions.length == 0" v-model="formOptions.chartConfig.x.xAxis"
                                       placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="col in colOptions" :value="col.colname"
                                           :key="col.colname" :label="col.coldesc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dim" v-show="showLegend">
                    <el-form :model="formOptions.chartConfig.x" size="mini" label-width="60px"
                             style="padding: 10px 10px 0px 10px;">
                        <el-form-item label="多例" style="text-align: left;">
                            <el-switch v-model="formOptions.chartConfig.legend.isLegend" @change="switchLegend">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="分类轴">
                            <el-select :loading="colOptions.length == 0"
                                       :disabled="!formOptions.chartConfig.legend.isLegend"
                                       v-model="formOptions.chartConfig.legend.legendAxis"
                                       @change="genChart"
                                       placeholder="请选择">
                                <el-option v-for="col in colOptions" :value="col.colname"
                                           :key="col.colname" :label="col.coldesc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dim" v-show="showY">
                    <el-form v-for="(item, idx) in formOptions.chartConfig.y" :model="item" size="mini"
                             label-width="60px"
                             style="padding: 10px 10px 5px 10px;position: relative;">
                        <el-form-item label="Y轴">
                            <el-select :loading="colOptions.length == 0" v-model="item.yAxis" placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="col in colOptions" :value="col.colname"
                                           :key="col.colname" :label="col.coldesc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="算法">
                            <el-select v-model="item.sum" placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="sm in sumOptions" :value="sm.value"
                                           :key="sm.value" :label="sm.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <i :id="'del-y-btn-'+idx" class="el-icon-circle-close del-y"
                           @click="delY(idx)"></i>
                    </el-form>
                    <el-button type="primary" plain icon="el-icon-plus" size="mini"
                               @click="addY" :disabled="formOptions.chartConfig.legend.isLegend"
                               style="margin-bottom: 10px;"></el-button>
                </div>
                <div class="dim" v-show="showDatas">
                    <el-form v-for="(item, idx) in formOptions.chartConfig.datas" :model="item" size="mini"
                             label-width="60px"
                             style="padding: 10px 10px 5px 10px;position: relative;">
                        <el-form-item label="数据项">
                            <el-select :loading="colOptions.length == 0" v-model="item.data" placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="col in colOptions" :value="col.colname"
                                           :key="col.colname" :label="col.coldesc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="算法">
                            <el-select v-model="item.sum" placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="sm in sumOptions" :value="sm.value"
                                           :key="sm.value" :label="sm.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <i :id="'del-y-btn-'+idx" class="el-icon-circle-close del-y"
                           @click="delData(idx)"></i>
                    </el-form>
                    <el-button type="primary" plain icon="el-icon-plus" size="mini"
                               @click="addData" :disabled="formOptions.chartConfig.legend.isLegend"
                               style="margin-bottom: 10px;"></el-button>
                </div>
                <div class="dim" v-show="showLatLng">
                    <el-form :model="formOptions.chartConfig" size="mini" label-width="60px"
                             style="padding: 10px 10px 0px 10px;">
                        <el-form-item label="经度">
                            <el-select :loading="colOptions.length == 0" v-model="formOptions.chartConfig.lat"
                                       placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="col in colOptions" :value="col.colname"
                                           :key="col.colname" :label="col.coldesc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="纬度">
                            <el-select :loading="colOptions.length == 0" v-model="formOptions.chartConfig.lng"
                                       placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="col in colOptions" :value="col.colname"
                                           :key="col.colname" :label="col.coldesc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dim" v-show="showLatLng2">
                    <el-form :model="formOptions.chartConfig" size="mini" label-width="60px"
                             style="padding: 10px 10px 0px 10px;">
                        <p style="margin: 0; color: #909399;font-size: 12px;text-align: right;margin-bottom: 5px;">目标</p>
                        <el-form-item label="经度">
                            <el-select :loading="colOptions.length == 0" v-model="formOptions.chartConfig.lat2"
                                       placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="col in colOptions" :value="col.colname"
                                           :key="col.colname" :label="col.coldesc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="纬度">
                            <el-select :loading="colOptions.length == 0" v-model="formOptions.chartConfig.lng2"
                                       placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="col in colOptions" :value="col.colname"
                                           :key="col.colname" :label="col.coldesc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dim" v-show="showData">
                    <el-form :model="formOptions.chartConfig" size="mini" label-width="60px"
                             style="padding: 10px 10px 0px 10px;">
                        <el-form-item label="数据">
                            <el-select :loading="colOptions.length == 0" v-model="formOptions.chartConfig.data"
                                       placeholder="请选择"
                                       @change="genChart">
                                <el-option v-for="col in colOptions" :value="col.colname"
                                           :key="col.colname" :label="col.coldesc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dim" v-show="showminMax">
                    <el-form :model="formOptions.chartConfig" size="mini" label-width="60px"
                             style="padding: 10px 10px 0px 10px;">
                        <el-form-item label="name">
                            <el-input @blur="genChart" v-model="formOptions.chartConfig.name" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="min">
                            <el-input @change="genChart" type="number" v-model="formOptions.chartConfig.min" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="max">
                            <el-input @change="genChart" type="number" v-model="formOptions.chartConfig.max" placeholder=""></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommonNav from "../common/nav";
    import options from "../../config/options"
    import echarts from "echarts"
    import 'echarts/map/js/china'
    import 'echarts/map/js/world'
    import 'echarts-gl';
    import 'echarts/extension/bmap/bmap'
    import lodash from 'lodash';
    import ResizeObserver from 'resize-observer-polyfill';

    export default {
        name: "chartEdit",
        components: {CommonNav},
        data() {
            return {
                defTab: 'first',
                chart: null,
                sourceList: [],
                cates: options.CHART_CATES,
                types: options.CHART_TYPES,
                showDemoCode: false,
                showEditCode: false,
                showSourceList: true,
                loading: false,
                themeOptions: options.THEME,
                filterOptions: options.FILTER,
                orderOptions: options.ORDER,
                demoOptions: options.DEMO,
                updateOptions: options.UPDATE,
                sumOptions: options.SUM_TYPE,
                colOptions: [], //{colname, coldesc, coltype}
                formOptions: {
                    baseConfig: {title: '', subTitle: '', cate: '', theme: '', icon: ''},
                    chartConfig: {
                        x: {xAxis: '',},
                        y: [
                            {yAxis: '', sum: 'sum'},
                        ],
                        z: [
                            {zAxis: '', sum: 'sum'},
                        ],
                        datas: [{data: '', sum: 'sum'}],
                        legend: {
                            isLegend: false,
                            legendAxis: ''
                        },
                        lat: '',
                        lng: '',
                        lat2: '',
                        lng2: '',
                        data: '',
                        name: '',
                        min: 0,
                        max: 100,
                    },
                    moreConfig: {static: '0', sort: 'asc'},
                    filter: [{col: '', opt: '', val: '', bgndate: '', enddate: '', filterType: 'val'}],
                    diy: {code: '', example: '', diyType: ''},
                    id: '',
                    srcid: '',
                    userid: 'yujiahao',
                    chartCate: 'line',
                    chartType: 'lineBasic',
                    isSave: false,
                }
            }
        },
        created() {
            if(this.$route.query.id) {
                this.showSourceList = false;
                this.$axios.post(this.$api.getChart, {id: this.$route.query.id}).then((res) => {
                    if (res.data.code === '00') {
                        let opt = res.data.data.formOptions;
                        opt.isSave = false;
                        this.formOptions = opt;
                        this.getCols();
                        echarts.dispose(document.getElementById('chart'));
                        let myChart = echarts.init(document.getElementById('chart'), this.formOptions.baseConfig.theme);
                        myChart.setOption(res.data.data.chartOptions);
                        myChart.resize();
                        this.chart = myChart;
                    }
                }).catch((err) => {

                })
            }

            for (let theme of options.THEME) {
                require('../../assets/themes/' + theme.value);
            }
        },
        mounted() {
            const observer = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    if (this.chart) {
                        this.chart.resize();
                    }
                })
            });
            observer.observe(document.getElementById('chart'));;
            this.getSource()
        },
        methods: {
            getSource() {
                this.$axios.post(this.$api.sourceList, {userid: 'yujiahao'}).then((res) => {
                    if (res.data.code === '00') {
                        this.sourceList = [];;
                        this.sourceList = res.data.data
                    }
                }).catch((err) => {

                })
            },
            getCols() {
                this.$axios.post(this.$api.sourceDetail, {id: this.formOptions.srcid}).then((res) => {
                    if (res.data.code === '00') {
                        this.colOptions = res.data.data
                    }
                }).catch((err) => {

                })
            },
            addFilter() {
                this.formOptions.filter.push(
                    {col: '', opt: '', val: '', bgndate: '', enddate: '', filterType: 'val'}
                )
            },
            delFilter(idx) {
                this.formOptions.filter.splice(idx, 1);
                if (this.formOptions.filter.length === 0) {
                    this.addFilter()
                }
            },
            filterColChange(v, idx) {
                for (let i = 0; i < this.colOptions.length; i++) {
                    if (this.colOptions[i].colname == v && this.colOptions[i].coltype.search("date") != -1) {
                        this.formOptions.filter[idx].filterType = 'date';;
                        return
                    } else {
                        this.formOptions.filter[idx].filterType = 'val'
                    }
                }
            },
            switchChart(type) {
                this.formOptions.chartType = type.value;
                echarts.dispose(document.getElementById('chart'));
                if (type.value === 'diy') {
                    this.formOptions.diy.diyType = type.type
                    this.$axios.get(type.json).then((res) => {
                        this.formOptions.diy.example = JSON.stringify(res.data);
                        this.formOptions.diy.code = JSON.stringify(res.data);
                        this.genChart()
                    })
                } else{
                    this.formOptions.diy.diyType = ''
                    this.genChart()
                }
            },
            addY() {
                this.formOptions.chartConfig.y.push({yAxis: '', sum: 'sum'})
            },
            addData() {
                this.formOptions.chartConfig.datas.push({data: '', sum: 'sum'})
            },
            delY(idx) {
                this.formOptions.chartConfig.y.splice(idx, 1);
                if (this.formOptions.chartConfig.y.length === 0) {
                    this.addY()
                }
                this.genChart()
            },
            delData(idx) {
                this.formOptions.chartConfig.datas.splice(idx, 1);
                if (this.formOptions.chartConfig.datas.length === 0) {
                    this.addData()
                }
                this.genChart()
            },
            switchLegend(v) {
                if (v) {
                    this.formOptions.chartConfig.y.splice(1, 999);
                    this.formOptions.chartConfig.datas.splice(1, 999);
                }
                this.genChart();
            },
            changeSource(newrow, oldrow) {
                this.formOptions.srcid = newrow.id;
                this.showSourceList = false;
                this.getCols()
            },
            genChart() {
                this.showEditCode = false;
                this.loading = true;
                let data = lodash.cloneDeep(this.formOptions);
                try {
                    data.diy.code = JSON.parse(data.diy.code);
                } catch (e) {

                }

                this.$axios.post(this.$api.genChart, data).then((res) => {
                    if (res.data.code === '00') {
                        if(this.formOptions.isSave) {
                            this.$router.push({name: 'Chart'})
                        }
                        echarts.dispose(document.getElementById('chart'));
                        let myChart = echarts.init(document.getElementById('chart'), this.formOptions.baseConfig.theme);
                        myChart.setOption(res.data.data);
                        myChart.resize();
                        this.chart = myChart;
                    }
                    this.loading = false;
                }).catch((e) => {
                    console.log(e)
                    this.loading = false;
                })
            },
            saveChart() {
                this.formOptions.isSave = true;
                this.formOptions.baseConfig.icon = this.chart.getDataURL();;
                this.genChart()
            }
        },
        computed: {
            showX() {
                return ['lineBasic','barBasic','areaBasic','columnBasic','scatterBasic'].indexOf(this.formOptions.chartType) !== -1
            },
            showLegend() {
                return ['lineBasic','barBasic','areaBasic','columnBasic','pieBasic','scatterBasic','radarBasic'].indexOf(this.formOptions.chartType) !== -1
            },
            showY() {
                return ['lineBasic','barBasic','areaBasic','columnBasic','scatterBasic'].indexOf(this.formOptions.chartType) !== -1
            },
            showLatLng() {
                return ['heatMap', 'mapLine'].indexOf(this.formOptions.diy.diyType) !== -1
            },
            showLatLng2() {
                return ['mapLine'].indexOf(this.formOptions.diy.diyType) !== -1
            },
            showData() {
                return ['heatMap'].indexOf(this.formOptions.diy.diyType) !== -1
                || ['gaugeBasic'].indexOf(this.formOptions.chartType) !== -1
            },
            showDatas() {
                return ['pieBasic','radarBasic'].indexOf(this.formOptions.chartType) !== -1
            },
            showminMax() {
                return ['gaugeBasic'].indexOf(this.formOptions.chartType) !== -1
            },
        }
    }
</script>

<style scoped>

    .container {
        width: 90%;
        min-width: 1200px;
        margin: 20px auto 0 auto;
        height: calc(100vh - 77px);
        display: flex;
        justify-content: space-between;
    }

    .left-side {
        width: 220px;
        height: 100%;
    }

    .right-side {
        height: 100%;
        width: 250px;
        overflow: auto;
    }

    .main {
        height: 100%;
        width: calc(100% - 500px);
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

    .chart-config {
        width: 90%;
        height: 125px;
        margin: 10px auto auto;
        padding: 0 10px 10px 10px;
        border: 1px solid #79aec8;
        border-radius: 2px;
    }

    .data-filter {
        width: 150px;
    }

    .board {
        height: calc(100% - 300px);
        width: calc(90% + 20px);
        margin: 10px auto;
        border: 1px solid #79aec8;
    }

    .add-filter {
        position: absolute;
        right: 5px;
    }

    .del-btn {
        height: 5px;
        width: 5px;
        display: inline-block;
        top: 5px;
        cursor: pointer;
        color: red;
        position: relative;
        left: -5px;
    }

    .del-y {
        height: 5px;
        width: 5px;
        display: inline-block;
        cursor: pointer;
        color: red;
        position: absolute;
        top: 0px;
        right: 11px;
    }

    .dim {
        width: 200px;
        margin: 10px auto 0px auto;
        max-height: 455px;
        border-top: 2px solid #79aec8;
        border-bottom: 1px solid #79aec8;
        border-right: 1px solid #79aec8;
        border-left: 1px solid #79aec8;
        border-radius: 2px;
        overflow: auto;
        text-align: center;
    }
</style>

<style>
    .el-tabs__item {
        font-size: 12px !important;
    }

    .el-textarea__inner {
        min-height: 300px !important;
    }
</style>