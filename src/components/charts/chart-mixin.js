import { mapState, mapMutations } from 'vuex';
const defaultState = {
    baseConfig: {
        title: "",
        subTitle: "",
        cate: "",
        theme: "",
        icon: ""
    },
    tableConfig: [
        {
            tableHeader: [],
            tableDown: "", //下钻字段
            tableDownIndex: 0,
            sql: "",
            colOptions: [],
        }
    ],
    chartConfig: {
        x: { xAxis: "" },
        y: [{ yAxis: "", sum: "sum" }],
        z: [{ zAxis: "", sum: "sum" }],
        datas: [{ data: "", sum: "sum" }],
        legend: {
            isLegend: false,
            legendAxis: ""
        },
        lat: "",
        lng: "",
        lat2: "",
        lng2: "",
        data: "",
        name: "",
        min: 0,
        max: 100,
        unit: ""
    },
    moreConfig: {
        static: "0",
        orderBy: "col",
        sort: "asc",
        map: "",
        limit: 0,
        sql: "",
    },
    filter: [
        {
            col: "",
            opt: "",
            val: "",
            bgndate: "",
            enddate: "",
            filterType: "val"
        }
    ],
    diy: { code: "", diyType: "" },
    id: "",
    srcid: "",
    userid: "yujiahao",
    chartCate: "line",
    chartType: "lineBasic",
    // isSave: false
};
export default {
    data() {
        return {
            isSave: false,
        }
    },
    computed: {
        ...mapState({
            baseConfig: 'baseConfig',
            tableConfig: 'tableConfig',
            chartConfig: 'chartConfig',
            moreConfig: 'moreConfig',
            filter: 'filter',
            diy: 'diy',
            id: "id",
            srcid: "srcid",
            userid: "userid",
            chartCate: "chartCate",
            chartType: "chartType",
            // isSave: 'isSave'
        })
    },
    methods: {
        ...mapMutations({
            setBaseConfig: 'setBaseConfig',
            setTableConfig: 'setTableConfig',
            setChartConfig: 'setChartConfig',
            setMoreConfig: 'setMoreConfig',
            setFilter: 'setFilter',
            setDiy: 'setDiy',
            setId: "setId",
            setSrcid: "setSrcid",
            setUserid: "setUserid",
            setChartCate: "setChartCate",
            setChartType: "setChartType",
            // setIsSave: 'setIsSave'
        }),
        genVision() {
            if (this.chartCate === 'html') {
                if (this.isSave) {
                    if (this.chartType === 'tableBasic') {
                        this.saveTable();
                    } else {
                        this.genHtml();
                    }
                } else {
                    if (this.chartType === 'tableBasic') {
                        this.genTable();
                    } else {
                        this.genHtml();
                    }

                }

            } else {
                this.genChart();
            }
        },
        genHtml() {
            this.showEditCode = false;
            this.$store.commit('setLoading', true);
            let data = {};
            let formOptionsKeys = ['baseConfig', 'tableConfig', 'chartConfig',
                'moreConfig', 'filter', 'diy', 'id', 'srcid', 'userid', 'chartCate', 'chartType'];
            for (let key of formOptionsKeys) {
                data[key] = this.$store.state[key];
            }
            data.isSave = this.isSave;
            this.$axios
                .post(this.$api.genChart, data)
                .then(res => {
                    if (res.data.code === "00") { 
                        if (this.isSave) {
                            this.$router.push({ name: "ChartList" });
                            return;
                        }
                        this.$root.$emit('htmlCustom',res.data.data);
                    }
                    this.$store.commit('setLoading', false);
                })
                .catch(e => {
                    console.log(e);
                    this.$store.commit('setLoading', false);
                });
        },
        genTable(index = 0) {//请求表格数据,刷新视图
            this.$axios
                .post(this.$api.mysqlPreview, {
                    id: this.srcid,
                    sql: this.tableConfig[index].sql
                })
                .then(res => {
                    if (res.data.code === "00") {
                        const resData = res.data.data;
                        let columns = resData.columns;
                        let rows = resData.rows;
                        this.colnames = columns;
                        this.tableConfig[index].colOptions = resData.col_option;
                        if(this.tableConfig[index].tableHeader.length === 0) {
                            this.tableConfig[index].tableHeader = resData.columns;
                        }
                        if (index === 0) {
                            this.$root.$emit('changeTableData', rows);
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        saveTable() {//保存表格配置参数
            this.showEditCode = false;
            this.$store.commit('setLoading', true);
            let data = {};
            let formOptionsKeys = ['baseConfig', 'tableConfig', 'chartConfig',
                'moreConfig', 'filter', 'diy', 'id', 'srcid', 'userid', 'chartCate', 'chartType'];
            for (let key of formOptionsKeys) {
                data[key] = this.$store.state[key];
            }
            data.isSave = this.isSave;
            this.$axios
                .post(this.$api.genChart, data)
                .then(res => {
                    if (document.getElementById("chart"))
                        echarts.dispose(document.getElementById("chart"));
                    if (res.data.code === "00") {
                        this.$router.push({ name: "ChartList" });
                    }
                    this.$store.commit('setLoading', false);
                })
                .catch(e => {
                    console.log(e);
                    this.$store.commit('setLoading', false);
                });
        },
        genChart() {//请求echart数据,刷新echart
            this.showEditCode = false;
            this.$store.commit('setLoading', true);
            let data = {};
            let formOptionsKeys = ['baseConfig', 'tableConfig', 'chartConfig',
                'moreConfig', 'filter', 'diy', 'id', 'srcid', 'userid', 'chartCate', 'chartType'];
            for (let key of formOptionsKeys) {
                data[key] = this.$store.state[key];
            }
            data.isSave = this.isSave;
            this.$axios
                .post(this.$api.genChart, data)
                .then(res => {
                    echarts.dispose(document.getElementById("chart"));
                    if (res.data.code === "00") {
                        if (this.isSave) {
                            this.$store.commit('setLoading', false);
                            this.$router.push({ name: "ChartList" });
                            return;
                        }
                        this.initMap().then(() => {
                            let theme = this.baseConfig.theme;
                            if (this.chartType === "diy") {
                                let jsCode = `
                                            chartObj = echarts.init(document.getElementById('chart'), '${theme}');
                                            ${res.data.data};
                                            chartObj.setOption(option)
                                            return chartObj`;
                                let jsFun = new Function(jsCode);
                                chartObj = jsFun();
                                chartObj.on('click', (params)=>{
                                    console.log(params)
                                })
                            } else {
                                let myChart = echarts.init(
                                    document.getElementById("chart"),
                                    theme
                                );
                                myChart.setOption(res.data.data);
                                myChart.resize();
                                chartObj = myChart;
                            }
                        });
                    }
                    this.$store.commit('setLoading', false);
                })
                .catch(e => {
                    console.log(e);
                    this.$store.commit('setLoading', false);
                });
        },
        initMap() {
            let map = this.moreConfig.map;
            return new Promise((resolve, reject) => {
                if (!map) {
                    resolve();
                } else {
                    this.$axios
                        .get(this.$api.mapDir, { params: { mapfile: map } })
                        .then(res => {
                            echarts.registerMap(map, res.data);
                            this.$message({
                                message: `地图（${map}）初始化成功！`,
                                type: "success"
                            });
                            resolve();
                        })
                        .catch(err => {
                            console.log(err);
                            resolve();
                        });
                }
            });
        },
        initState() {
            let opt = JSON.parse(JSON.stringify(defaultState))
            for (let key in opt) {
                let upKey =
                    key.substr(0, 1).toUpperCase() +
                    key.substr(1, key.length - 1);
                if (this[`set${upKey}`])
                    this[`set${upKey}`](opt[key]);
            }
        }
    }
}