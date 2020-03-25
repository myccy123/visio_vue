<template>
    <div class="center-bottom-wrap">
        <component :is="chartCate"></component>
    </div>
</template>
<script>
import BaiduChart from './center_bottom/BaiduChart.vue';
import TableChart from './center_bottom/TableChart.vue';
import HtmlChart from './center_bottom/HtmlChart.vue';
import "echarts-gl";
import "echarts-liquidfill";
import "echarts/extension/bmap/bmap";
export default {
    name:'CenterBottom',
    components:{BaiduChart,HtmlChart,TableChart},
    date(){
        return{

        }
    },
    computed:{
        chartCate(){
            let componentName = '';
            if(this.$store.state.chartCate === 'html'){
                if(this.$store.state.chartType === 'tableBasic'){
                    componentName = 'TableChart'
                }else{
                    componentName = 'HtmlChart'
                }
            }else{
                componentName = 'BaiduChart'
            }
            return componentName;
        }
    }
}
</script>
<style >
.center-bottom-wrap{
    height: 100%;
}
</style>