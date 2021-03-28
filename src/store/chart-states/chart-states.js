export default {
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
            tableDownIndex:0,//下钻下标
            sql: "",
            colOptions:[],
            cellStyle: {},
            headerStyle: {},
            isDrillDown: true,
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
        sql:"",
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
    diy: { code: "", diyType: ""},
    id: "",
    srcid: "",
    userid: "yujiahao",
    chartCate: "line",
    chartType: "lineBasic",
    // isSave: false
}