export default {
    CHART_CATES: [
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
        {
            name: '自定义', value: 'diy', icon: '/img/diy-chart.png'
        },
    ],
    CHART_TYPES: {
        line: [
            {name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'},
            {name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'},
            {name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'},
            {name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'},
            {name: '基础折线图', value: 'line', icon: '/img/line-basic-default.png'}
            ],
        diy: [
            {name: '单轴散点图', value: 'diy', icon: '/img/scatter-single-axis.jpg'},
        ],
    },
    THEME: [{label: '', value: ''},],
    FILTER: [
        {label: '=', value: 'eq'},
        {label: '!=', value: 'ne'},
        {label: '>', value: 'gt'},
        {label: '>=', value: 'gte'},
        {label: '<', value: 'lt'},
        {label: '<=', value: 'lte'},
        {label: 'like', value: 'like'},
        {label: 'not like', value: 'notlike'},
        {label: 'is null', value: 'null'},
        {label: 'is not null', value: 'notnull'},
    ],
    ORDER: [{label: '升序', value: 'asc'}, {label: '降序', value: 'desc'},],
    DEMO: [{label: '升序', value: 'asc'}, {label: '降序', value: 'desc'},],
    UPDATE: [
        {label: '实时', value: '0'},
        {label: '5min', value: '5'},
        {label: '30min', value: '30'},
        {label: '1day', value: '3600'},],
};