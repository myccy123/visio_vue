<template>
    <div class="table-extend-wrap chartCtnClass"  :id="domId" style="width: 100%;height: 100%;position: absolute" >
        <div class="table-extend-nav-wrap">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item
                    @click.native="handleCrumbClick(crumbItem)"
                    v-for="crumbItem in breadcrumb"
                    :key="crumbItem.level"
                >{{crumbItem.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table
            :data="rows"
            :highlight-current-row="true"
            :row-style="{cursor: 'pointer'}"
            :cell-style="{padding: '2px 0'}"
            height="calc(100% - 30px)"
            stripe
            :border="true"
        >
            <template v-for="(col,index) in colnames">
                <el-table-column
                    :prop="col"
                    :label="col"
                    align="center"
                    :key="col"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <span @click="handleColumnClick(scope.row,col)">{{scope.row[index]}}</span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>
<script>
let drillTableConfig = null;
let drillSrcId = '';
export default {
    name: "TableExtend",
    props: ["chartId","domId"],
    data() {
        return {
            rows: [],
            colnames: [],
            drillIndex: 0, //当前在第几级别
            breadcrumb: [
                {
                    level: 0,
                    label: "首页"
                }
            ] //下钻面包屑
        };
    },
    computed: {},
    mounted() {
        this.initData();
    },
    methods: {
        async initData() {
            const res = await this.getTableConfig();
            if (res.data.code == "00") {
                const { tableConfig, srcid } = res.data.data.formOptions;
                drillTableConfig = tableConfig;
                drillSrcId = srcid;
                this.$axios
                    .post(this.$api.drillDown, {
                        srcid: srcid,
                        sql: tableConfig[this.drillIndex].sql,
                    })
                    .then(res => {
                        if (res.data.code == "00") {
                            const resData = res.data.data;
                            //数据
                            this.rows = resData.rows;
                            //表头
                            this.colnames = resData.columns;
                        } else {
                            console.log(res);
                        }
                    }).catch(err=>console.log(err));
            }
        },
        handleColumnClick(rowData) {
            this.getTableData(rowData);
        },
        handleCrumbClick(crumbItem) {
            if (crumbItem.level == this.breadcrumb.length - 1) return;
            this.breadcrumb.splice(crumbItem.level + 1, 999);
            this.drillIndex = crumbItem.level;
            this.getBackTableData(crumbItem);
        },
        //面包屑点击
        getBackTableData(crumbItem){
            const index = drillTableConfig[crumbItem.level].tableDownIndex;
            this.$axios.post(this.$api.drillDown,{
                srcid:drillSrcId,
                sql:drillTableConfig[this.drillIndex].sql,
                drillDownData:crumbItem.label,
            }).then(res=>{
                if(res.data.code == '00'){
                    const resData = res.data.data;
                    this.rows = resData.rows;
                    this.colnames = resData.columns;  
                }else{
                    console.log(res);
                }
            })
        },
        //行 下钻字段点击
        getTableData(rowData) {
            const index = drillTableConfig[this.drillIndex].tableDownIndex;
            this.$axios.post(this.$api.drillDown,{
                srcid:drillSrcId,
                sql:drillTableConfig[this.drillIndex+1].sql,
                drillDownData:rowData[index],
            }).then(res=>{
                if(res.data.code == '00'){
                    const resData = res.data.data;
                    console.log('getTableData',resData);
                    this.rows = resData.rows;
                    this.drillIndex++;
                    this.colnames = drillTableConfig[this.drillIndex].tableHeader;
                    this.breadcrumb.push({
                        level:this.drillIndex,
                        label:rowData[index]
                    });
                }else{
                    console.log(res);
                }
            })
        },
        getTableConfig() {
            return this.$axios.post(this.$api.getChart, { id: this.chartId });
        }
    },
    destroyed() {}
};
</script>
<style >
.table-extend-nav-wrap {
    padding: 8px;
}
.table-extend-nav-wrap .el-breadcrumb__inner {
    color: #40a3cf !important;
    cursor: pointer !important;
}

.table-extend-nav-wrap .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #909399 !important;
}
</style>