import {randomInt} from '../utils/useful'

let pre_dir = getPublicPath();
if (process.env.NODE_ENV === "development") {
    pre_dir = '';
}

export default {
    PUBLIC_PATH: pre_dir,
    CHART_CATES: [
        {
            name: '折线图', value: 'line', icon: 'cate-line'
        },
        {
            name: '面积图', value: 'area', icon: 'cate-area'
        },
        {
            name: '垂直柱图', value: 'column', icon: 'cate-column'
        },
        {
            name: '水平柱图', value: 'bar', icon: 'cate-bar'
        },
        {
            name: '散点图', value: 'scatter', icon: 'cate-scatter'
        },
        {
            name: '饼图', value: 'pie', icon: 'cate-pie'
        },
        {
            name: '雷达图', value: 'radar', icon: 'cate-radar'
        },
        {
            name: '仪表盘', value: 'gauge', icon: 'cate-gauge'
        },
        {
            name: 'HTML', value: 'html', icon: 'cate-html'
        },
        {
            name: '自定义图', value: 'diy', icon: 'cate-diy'
        },
    ],
    CHART_DIM:{
        lineBasic:{component: 'LineBasic'},
        areaBasic:{component: 'AreaBasic'},
        barBasic:{component: 'BarBasic'},
        columnBasic:{component: 'ColumnBasic'},
        pieBasic:{component: 'PieBasic'},
        scatterBasic:{component: 'ScatterBasic'},
        radarBasic:{component: 'RadarBasic'},
        gaugeBasic:{component: 'GaugeBasic'},
        tableBasic:{component: 'TableBasic'},
    },
    CHART_TYPES: {
        line: [
            {name: '基础折线图', value: 'lineBasic', icon: pre_dir + '/img/type-line-basic.jpg',},
        ],
        area: [
            {name: '基础面积图', value: 'areaBasic', icon: pre_dir + '/img/type-area-basic.jpg',},
        ],
        bar: [
            {name: '水平柱图', value: 'barBasic', icon: pre_dir + '/img/type-barh-basic.jpg',},
        ],
        column: [
            {name: '垂直柱图', value: 'columnBasic', icon: pre_dir + '/img/type-barv-basic.jpg',},
        ],
        pie: [
            {name: '基础饼图', value: 'pieBasic', icon: pre_dir + '/img/type-pie-basic.jpg',},
        ],
        scatter: [
            {name: '基础散点图', value: 'scatterBasic', icon: pre_dir + '/img/type-scatter-basic.jpg',},
        ],
        radar: [
            {name: '基础雷达图', value: 'radarBasic', icon: pre_dir + '/img/type-radar-basic.jpg',},
        ],
        gauge: [
            {name: '基础仪表盘', value: 'gaugeBasic', icon: pre_dir + '/img/type-gauge-basic.jpg',},
        ],
        html: [
            {name: '表格', value: 'tableBasic', icon: pre_dir + '/img/type-table-basic.jpg',},
            {name: 'html', value: 'htmlBasic', icon: pre_dir + '/img/type-html-basic.jpg',}
        ],
        diy: [
            {
                name: '3D柱图',
                value: 'diy',
                icon: pre_dir + '/img/type-diy-transparent-bar3d.jpg',
                type: 'bar3d',
                js: pre_dir + '/diyjs/1.1.js',
            },
            {
                name: '高德地图',
                value: 'diy',
                icon: pre_dir + '/img/type-diy-scatter-bmap1.jpg',
                type: 'mapPot',
                js: pre_dir + '/diyjs/example_bmap.js'
            },
            {
                name: '百度地图',
                value: 'diy',
                icon: pre_dir + '/img/type-diy-scatter-bmap2.jpg',
                type: 'mapPot',
                js: pre_dir + '/diyjs/example_bmap2.js'
            },
            {
                name: '路线图',
                value: 'diy',
                icon: pre_dir + '/img/type-diy-mapline.jpg',
                type: 'mapPot',
                js: pre_dir + '/diyjs/example_mapline.js'
            },
            {
                name: '热力图(GEO)',
                value: 'diy',
                icon: pre_dir + '/img/type-diy-heatmap-bmap.jpg',
                type: 'heatMap',
                js: pre_dir + '/diyjs/example_heatmap.js'
            },
            {
                name: '关系图',
                value: 'diy',
                icon: pre_dir + '/img/type-diy-graph-circular-layout.jpg',
                type: 'rel',
                js: pre_dir + '/diyjs/example_relpie.js'
            },
            {
                name: '气泡图',
                value: 'diy',
                icon: pre_dir + '/img/type-diy-bubble-gradient.jpg',
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
            label: 'HTML', value: 'html'
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
    ORDER: [{label: '升序(ASC)', value: 'asc'}, {label: '降序(DESC)', value: 'desc'}],
    ORDER_BY: [{label: 'X轴', value: 'col'}, {label: '值', value: 'val'}],
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
        logo: pre_dir + '/img/logo-nav.png',
        logoBlue: pre_dir + '/img/logo-nav3.png',
        // bgImg: pre_dir + `/img/bg${randomInt(1, 4)}.png`,
        bgImg: pre_dir + `/img/home_bg.jpg`,
        vdo: pre_dir + '/img/ex.mp4',
        sourceIcon: {
            mysql: pre_dir + '/img/MySQL.png',
            mssql: pre_dir + '/img/MsSQL.png',
            excel: pre_dir + '/img/excel.png',
        }
    }
};