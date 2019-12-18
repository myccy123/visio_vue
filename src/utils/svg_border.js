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
    console.log(svgWidth, svgHeight);
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
