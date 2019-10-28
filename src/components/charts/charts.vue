<template>
    <div>
        <common-nav></common-nav>
        <el-radio-group v-model="chartCate" size="mini" style="margin: 20px 0 0 30%; float: left;">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="line">折线图</el-radio-button>
            <el-radio-button label="bar">柱图</el-radio-button>
            <el-radio-button label="pie">饼图</el-radio-button>
            <el-radio-button label="hot">热力图</el-radio-button>
        </el-radio-group>

        <el-button size="mini" type="primary" plain icon="el-icon-circle-plus-outline"
                   style="margin: 20px 0 0 50px;float: left;" @click="addChart">add
        </el-button>

        <el-row :gutter="20" style="clear: both;">
            <el-col v-for="chart in charts" :sm="6" :md="6" :lg="4" style="margin-top: 20px;">
                <div class="chart-box">
                    <img class="chart-img" src="@/assets/img/test-icon.png">
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import CommonNav from "../common/nav";

    export default {
        name: "chart",
        components: {CommonNav},
        data() {
            return {
                chartCate: 'all',
                charts: [1, 2, 3, 4, 5, 6, 7, 9, 0]
            }
        },
        mounted(){
          this.$nextTick(()=>{
             let boxes = document.querySelectorAll('.chart-box');
             for(let item of boxes){
                 item.style.height = item.style.width;
             }
          })
        },
        methods: {
            addChart() {
                this.$router.push({name: 'chartEdit'})
            }
        }
    }
</script>

<style scoped>
    .chart-box {
        cursor: pointer;
        overflow: hidden;
    }

    .chart-box:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .chart-img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
</style>