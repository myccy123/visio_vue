<template>
    <div id='preview_chart'>
    </div>
</template>
<script>
import {genChart, getParams, getParam, disposeAll} from '../utils/vision';
export default {
    name:'PreviewChart',
    mounted(){
        let ps = getParams();
        let id = getParam('id')
        let params = {}
        for(let p in ps) {
            if (p === 'id' || p === 'type') {
                continue
            }
            params[p] = ps[p]
        }
        genChart('preview_chart', id, {params: params})
    },
    destroyed(){
        disposeAll()
    }
}
</script>
<style>
#preview_chart{
    height: 100vh !important;
}
</style>
