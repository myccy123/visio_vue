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
            name: '散点图', value: 'scatter', icon: '/img/scatter.png'
        },
        {
            name: '饼图', value: 'pie', icon: '/img/pie.png'
        },
        {
            name: '雷达图', value: 'radar', icon: '/img/radar2.png'
        },
        {
            name: '仪表盘', value: 'gauge', icon: '/img/gauge.png'
        },
        {
            name: '表格', value: 'table', icon: '/img/data-table.png'
        },
        {
            name: '自定义图', value: 'diy', icon: '/img/diy-chart.png'
        },
    ],
    CHART_TYPES: {
        line: [
            {name: '基础折线图', value: 'lineBasic', icon: '/img/line-basic-default.png'},
        ],
        area: [
            {name: '基础面积图', value: 'areaBasic', icon: '/img/area-basic.jpg'},
        ],
        bar: [
            {name: '水平柱图', value: 'barBasic', icon: '/img/bar-y-category.jpg'},
        ],
        column: [
            {name: '垂直柱图', value: 'columnBasic', icon: '/img/dataset-simple0.jpg'},
        ],
        pie: [
            {name: '基础饼图', value: 'pieBasic', icon: '/img/pie-legend.jpg'},
        ],
        scatter: [
            {name: '基础散点图', value: 'scatterBasic', icon: '/img/scatter-simple.jpg'},
        ],
        radar: [
            {name: '基础雷达图', value: 'radarBasic', icon: '/img/radar.jpg'},
        ],
        gauge: [
            {name: '基础仪表盘', value: 'gaugeBasic', icon: '/img/base-gauge.png'},
        ],
        diy: [
            // {
            //     name: '3D柱图',
            //     value: 'diy',
            //     icon: '/img/transparent-bar3d.jpg',
            //     type: 'bar3d',
            //     json: '/json/bar-3d.json'
            // },
            // {
            //     name: '关系图',
            //     value: 'diy',
            //     icon: '/img/graph-circular-layout.jpg',
            //     type: 'rel',
            //     json: '/json/graph-circular-layout.json'
            // },
            // {
            //     name: '地理热力图',
            //     value: 'diy',
            //     icon: '/img/heatmap-bmap.jpg',
            //     type: 'heatMap',
            //     json: '/json/beat-map.json'
            // },
            // {
            //     name: '百度地图',
            //     value: 'diy',
            //     icon: '/img/effectScatter-bmap.jpg',
            //     type: 'mapPot',
            //     json: '/json/map_pot.json'
            // },
            // {
            //     name: '路线图',
            //     value: 'diy',
            //     icon: '/img/map-line.png',
            //     type: 'mapLine',
            //     json: '/json/map-line.json'
            // },
            // {
            //     name: '路线图',
            //     value: 'diy',
            //     icon: '/img/map_line2.png',
            //     type: 'mapLine',
            //     json: '/json/map-line2.json'
            // },
            {
                name: '酷炫柱图',
                value: 'diy',
                icon: '/img/map_line2.png',
                type: '1.1',
                json: '',
                js: '/diyjs/1.1.js',
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
        {label: 'dark', value: 'dark'},
        {label: 'infographic', value: 'infographic'},
        {label: 'macarons', value: 'macarons'},
        {label: 'roma', value: 'roma'},
        {label: 'shine', value: 'shine'},
        {label: 'vintage', value: 'vintage'},
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
};