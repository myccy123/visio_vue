<template>
    <div class="center-bottom-wrap">
        <component :is="chartCate"></component>
    </div>
</template>
<script>
import BaiduChart from './center_bottom/BaiduChart.vue';
import HtmlChart from './center_bottom/HtmlChart.vue';
import "echarts-gl";
import "echarts-liquidfill";
import "echarts/extension/bmap/bmap";
export default {
    name:'CenterBottom',
    components:{BaiduChart,HtmlChart},
    date(){
        return{

        }
    },
    computed:{
        chartCate(){
            return this.$store.state.chartCate === 'html' ? 'HtmlChart' : 'BaiduChart';
        }
    }
}
</script>
<style >
.center-bottom-wrap{
    height: 100%;
}
</style>