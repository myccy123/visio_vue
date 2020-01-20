let pre_dir = '/static/vue_vision';
if (process.env.NODE_ENV === "development") {
    pre_dir = '';
}

export default {
    CHART_CATES: [
        {
            name: '折线图', value: 'line', icon: pre_dir + '/img/line.png'
        },
        {
            name: '面积图', value: 'area', icon: pre_dir + '/img/area.png'
        },
        {
            name: '垂直柱图', value: 'column', icon: pre_dir + '/img/bar-v.png'
        },
        {
            name: '水平柱图', value: 'bar', icon: pre_dir + '/img/bar-h.png'
        },
        {
            name: '散点图', value: 'scatter', icon: pre_dir + '/img/scatter.png'
        },
        {
            name: '饼图', value: 'pie', icon: pre_dir + '/img/pie.png'
        },
        {
            name: '雷达图', value: 'radar', icon: pre_dir + '/img/radar2.png'
        },
        {
            name: '仪表盘', value: 'gauge', icon: pre_dir + '/img/gauge.png'
        },
        {
            name: '表格', value: 'table', icon: pre_dir + '/img/data-table.png'
        },
        {
            name: '自定义图', value: 'diy', icon: pre_dir + '/img/diy-chart.png'
        },
    ],
    CHART_TYPES: {
        line: [
            {name: '基础折线图', value: 'lineBasic', icon: pre_dir + '/img/line-basic-default.png'},
        ],
        area: [
            {name: '基础面积图', value: 'areaBasic', icon: pre_dir + '/img/area-basic.jpg'},
        ],
        bar: [
            {name: '水平柱图', value: 'barBasic', icon: pre_dir + '/img/bar-y-category.jpg'},
        ],
        column: [
            {name: '垂直柱图', value: 'columnBasic', icon: pre_dir + '/img/dataset-simple0.jpg'},
        ],
        pie: [
            {name: '基础饼图', value: 'pieBasic', icon: pre_dir + '/img/pie-legend.jpg'},
        ],
        scatter: [
            {name: '基础散点图', value: 'scatterBasic', icon: pre_dir + '/img/scatter-simple.jpg'},
        ],
        radar: [
            {name: '基础雷达图', value: 'radarBasic', icon: pre_dir + '/img/radar.jpg'},
        ],
        gauge: [
            {name: '基础仪表盘', value: 'gaugeBasic', icon: pre_dir + '/img/base-gauge.png'},
        ],
        diy: [
            {
                name: '3D柱图',
                value: 'diy',
                icon: pre_dir + '/img/transparent-bar3d.jpg',
                type: 'bar3d',
                js: pre_dir + '/diyjs/1.1.js',
            },
            {
                name: '百度地图',
                value: 'diy',
                icon: pre_dir + '/img/effectScatter-bmap.jpg',
                type: 'mapPot',
                js: pre_dir + '/diyjs/example_bmap.js'
            },
            {
                name: '百度地图',
                value: 'diy',
                icon: pre_dir + '/img/map-polygon.jpg',
                type: 'mapPot',
                js: pre_dir + '/diyjs/example_bmap2.js'
            },
            {
                name: '路线图',
                value: 'diy',
                icon: pre_dir + '/img/mapline.png',
                type: 'mapPot',
                js: pre_dir + '/diyjs/example_mapline.js'
            },
            {
                name: '热力图(GEO)',
                value: 'diy',
                icon: pre_dir + '/img/heatmap-bmap.jpg',
                type: 'heatMap',
                js: pre_dir + '/diyjs/example_heatmap.js'
            },
            {
                name: '关系图',
                value: 'diy',
                icon: pre_dir + '/img/graph-circular-layout.jpg',
                type: 'rel',
                js: pre_dir + '/diyjs/example_relpie.js'
            },
            {
                name: '气泡图',
                value: 'diy',
                icon: pre_dir + '/img/bubble-gradient.jpg',
                type: 'bubble',
                js: pre_dir + '/diyjs/example_bubble.js'
            },
        ],
    },
    CATE_OPTIONS: [
        {
            label: '全部', value: 'all'
        },
        {
            label: '折线图', value: 'line'
        },
        {
            label: '面积图', value: 'area'
        },
        {
            label: '柱图', value: 'bar'
        },
        {
            label: '散点图', value: 'scatter'
        },
        {
            label: '饼图', value: 'pie'
        },
        {
            label: '雷达图', value: 'radar'
        },
        {
            label: '仪表盘', value: 'gauge'
        },
        {
            label: '表格', value: 'table'
        },
        {
            label: '自定义图', value: 'diy'
        },
    ],
    THEME: [
        {label: 'chalk', value: 'chalk', backgroundColor: '#293441'},
        {label: 'dark', value: 'dark', backgroundColor: '#333333'},
        {label: 'essos', value: 'essos', backgroundColor: '#FDFCF5'},
        {label: 'halloween', value: 'halloween', backgroundColor: '#323232'},
        {label: 'infographic', value: 'infographic', backgroundColor: ''},
        {label: 'purple-passion', value: 'purple-passion', backgroundColor: '#5B5C6E'},
        {label: 'vintage', value: 'vintage', backgroundColor: '#FEF8EF'},
        {label: 'walden', value: 'walden', backgroundColor: ''},
        {label: 'macarons', value: 'macarons', backgroundColor: ''},
        {label: 'westeros', value: 'westeros', backgroundColor: ''},
        {label: 'wonderland', value: 'wonderland', backgroundColor: ''},
        {label: 'roma', value: 'roma', backgroundColor: ''},
        {label: 'shine', value: 'shine', backgroundColor: ''},
    ],
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
    ORDER: [{label: '升序', value: 'asc'}, {label: '降序', value: 'desc'}],
    UPDATE: [
        {label: '实时', value: '0'},
        {label: '5 min', value: '5'},
        {label: '30 min', value: '30'},
        {label: '1 day', value: '1440'},
    ],
    SUM_TYPE: [
        {label: 'SUM', value: 'sum'},
        {label: 'COUNT', value: 'count'},
        {label: 'AVG', value: 'avg'},
        {label: 'MAX', value: 'max'},
        {label: 'MIN', value: 'min'},
    ],
    SVG_BORDERS: [
        {label: '无边框', value: 'border0', icon: pre_dir + '/img/border0.png'},
        {label: '酷炫边框', value: 'border1', icon: pre_dir + '/img/border1.png'},
        {label: '酷炫边框', value: 'border2', icon: pre_dir + '/img/border1.png'},
    ],
    ASSETS: {
        logo: pre_dir + '/img/logo2-nav.png',
        bgImg: pre_dir + '/img/bg.png',
        sourceIcon: {
            mysql: pre_dir + '/img/MySQL.png',
            excel: pre_dir + '/img/excel.png',
        }
    }
};