<template>
    <div id='preview_chart'>
    </div>
</template>
<script>
import {genChart,getParam,disposeAll} from '../utils/vision';
export default {
    name:'PreviewChart',
    mounted(){
        let id = getParam('id');
        genChart('preview_chart',id)
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