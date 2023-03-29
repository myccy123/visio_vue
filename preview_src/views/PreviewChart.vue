<template>
    <div id='preview_chart'>
    </div>
</template>
<script>
import {genChart, getParams, getParam, disposeAll} from '../utils/vision';
let chartTm = null
export default {
    name:'PreviewChart',
    mounted(){
        let ps = getParams();
        let id = getParam('id')
        let loop = getParam('loop')
        let params = {}
        for(let p in ps) {
            if (p === 'id' || p === 'type' || p === 'loop') {
                continue
            }
            params[p] = ps[p]
        }

        genChart('preview_chart', id, {params: params})
        if(loop !== null) {
            chartTm = setInterval(genChart, parseInt(loop) * 1000,
                'preview_chart', id, {params: params})
        }

    },
    destroyed(){
        window.clearInterval(chartTm)
        disposeAll()
    }
}
</script>
<style>
#preview_chart{
    height: 100vh !important;
}
</style>
