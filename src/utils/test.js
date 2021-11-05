let backBtnHtml = `<div id="map-back-btn-yjh" style="position: absolute;left: 25px;top: 25px;color: #b3efff;font-size: 16px;cursor: pointer;z-index: 200">返 回</div>`

let backBtnEl = document.createRange().createContextualFragment(backBtnHtml);
document.getElementById('chart').appendChild(backBtnEl)
document.getElementById('map-back-btn-yjh').addEventListener('click', (e) => {
    buttonClick()
})

function hell(distId, bars = []) {
    var geoGpsMap = [116.4551, 40.2539];
    var t = 1;//流入流出控制
    var geoCoordMap = {};
    let myMapData = [];

    let geoData = echarts.getMap(distId)
    for (let i = 0; i < geoData.geoJson.features.length; i++) {
        let item = geoData.geoJson.features[i].properties;
        let adcode = item.adcode;
        if (item.name == "") {
            continue
        }
        let parentId = item.acroutes;
        let name = item.name;
        let center = item.center;
        if (i === 0) {
            geoGpsMap = center
        }
        geoCoordMap[name] = center;
        myMapData.push({
            name: name,
            distId: adcode,
            parentId: parentId,
            myValue: Math.random() * 1000,
        })
    }

    var year = ["2017", "2018", "2019", "2020", "2021"];
    var mapData = []; //存放所有省下的分行业务量数组

    if (bars.length === 0) {
        let dd = myMapData.sort((a, b) => {
            return b.myValue - a.myValue
        }).slice(0, 10)

        for (let i = 0; i < year.length; i++) {
            mapData.push([])
            for (let j = 0; j < dd.length; j++) {
                mapData[i].push({
                    name: dd[j].name,
                    value: Math.round(dd[j].myValue + Math.random() * 300)
                })
            }
        }
    }

    var colors =
        ["#FFDB5C", "#FFDB5C", "#FFDB5C", "#FFDB5C", "#FFDB5C", "#FFDB5C"];
    var colorIndex = 0;


    /*柱子Y名称*/
    var categoryData = [];
    var barData = [];


    for (let i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a, b) {
            return a.value - b.value
        });
        barData.push([]);
        categoryData.push([]);
        for (let j = 0; j < mapData[i].length; j++) {
            barData[i].push(mapData[i][j].value);
            categoryData[i].push(mapData[i][j].name);
        }
    }

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].myValue)
                });
            }
        }
        return res;
    };

    var convertToLineData = function (data, gps) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var toCoord = geoCoordMap[dataItem.name];
            var fromCoord = gps; //郑州
            //  var toCoord = geoGps[Math.random()*3];
            if (fromCoord && toCoord) {
                if (t === 1) {
                    res.push([{
                        coord: toCoord,
                    }, {
                        coord: fromCoord,
                        value: dataItem.value
                    }]);
                } else {
                    res.push([{
                        coord: fromCoord,
                        value: dataItem.value
                    }, {
                        coord: toCoord,
                    }]);
                }

            }
        }
        return res;
    };

    let option = {
        timeline: {
            data: year,
            axisType: 'category',
            autoPlay: true,
            playInterval: 5000,
            left: '8%',
            right: '10%',
            bottom: '0%',
            width: '70%',
            //  height: null,
            label: {
                normal: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            symbolSize: 10,
            lineStyle: {
                color: '#555'
            },
            checkpointStyle: {
                borderColor: '#777',
                borderWidth: 2
            },
            controlStyle: {
                showNextBtn: true,
                showPrevBtn: true,
                normal: {
                    color: '#666',
                    borderColor: '#666'
                },
                emphasis: {
                    color: '#aaa',
                    borderColor: '#aaa'
                }
            },

        },
        baseOption: {
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',
            grid: {
                right: '2%',
                top: '10%',
                bottom: '10%',
                width: '18%'
            },
            tooltip: {
                trigger: 'axis', // hover触发器
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle: {
                        color: 'rgba(150,150,150,0.1)' //hover颜色
                    }
                }
            },
            visualMap: {
                min: 500,
                max: 1000,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],
                textStyle: {
                    color: 'white'
                },
                calculable: true,
                colorLightness: [0.8, 100],
                color: ['#c05050', '#e5cf0d', '#43F587'],
                dimension: 0,

            },
            geo: {
                show: true,
                map: distId,
                roam: true,
                zoom: 1,
                center: geoGpsMap,
                label: {
                    // normal: {
                    //     show: true,
                    //     color: "#c05050", //省份标签字体颜色
                    // },
                    emphasis: {
                        show: false
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                }
            },
        },
        options: []

    };

    for (var n = 0; n < year.length; n++) {
        option.options.push({

            title: {
                text: '全国（辖内）机构在途审批流程概览',
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                },
                left: 'center',
            },
            xAxis: [{
                type: 'value',
                scale: true,
                position: 'top',
                min: 0,
                boundaryGap: false,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 1,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },

            ],
            yAxis: {
                type: 'category',
                //  name: 'TOP 20',
                nameGap: 16,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff'
                    }
                },
                data: categoryData[n]
            },

            series: [
                //地图小点
                {
                    //文字和标志
                    name: 'light',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(myMapData),
                    symbolSize: function (val) {
                        return 6;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            color: '#fff',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: colors[n]
                        }
                    }
                },
                //地图
                {
                    type: 'map',
                    map: distId,
                    geoIndex: 0,
                    aspectScale: 1, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#FFFFFF',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    // tooltip: {
                    //     trigger: "item",
                    //     formatter: "{b}: {c}家分行",
                    // },
                    animation: false,
                    data: myMapData,
                },
                //地图大点的动画效果
                {
                    //  name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(myMapData).slice(0, 20),
                    symbolSize: function (val) {
                        return 5;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            color: '#fff',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: colors[n],
                            shadowBlur: 10,
                            shadowColor: colors[n]
                        }
                    },
                    zlevel: 1
                },
                //地图线的动画效果
                {
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 5, //箭头指向速度，值越小速度越快
                        trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
                        symbol: 'arrow', //箭头图标
                        symbolSize: 6, //图标大小
                    },
                    lineStyle: {
                        normal: {
                            color: colors[n],
                            width: 1, //尾迹线条宽度
                            opacity: 0.2, //尾迹线条透明度
                            curveness: .3 //尾迹线条曲直度
                        }
                    },
                    data: convertToLineData(myMapData, geoGpsMap)
                },
                //地图被攻击中心点
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        period: 4,
                        brushType: 'stroke',
                        scale: 4
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            //offset:[5, 0],
                            color: '#0f0',
                            formatter: '{b}',
                            textStyle: {
                                color: "#e5cf0d",
                                fontSize: 14,
                            }
                        },
                        emphasis: {
                            show: true,
                            color: "#f60"
                        }
                    },
                    symbol: 'pin',
                    symbolSize: 50,
                    data: [{
                        name: '总行',
                        value: geoGpsMap,
                    }],
                },
                //柱状图
                {
                    zlevel: 1.5,
                    type: 'bar',
                    barMaxWidth: 8,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: colors[n],
                            barBorderRadius: [0, 30, 30, 0]
                        }
                    },
                    data: barData[n]
                }
            ]
        });
    }
    return option

}

function echartsMapLoad(distId) {
    axios.get('/ccb/map/', {params: {mapfile: distId}}).then((res) => {
        if (res.data.code !== '01') {

            echarts.registerMap(distId, res.data);
            chartObj.setOption(hell(distId))
            return true
        } else {
            return false
        }

    }).catch((err) => {
        console.log(err);
    })
}

var chartObjParentCode = ['100000']

function buttonClick() {
    echartsMapLoad(chartObjParentCode[chartObjParentCode.length - 1])
    if (chartObjParentCode.length > 1) {
        chartObjParentCode.pop()
    }
}

function mapClick(e) {
    let res = echartsMapLoad(e.data.distId)
    if (res) {
        chartObjParentCode = e.data.parentId
    }
}

let option = hell('100000')
//点击前解绑，防止点击事件触发多次
chartObj.off('click');
chartObj.on('click', mapClick);

