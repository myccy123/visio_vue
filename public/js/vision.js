function getParam(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};


function genChart(domId, chartId) {
    let dom = document.getElementById(domId);
    let myChart = echarts.init(dom);
    myChart.showLoading();
    axios.post('http://127.0.0.1:8000/ccb/get/chart/', {id: chartId}).then((res) => {
        myChart.hideLoading();
        if (res.data.code === '00') {
            for (let f of res.data.data.functions) {
                eval('res.data.data.chartOptions' + f.name + '=' + f.fun)
            }
            myChart.setOption(res.data.data.chartOptions);
            myChart.resize();
            return myChart
        } else {
            dom.innerText = JSON.stringify(res.data, null, 4)
        }
    }).catch((err) => {
        myChart.hideLoading();
    })
}

function genTemplate(domId, tempId) {
    axios.post('http://127.0.0.1:8000/ccb/get/template/', {id: tempId}).then((res) => {
        if (res.data.code === '00') {
            let dom = document.getElementById(domId);
            let container = document.createElement('div');
            container.style.position = 'relative';
            dom.appendChild(container);
            let title = res.data.data.name ? res.data.data.name : '预览';
            let tempInfo = res.data.data.layout_info.templateInfo;
            let layout = res.data.data.layout_info.layout;
            document.title = title;

            if (tempInfo.width) {
                container.style.width = tempInfo.width + 'px'
            }
            if (tempInfo.height) {
                container.style.height = tempInfo.height + 'px'
            } else {
                container.style.height = container.offsetWidth * (tempInfo.offsetHeight / tempInfo.offsetWidth) + 'px'
            }

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
                          <div id="vision-layout-${lay.i}"
                               style="position: absolute; top: ${top}px; left: ${left}px;width: ${layWidth}px; height: ${layHeight}px;border: 1px solid #79aec8;">
                          </div>`;
                let layEl = document.createRange().createContextualFragment(layHTML);
                container.appendChild(layEl);

                for (let i = 0; i < lay.charts.length; i++) {
                    let row = lay.charts[i];
                    let rowHTML = `<div id="vision-layout-${lay.i}-${i}" style="height: ${100 / lay.charts.length}%;display: flex;justify-content:space-around;"></div>`;
                    let rowEl = document.createRange().createContextualFragment(rowHTML);
                    document.getElementById(`vision-layout-${lay.i}`).appendChild(rowEl);
                    for (let col of row) {
                        let colHTML = `<div id="vision-box-${col.id}" style="width: ${100 / row.length}%; height: 100%;"></div>`;
                        let colEl = document.createRange().createContextualFragment(colHTML);
                        document.getElementById(`vision-layout-${lay.i}-${i}`).appendChild(colEl);
                        if (col.chartId !== '') {
                            genChart(`vision-box-${col.id}`, col.chartId)
                        }
                    }
                }
            }
        }
    }).catch((err) => {

    })
}

