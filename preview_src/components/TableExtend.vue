<template>
    <div
        class="table-extend-wrap chartCtnClass"
        :id="domId"
        style="width: 100%;height: 100%;position: relative"
    >
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
            @row-click="handleRowClick"
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
                        <span>{{scope.row[index]}}</span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>
<script>
let drillTableConfig = null;
let drillSrcId = "";
const api = getBaseUrl() + '/ccb/drill/down/';
export default {
    name: "TableExtend",
    props: ["chartId", "domId", "tableConfig", "srcid"],
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
        initData() {
            drillTableConfig = this.tableConfig;
            drillSrcId = this.srcid;
            axios.post(api, {
                    srcid: this.srcid,
                    sql: this.tableConfig[this.drillIndex].sql
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
                })
                .catch(err => console.log(err));
        },
        handleRowClick(rowData, column, event) {
            this.drillDown(rowData);
        },
        handleCrumbClick(crumbItem) {
            if (crumbItem.level == this.breadcrumb.length - 1) return;
            this.breadcrumb.splice(crumbItem.level + 1, 999);
            this.drillIndex = crumbItem.level;
            this.drillUp(crumbItem);
        },
        //面包屑点击
        drillUp(crumbItem) {
            const index = drillTableConfig[crumbItem.level].tableDownIndex;
            axios.post(api, {
                    srcid: drillSrcId,
                    sql: drillTableConfig[this.drillIndex].sql,
                    drillDownData: crumbItem.label
                })
                .then(res => {
                    if (res.data.code == "00") {
                        const resData = res.data.data;
                        this.rows = resData.rows;
                        this.colnames = resData.columns;
                    } else {
                        console.log(res);
                    }
                });
        },
        //行 下钻字段点击
        drillDown(rowData) {
            const index = drillTableConfig[this.drillIndex].tableDownIndex;
            axios.post(api, {
                    srcid: drillSrcId,
                    sql: drillTableConfig[this.drillIndex + 1].sql,
                    drillDownData: rowData[index]
                })
                .then(res => {
                    if (res.data.code == "00") {
                        const resData = res.data.data;
                        this.rows = resData.rows;
                        this.drillIndex++;
                        this.colnames =
                            drillTableConfig[this.drillIndex].tableHeader;
                        this.breadcrumb.push({
                            level: this.drillIndex,
                            label: rowData[index]
                        });
                    } else {
                        console.log(res);
                    }
                });
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