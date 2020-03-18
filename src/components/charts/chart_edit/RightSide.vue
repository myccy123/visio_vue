<template>
    <div class="right-side-wrap">
        <component :is="componentName"></component>
    </div>
</template>
<script>
import options from '../../../config/options';
import LineBasic from './right_side/LineBasic.vue';
import AreaBasic from './right_side/AreaBasic.vue';
import BarBasic from './right_side/BarBasic.vue';
import ColumnBasic from './right_side/ColumnBasic.vue';
import GaugeBasic from './right_side/GaugeBasic.vue';
import PieBasic from './right_side/PieBasic.vue';
import RadarBasic from './right_side/RadarBasic.vue';
import ScatterBasic from './right_side/ScatterBasic.vue';
import TableBasic from './right_side/TableBasic.vue';
import Placeholder from './right_side/Placeholder';
export default {
    name:'RightSide',
    components:{LineBasic,AreaBasic,BarBasic,ColumnBasic,GaugeBasic,PieBasic,RadarBasic,ScatterBasic,TableBasic,Placeholder},
    data(){
        return{
            
        }
    },
    computed:{
        showComponent(){
            let cate = this.$store.state.chartCate;
            let type = this.$store.state.chartType;
            if(cate === 'diy' || (cate == 'html'&& type != 'tableBasic')){
                return false
            }
            return true;
        },
        componentName(){
            if(options.CHART_DIM[this.$store.state.chartType]){
                return options.CHART_DIM[this.$store.state.chartType].component
            }else{
                return "Placeholder";
            }
            
        }
    },
    mounted(){
    }
}
</script>
<style >
.dim {
    width: 260px;
    margin: 10px auto 0 auto;
    max-height: 455px;
    border-top: 2px solid #79aec8;
    border-bottom: 1px solid #79aec8;
    border-right: 1px solid #79aec8;
    border-left: 1px solid #79aec8;
    border-radius: 2px;
    overflow: auto;
    text-align: center;
}

.del-y {
    height: 5px;
    width: 5px;
    display: inline-block;
    cursor: pointer;
    color: red;
    position: absolute;
    top: 0;
    right: 11px;
}


</style>