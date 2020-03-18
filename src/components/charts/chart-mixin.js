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
            tabelDown: "", //下钻字段
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
    data(){
        return{
            isSave:false,
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
        genVision(){
            if(this.chartCate == 'html'){
                this.genHtml();
            }else{
                this.genChart();
            }
        },
        genHtml(index = 0){//请求html数据,刷新视图
            this.$axios
                .post(this.$api.mysqlPreview, {
                    id: this.srcid,
                    sql: this.tableConfig[index].sql
                })
                .then(res => {
                    // this.rows = [];
                    if (res.data.code === "00") {
                        const resData = res.data.data;
                        let columns = resData.columns;
                        let rows = resData.rows;
                        this.colnames = columns;
                        this.tableConfig[index].colOptions = resData.col_option;
                        this.tableConfig[index].tableHeader = resData.columns;
                        if(index == 0){
                            this.$root.$emit('changeTableData',rows);
                        }
                        
                        // for (let row of rows) {
                        //     let tmp = {};
                        //     for (let i = 0; i < row.length; i++) {
                        //         tmp[columns[i]] = row[i];
                        //     }
                        //     this.rows.push(tmp);
                        // }
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
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
                            this.$router.push({ name: "ChartList" });
                            return;
                        }
                        this.initMap().then(() => {
                            let theme = this.baseConfig.theme;
                            if (this.chartType === "diy") {
                                let jsCode = `${res.data.data};
                                            var diyChart = echarts.init(document.getElementById('chart'), '${theme}');
                                            diyChart.setOption(option)
                                            return diyChart`;
                                let jsFun = new Function(jsCode);
                                let chart = jsFun();
                                chartObj = chart;
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