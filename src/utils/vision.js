import "echarts";
import 'echarts-gl';
import 'echarts-liquidfill'
import 'echarts/extension/bmap/bmap'
import lodash from 'lodash';
import axios from 'axios';
import url from '../config/urls'

let BASE_URL = url.baseUrl;
let chartSet = new Set();
let timerSet = new Set();

let themeList = [
    'chalk',
    'dark',
    'essos',
    'halloween',
    'infographic',
    'macarons',
    'purple-passion',
    'roma',
    'shine',
    'vintage',
    'walden',
    'westeros',
    'wonderland',
];

// for (let t of themeList) {
//     let sc = document.createElement("script");
//     sc.src = `${BASE_URL}/static/preview/themes/${t}.js`;
//     document.getElementsByTagName('head')[0].appendChild(sc);
// }

function getParam(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function HexToRgb(str) {
    str = str.replace("#", "");
    let hxs = str.match(/../g);
    for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
    return hxs;
}

function RgbToHex(a, b, c) {
    let hexs = [a.toString(16), b.toString(16), c.toString(16)];
    for (let i = 0; i < 3; i++) if (hexs[i].length === 1) hexs[i] = "0" + hexs[i];
    return "#" + hexs.join("")
}

function getDarkColor(color, level) {
    let rgbc = HexToRgb(color);
    for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
    return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}

function drawSvg(parentDom, color = '#90a3cf') {


    let svgHTML = `<div style="width:100%;height:100%;position: absolute;z-index: 97" class="svgBorderWrap">
                    <svg class="svgEl"
                         version="1.0"
                         xmlns="http://www.w3.org/2000/svg"
                         width="100%"
                         height="100%">
                        <g id="layer101" fill="none" stroke="none">
                            <path class="svgOutline" d style="stroke-width: 1px; stroke: ${color}" />
                            <!-- 左上 -->
                            <path class="svgLT" d style="fill: ${color}"/>
                            <path class="svgRT" d style="fill: ${color}"/>
                            <path class="svgLB" d style="fill: ${color}"/>
                            <path class="svgRB" d style="fill: ${color}"/>
                        </g>
                    </svg>
                </div>`;
    let laySVG = document.createRange().createContextualFragment(svgHTML);

    parentDom.appendChild(laySVG);

    let svgWrap = parentDom.querySelector('.svgBorderWrap');
    let svgWidth = svgWrap.offsetWidth - 1;
    let svgHeight = svgWrap.offsetHeight - 1;
    parentDom.querySelector('.svgEl').setAttribute(
        "viewBox",
        `0 0 ${svgWidth} ${svgHeight}`
    );
    //边框
    let outline = parentDom.querySelector('.svgOutline');
    let corner = 12;

    let outlineD = `
            M${corner},0
            H${svgWidth - corner - 1}
            l${corner},${corner}
            V${svgHeight - 76}
            l-8,8
            v0,24
            l8,8
            v0,24
            l -12,12
            H${corner + 1}
            l${-corner},${-corner}
            V76
            l8,-8
            v0,-24
            l-8,-8
            V${corner}
            Z
            `;
    outline.setAttribute("d", outlineD);
    //左上
    let svgLT = parentDom.querySelector('.svgLT');
    let svgLTD = `
            M0,38
            l6,6
            v24
            l-6,6
            Z
            `;
    svgLT.setAttribute("d", svgLTD);

    //右上
    let svgRT = parentDom.querySelector('.svgRT');
    let svgRTD = `
            M${svgWidth - 10},0
            H${svgWidth}
            V10
            Z 
            `;
    svgRT.setAttribute("d", svgRTD);

    //左下
    let svgLB = parentDom.querySelector('.svgLB');
    let svgLBD = `
            M0,${svgHeight - 10}
            V${svgHeight}
            H10
            Z 
            `;
    svgLB.setAttribute("d", svgLBD);

    //右下
    let svgRB = parentDom.querySelector('.svgRB');
    let svgRBD = `
            M${svgWidth},${svgHeight - 38}
            l-6,-6
            v-24
            l6,-6
            Z 
            `;
    svgRB.setAttribute("d", svgRBD);
}

function drawSvg1(parentDom,
                  bgColor = 'transparent',
                  borderColor = '#00c0ff') {
    let svgHTML = `
    <div style="width:100%;height:100%;position: absolute;z-index: 97" class="svgBorderWrap">
        <svg
            class="svgEl"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
        >
            <filter
                id="filter-${parentDom.id}"
                x="0"
                y="0"
                width="100%"
                height="100%"
                filterUnits="userSpaceOnUse">
                <feGaussianBlur result="blur" stdDeviation="5.333" in="SourceAlpha" />
                <feFlood result="flood" flood-color="${borderColor}" flood-opacity="0.38" />
                <feComposite result="composite-2" operator="out" in2="blur" />
                <feComposite result="composite" operator="in" in2="SourceAlpha" />
                <feBlend result="blend" mode="screen" in2="SourceGraphic" />
            </filter>

            <g id="layer101" filter="url(#filter-${parentDom.id})" stroke="none" fill="${bgColor}">
                <path
                    class="svgOutline"
                    style="stroke-width: 1px;stroke: ${borderColor}" />
                <!-- 左上 -->
                <path class="svgLT" d style="fill: ${borderColor}" />
                <path class="svgRT" d style="fill: ${borderColor}" />
                <path class="svgLB" d style="fill: ${borderColor}" />
                <path class="svgRB" d style="fill: ${borderColor}" />

                <path
                    class="svgAnimationline border-animation"
                    style="stroke-width: 1px;stroke: ${borderColor}"
                />
            </g>
            
        </svg>
        <style>
            .border-animation {
                stroke-dasharray: 50%;
                stroke-dashoffset: 0;
                animation: borderAnimation 4s linear infinite;
            }
            @keyframes borderAnimation {
                from {
                    stroke-dashoffset: 0%;
                }
                to {
                    stroke-dashoffset: 100%;
                }
            }
        </style>
    </div>`;
    let laySVG = document.createRange().createContextualFragment(svgHTML);
    parentDom.appendChild(laySVG);

    let svgWrap = parentDom.querySelector('.svgBorderWrap');
    let svgWidth = svgWrap.offsetWidth - 1;
    let svgHeight = svgWrap.offsetHeight - 1;
    parentDom.querySelector('.svgEl').setAttribute(
        "viewBox",
        `0 0 ${svgWidth} ${svgHeight}`
    );
    //边框
    let outline = parentDom.querySelector('.svgOutline');
    let corner = 12;

    let outlineD = `
            M${corner},1
            H${svgWidth - corner - 1}
            l${corner},${corner}
            V${svgHeight - 76}
            l-8,8
            v0,24
            l8,8
            v0,23
            l -12,12
            H${corner + 1}
            l${-corner},${-corner}
            V76
            l8,-8
            v0,-23
            l-8,-8
            V${corner}
            Z
            `;
    outline.setAttribute("d", outlineD);
    //左上
    let svgLT = parentDom.querySelector('.svgLT');
    let svgLTD = `
            M0,38
            l6,6
            v24
            l-6,6
            Z
            `;
    svgLT.setAttribute("d", svgLTD);

    //右上
    let svgRT = parentDom.querySelector('.svgRT');
    let svgRTD = `
            M${svgWidth - 10},0
            H${svgWidth}
            V10
            Z 
            `;
    svgRT.setAttribute("d", svgRTD);

    //左下
    let svgLB = parentDom.querySelector('.svgLB');
    let svgLBD = `
            M0,${svgHeight - 10}
            V${svgHeight}
            H10
            Z 
            `;
    svgLB.setAttribute("d", svgLBD);

    //右下
    let svgRB = parentDom.querySelector('.svgRB');
    let svgRBD = `
            M${svgWidth},${svgHeight - 38}
            l-6,-6
            v-24
            l6,-6
            Z 
            `;
    svgRB.setAttribute("d", svgRBD);

    //动效
    let animationLine = parentDom.querySelector('.svgAnimationline');
    let animationLineD = `
            M${corner},1
            H${svgWidth - corner - 1}
            l${corner},${corner}
            V${svgHeight - 76}
            l-8,8
            v0,24
            l8,8
            v0,23
            l -12,12
            H${corner + 1}
            l${-corner},${-corner}
            V76
            l8,-8
            v0,-23
            l-8,-8
            V${corner}
            Z
            `;
    animationLine.setAttribute("d", animationLineD);
}

function drawSvg2(parentDom,
                  bgColor = 'transparent',
                  borderColor = '#00c0ff') {
    let deeperColor = getDarkColor(borderColor, 0.1);
    let svgHTML = `
    <div style="width:100%;height:100%;" class="svgBorderWrap">
        <svg
            width="100%"
            height="100%"
            class="svgEl"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="filter2-${parentDom.id}" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
                    <feGaussianBlur result="blur" stdDeviation="5.333" in="SourceAlpha" />
                    <feFlood result="flood" class='filter-animation' flood-color="${borderColor}" flood-opacity="0.38" />
                    <feComposite result="composite-2" operator="out" in2="blur" />
                    <feComposite result="composite" operator="in" in2="SourceAlpha" />
                    <feBlend result="blend" mode="screen" in2="SourceGraphic" />
                </filter>
                <linearGradient id="animation_line_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(0,192,255,1)" />
                    <stop offset="68%" stop-color="rgba(0,192,255,1)" />
                    <stop offset="92%" stop-color="rgba(0,192,255,0)" />
                    <stop offset="100%" stop-color="rgba(0,192,255,0)" />
                </linearGradient>
            </defs>
            <g stroke='none' >
                <path class='svgOutline' fill='${bgColor}'  stroke='${deeperColor}' stroke-width='1px' filter='url(#filter2-${parentDom.id})'></path>
                <g>
                    <path class='svgLT1' stroke='none' fill='${borderColor}'/>
                    <path class='svgLT2' stroke='none' fill='${borderColor}'/>
                    <path class='svgLT3' stroke='none' fill='${borderColor}'/>
                    <path class='svgLT4' stroke='none' fill='${borderColor}'/>
                    <path class='svgLT5' stroke='none' fill='${borderColor}'/>
                </g>
                <g>
                    <path class='svgRB1' stroke='none' fill='${borderColor}'/>
                    <path class='svgRB2' stroke='none' fill='${borderColor}'/>
                    <path class='svgRB3' stroke='none' fill='${borderColor}'/>
                    <path class='svgRB4' stroke='none' fill='${borderColor}'/>
                    <path class='svgRB5' stroke='none' fill='${borderColor}'/>
                </g>
                <path class='svgTopLine sb2-animation' stroke="${borderColor}" fill='none'  stroke-width='2'/>
                <path class='svgBottomLine sb2-animation' stroke="${borderColor}" fill='none'  stroke-width='2'/>
            </g>
        </svg>
        <style>
            .sb2-animation {
                stroke-dasharray: 200%;
                animation: sb2Animation 4s linear infinite;
            }
            @keyframes sb2Animation {
                from {
                    stroke-dashoffset: 0;
                }
                to {
                    stroke-dashoffset: 400%;
                }
            }
            
            .filter-animation{
                animation: filterAnimation 2S linear infinite alternate;
            }
            @keyframes filterAnimation {
                from{
                    flood-opacity: 0.2;
                }
                to{
                    flood-opacity: 0.8;
                }
            }
        </style>
    </div>`;
    let laySVG = document.createRange().createContextualFragment(svgHTML);
    parentDom.appendChild(laySVG);

    let svgWrap = parentDom.querySelector('.svgBorderWrap');
    let svgWidth = svgWrap.offsetWidth;
    let svgHeight = svgWrap.offsetHeight;
    let svgEl = parentDom.querySelector('.svgEl');
    svgEl.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    //矩形起始坐标与结束坐标
    let startX = 2, startY = 2, endX = svgWidth - startX,
        endY = svgHeight - startY, h = endY - startY;
    //四个角的倒角
    let corner = 10;
    //边框
    let outline = parentDom.querySelector('.svgOutline');
    let outlineD = `
            M${startX + corner},${startY}
            H${endX - corner}
            l${corner},${corner}
            v${(h - 2 * corner) / 3}
            l${-corner + 4},${corner - 4}
            v${(h - 2 * corner) / 3 - 2 * corner + 8}
            l${corner - 4},${corner - 4}
            v${(h - 2 * corner) / 3}
            l${-corner},${corner}
            H${startX + corner}
            l${-corner},${-corner}
            v${-(h - 2 * corner) / 3}
            l${corner - 4},${-corner + 4}
            v${-(h - 2 * corner) / 3 + 2 * corner - 8}
            l${-corner + 4},${-corner + 4}
            v${-(h - 2 * corner) / 3}
            Z
            `;
    outline.setAttribute('d', outlineD);

    //左上
    let cornerWidth = 4;
    parentDom.querySelector('.svgLT1').setAttribute('d', `
            M${corner - 4},0
            h${3 * corner}
            l${cornerWidth},${cornerWidth}
            h${-3 * corner}
            l${-corner + 4},${corner - 4}
            v${3 * corner}
            l${-cornerWidth},${-cornerWidth}
            v${-3 * corner}
            Z
            `);
    parentDom.querySelector('.svgLT2').setAttribute('d', `
            M${4 * corner},0
            h${2 * cornerWidth}
            l${cornerWidth},${cornerWidth}
            h${-2 * cornerWidth}
            Z
            `);
    parentDom.querySelector('.svgLT3').setAttribute('d', `
            M${4 * corner + 3 * cornerWidth},0
            h${cornerWidth}
            l${cornerWidth},${cornerWidth}
            h${-cornerWidth}
            Z
            `);
    parentDom.querySelector('.svgLT4').setAttribute('d', `
            M${4 * corner + 5 * cornerWidth},0
            h${cornerWidth}
            l${cornerWidth},${cornerWidth}
            h${-cornerWidth}
            Z
            `);
    parentDom.querySelector('.svgLT5').setAttribute('d', `
            M${4 * corner + 7 * cornerWidth},0
            h${cornerWidth}
            l${cornerWidth},${cornerWidth}
            h${-cornerWidth}
            Z
            `);

    //右下
    parentDom.querySelector('.svgRB1').setAttribute('d', `
            M${svgWidth - corner + 4},${svgHeight}
            h${-3 * corner}
            l${-cornerWidth},${-cornerWidth}
            h${3 * corner}
            l${corner - 4},${-corner + 4}
            v${-3 * corner}
            l${cornerWidth},${cornerWidth}
            v${3 * corner}
            Z
            `);
    parentDom.querySelector('.svgRB2').setAttribute('d', `
            M${svgWidth - 4 * corner},${svgHeight}
            h${-2 * cornerWidth}
            l${-cornerWidth},${-cornerWidth}
            h${2 * cornerWidth}
            Z
            `);
    parentDom.querySelector('.svgRB3').setAttribute('d', `
            M${svgWidth - 4 * corner - 3 * cornerWidth},${svgHeight}
            h${-cornerWidth}
            l${-cornerWidth},${-cornerWidth}
            h${cornerWidth}
            Z
            `);
    parentDom.querySelector('.svgRB4').setAttribute('d', `
            M${svgWidth - 4 * corner - 5 * cornerWidth},${svgHeight}
            h${-cornerWidth}
            l${-cornerWidth},${-cornerWidth}
            h${cornerWidth}
            Z
            `);
    parentDom.querySelector('.svgRB5').setAttribute('d', `
            M${svgWidth - 4 * corner - 7 * cornerWidth},${svgHeight}
            h${-cornerWidth}
            l${-cornerWidth},${-cornerWidth}
            h${cornerWidth}
            Z
            `);

    //动画线
    parentDom.querySelector('.svgTopLine').setAttribute('d', `
            M${startX + corner},${startY}
            H${endX - corner}
            l${corner},${corner}
            v${(h - 2 * corner) / 3}
            l${-corner + 4},${corner - 4}
            v${(h - 2 * corner) / 3 - 2 * corner + 8}
            l${corner - 4},${corner - 4}
            v${(h - 2 * corner) / 3}`);

    parentDom.querySelector('.svgBottomLine').setAttribute('d', `
            M${svgWidth - startX - corner},${svgHeight - startY}
            H${corner + startX}
            l${-corner},${-corner}
            v${-(h - 2 * corner) / 3}
            l${corner - 4},${-corner + 4}
            v${-(h - 2 * corner) / 3 + 2 * corner - 8}
            l${-corner + 4},${-corner + 4}
            v${-(h - 2 * corner) / 3}`)
}

function drawTile(parentDom, title, bkColor, color = '#90a3cf') {
    let svgHTML = `
    <div
        style="position:relative;width:100%;height:80px;font-size:30px;line-height:80px;color:#93EBF8;font-weight:500;text-align:center;background-color: ${bkColor}"
        class="svgTitleWrap">
        <svg
            class="svgEl"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%">
            <defs>
                <linearGradient id="stroke_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="4%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="16%" stop-color="rgba(21,134,238,1)" />
                    <stop offset="50%" stop-color="rgba(21,134,238,1)" />
                    <stop offset="84%" stop-color="rgba(21,134,238,1)" />
                    <stop offset="96%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="100%" stop-color="rgba(21,134,238,0)" />
                </linearGradient>

                <linearGradient id="fill_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="4%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="36%" stop-color="rgba(21,134,238,0.7)" />
                    <stop offset="50%" stop-color="rgba(21,134,238,1)" />
                    <stop offset="64%" stop-color="rgba(21,134,238,0.7)" />
                    <stop offset="96%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="100%" stop-color="rgba(21,134,238,0)" />
                </linearGradient>
                <filter id="fill_filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                    
                </filter>
                <linearGradient id="animation_left_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(0,192,238,0)" />
                    <stop offset="8%" stop-color="rgba(0,192,238,0)" />
                    <stop offset="32%" stop-color="rgba(0,192,238,1)" />
                    <stop offset="100%" stop-color="rgba(0,192,238,1)" />
                </linearGradient>
                <linearGradient id="animation_right_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(0,192,255,1)" />
                    <stop offset="68%" stop-color="rgba(0,192,255,1)" />
                    <stop offset="92%" stop-color="rgba(0,192,255,0)" />
                    <stop offset="100%" stop-color="rgba(0,192,255,0)" />
                </linearGradient>
            </defs>
            <g id="layer101">
                <path
                    fill="url(#fill_gradient)"
                    filter="url(#fill_filter)"
                    stroke="none"
                    class="svgInnerShape"
                />
                <path
                    stroke="url(#stroke_gradient)"
                    stroke-width="2px"
                    fill="none"
                    class="svgOutline"
                />
                <path stroke="#00c0ff" stroke-width="4px" fill="none" ref="svgLigthLine" />
                <path
                    class="path-animation svgAnimationLeft"
                    stroke="url(#animation_left_gradient)"
                    stroke-width="2px"
                    fill="none"
                />
                <path
                    class="path-animation svgAnimationRight"
                    stroke="url(#animation_right_gradient)"
                    stroke-width="2px"
                    fill="none"
                />
                <path stroke="#00c0ff" stroke-width="4px" fill="none" class="svgLigthLine" />
            </g>
        </svg>
        <span class="titleTextWrap" style="position:absolute;left:50%;transform:translateX(-50%)">
            ${title}
        </span>
        <style>
            .path-animation {
                stroke-dasharray: 50%;
                stroke-dashoffset: 0;
                animation: pathAnimation 4s linear infinite;
            }
            @keyframes pathAnimation {
                from {
                    stroke-dashoffset: 0%;
                }
                to {
                    stroke-dashoffset: 100%;
                }
            }
        </style>
    </div>`;
    let laySVG = document.createRange().createContextualFragment(svgHTML);
    parentDom.appendChild(laySVG);

    let svgWrap = parentDom.querySelector('.svgTitleWrap');
    let svgWidth = svgWrap.offsetWidth;
    let svgHeight = svgWrap.offsetHeight - 4;
    let titleSize = 40;

    let corner = svgHeight / 2;
    let lightWidth = titleSize * 4;
    let titleTextWrap = parentDom.querySelector('.titleTextWrap');
    let titleWidth = titleTextWrap.offsetWidth + 20;
    if (titleWidth <= lightWidth) {
        titleWidth = lightWidth + 80;
        lightWidth = titleSize * 3;
    }
    parentDom.querySelector('.svgEl').setAttribute(
        "viewBox",
        `0 0 ${svgWidth} ${svgHeight}`
    );

    //边框
    let outline = parentDom.querySelector('.svgOutline');
    let outlineD = `
            M0,${svgHeight / 2}
            H${(svgWidth - titleWidth - 2 * corner) / 2}
            l${corner},${corner}
            l${titleWidth},0
            l${corner},${-corner}
            H${svgWidth}
            `;
    outline.setAttribute("d", outlineD);

    //中间高亮线
    let lightLine = parentDom.querySelector('.svgLigthLine');
    let lightLineD = `
            M${(svgWidth - lightWidth) / 2},${svgHeight}
            l${lightWidth},0
            `;
    lightLine.setAttribute("d", lightLineD);

    //背景
    let innerShape = parentDom.querySelector('.svgInnerShape');
    let innerShapeD = `
            M${(svgWidth - titleWidth - 4 * corner) / 2},0
            l${2 * corner},${2 * corner}
            h${titleWidth}
            l${2 * corner},${-2 * corner}
            Z
            `;
    innerShape.setAttribute("d", innerShapeD);

    //左动效
    let animationLeft = parentDom.querySelector('.svgAnimationLeft');
    let animationLeftD = `
            M0,${svgHeight / 2}
            H${(svgWidth - titleWidth - 2 * corner) / 2}
            l${corner},${corner}
            l${titleWidth / 2},0
            `;
    animationLeft.setAttribute("d", animationLeftD);

    //右动效
    let animationRight = parentDom.querySelector('.svgAnimationRight');
    let animationRightD = `
            M${svgWidth},${svgHeight / 2}
            h${-(svgWidth - titleWidth - 2 * corner) / 2}
            l${-corner},${corner}
            l${-titleWidth / 2},0
            `;
    animationRight.setAttribute("d", animationRightD);
}

function initMap(map) {
    return new Promise((resolve, reject) => {
        if (!map) {
            resolve();
        } else {
            axios.get(BASE_URL + '/ccb/map/', {params: {mapfile: map}}).then((res) => {
                echarts.registerMap(map, res.data);
                console.log(`地图（${map}）初始化成功！`);
                resolve();

            }).catch((err) => {
                console.log(err);
                reject();
            })
        }
    })
}

function genChart(domId, chartId, html = '',
                  commonTheme = '', commonBorderColor = '', minutes = 0) {

    let dom = document.getElementById(domId);
    let myChart = null;

    function getData() {
        if (html) {
            dom.innerHTML = html;
            return
        }

        if (!chartId) {
            return
        }
        axios.post(BASE_URL + '/ccb/get/chart/', {id: chartId}).then((res) => {

            if (!myChart) {
                myChart = echarts.init(dom, res.data.data.theme);
            }
            if (res.data.code === '00') {
                initMap(res.data.data.formOptions.moreConfig.map).then(() => {
                    echarts.dispose(dom);

                    let theme = commonTheme ? commonTheme : res.data.data.theme;
                    if (res.data.data.chartType === 'diy') {
                        let jsCode = `${res.data.data.diyCode};
                            var ${domId} = echarts.init(document.getElementById('${domId}'), '${theme}', {renderer: 'canvas'})
                            ${domId}.setOption(option);
                            return ${domId}`.replace('xxxxChart', domId);
                        let jsFun = new Function(jsCode);
                        chartSet.add(jsFun());

                    } else {
                        let myChart = echarts.init(dom, theme);
                        myChart.setOption(res.data.data.chartOptions);
                        chartSet.add(myChart);
                    }
                })

            } else {
                dom.innerText = JSON.stringify(res.data, null, 4)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    getData();
    if (minutes !== 0) {
        setInterval(getData, minutes * 1000)
    }
}

function sliderTimer(rootDomId, layout, commonTheme, commonBorderColor) {
    return setInterval(() => {
        for (let item of layout) {
            for (let row of item.charts) {
                for (let col of row.cols) {
                    if (col.mode === '3' && col.slider.length >= 1) {
                        let domId = col.domId;
                        let dom = document.getElementById(domId);
                        if (col.sliderIndex >= col.slider.length) {
                            col.sliderIndex = 0
                        }
                        let chartId = col.slider[col.sliderIndex].chartid;
                        genChart(`${rootDomId}_${domId}`, chartId, '',
                            commonTheme, commonBorderColor);
                        col.sliderIndex++;
                    }
                }
            }
        }
    }, getSliderInterval());
}


function genTemplate(domId, tempId, theme = '') {
    axios.post(BASE_URL + '/ccb/get/template/', {id: tempId}).then((res) => {
        if (res.data.code === '00') {
            let dom = document.getElementById(domId);
            let container = document.createElement('div');
            container.style.position = 'relative';
            let tempInfo = res.data.data.layout_info.templateInfo;
            let layout = res.data.data.layout_info.layout;
            let bgColor = tempInfo.backgroundColor ? tempInfo.backgroundColor : '#fff';
            let commonTheme = tempInfo.theme;
            if (theme) {
                commonTheme = theme;
            }
            let commonBorderColor = tempInfo.borderColor;
            if (res.data.data.name !== '') {
                let titleBox = document.createElement('div');
                titleBox.style.width = tempInfo.width + 'px';
                dom.appendChild(titleBox);
                drawTile(titleBox, res.data.data.name, bgColor)
            }
            dom.appendChild(container);

            if (tempInfo.width) {
                container.style.width = tempInfo.width + 'px'
            }
            if (tempInfo.height) {
                container.style.height = tempInfo.height + 'px'
            } else {
                container.style.height = container.offsetWidth * (tempInfo.offsetHeight / tempInfo.offsetWidth) + 'px'
            }

            container.style.backgroundColor = bgColor;

            let boxHeigh = container.offsetHeight;
            let boxWidth = container.offsetWidth;
            let marginLeft = tempInfo.margin[0];
            let marginTop = tempInfo.margin[1];
            let rowHeight = (boxHeigh - marginTop * (tempInfo.rows + 1)) / tempInfo.rows;
            let colWidth = (boxWidth - marginLeft * (tempInfo.cols + 1)) / tempInfo.cols;

            for (let lay of layout) {
                let layWidth = lay.w * colWidth + (lay.w - 1) * marginLeft;
                let layHeight = lay.h * rowHeight + (lay.h - 1) * marginTop;
                let left = lay.x * colWidth + (lay.x + 1) * marginLeft;
                let top = lay.y * rowHeight + (lay.y + 1) * marginTop;
                let layHTML = `
                          <div id="${domId}-vision-layout-${lay.i}"
                               style="position: absolute; top: ${top}px; left: ${left}px;width: ${layWidth}px; height: ${layHeight}px;">
                               <div class="box" style="width: 100%;height: 100%;position: absolute; top: 0; z-index: 98;"></div>
                          </div>`;
                let layEl = document.createRange().createContextualFragment(layHTML);
                container.appendChild(layEl);

                if (lay.svgBorder === 'border1' || !lay.svgBorder) {
                    drawSvg1(document.getElementById(`${domId}-vision-layout-${lay.i}`), bgColor, commonBorderColor);
                } else if (lay.svgBorder === 'border2') {
                    drawSvg2(document.getElementById(`${domId}-vision-layout-${lay.i}`), bgColor, commonBorderColor);
                }

                for (let i = 0; i < lay.charts.length; i++) {
                    let row = lay.charts[i];
                    let rowHTML = `<div id="${domId}-vision-layout-${lay.i}-${i}" style="height: ${100 / lay.charts.length}%;display: flex;justify-content:space-around;"></div>`;
                    let rowEl = document.createRange().createContextualFragment(rowHTML);
                    document.getElementById(`${domId}-vision-layout-${lay.i}`).querySelector('.box').appendChild(rowEl);
                    for (let col of row.cols) {
                        let colHTML = `<div style="width: ${100 / row.cols.length}%; height: 100%;padding: 12px;box-sizing: border-box;">
                                           <div id="${domId}_${col.domId}" style="height: 100%;"></div>
                                       </div>`;
                        let colEl = document.createRange().createContextualFragment(colHTML);
                        document.getElementById(`${domId}-vision-layout-${lay.i}-${i}`).appendChild(colEl);
                        genChart(`${domId}_${col.domId}`, col.chartId, col.html, commonTheme, commonBorderColor);

                    }
                }
            }
            let t = sliderTimer(domId, layout, commonTheme, commonBorderColor);
            timerSet.add(t)
        }
    }).catch((err) => {

    })
}

function disposeAll() {
    for(let c of chartSet) {
        echarts.dispose(c)
    }
    chartSet.clear();
    for (let tm of timerSet) {
        window.clearInterval(tm)
    }
    timerSet.clear()
}

export {
    genTemplate, genChart, disposeAll
}
