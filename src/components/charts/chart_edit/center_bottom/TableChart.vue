<template>
    <div id="table_box" style="height:100%;overflow:auto">
        <div class="html-chart-down-wrap">
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
            height="46vh"
            stripe
            @row-click="handleRowClick"
            :border="true"
        >
            <template v-for="(col,index) in tableConfig[drillIndex].tableHeader">
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
export default {
    name: "TableChart",
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
    computed: {
        tableConfig() {
            return this.$store.state.tableConfig;
        }
    },
    mounted() {
        this.$root.$on("changeTableData", data => {
            this.rows = data || [];
        });
    },
    methods: {
        handleRowClick(rowData) {
            this.drillDown(rowData);
        },
        handleCrumbClick(crumbItem) {
            if (crumbItem.level === this.breadcrumb.length - 1) return;
            this.breadcrumb.splice(crumbItem.level + 1, 999);
            this.drillIndex = crumbItem.level;
            this.drillUp(crumbItem);
        },
        drillUp(crumbItem = this.breadcrumb[0]) {
            const index = this.$store.state.tableConfig[crumbItem.level]
                .tableDownIndex;
            const tableConfig = this.$store.state.tableConfig;
            this.$axios
                .post(this.$api.drillDown, {
                    srcid: this.$store.state.srcid,
                    sql: tableConfig[this.drillIndex].sql,
                    drillDownData: crumbItem.label
                })
                .then(res => {
                    if (res.data.code === "00") {
                        const resData = res.data.data;
                        this.rows = resData.rows;
                    } else {
                        console.log(res);
                    }
                });
        },
        drillDown(rowData) {
            const index = this.$store.state.tableConfig[this.drillIndex].tableDownIndex;
            const tableConfig = this.$store.state.tableConfig;

            if(tableConfig.length <= this.drillIndex) return;
            if(this.$store.state.tableConfig[this.drillIndex].tableDown === '') return;
            this.$axios
                .post(this.$api.drillDown, {
                    srcid: this.$store.state.srcid,
                    sql: tableConfig[this.drillIndex + 1].sql,
                    drillDownData: rowData[index]
                })
                .then(res => {
                    if (res.data.code === "00") {
                        const resData = res.data.data;
                        this.rows = resData.rows;
                        this.drillIndex++;
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
    destroyed() {
        this.$root.$off("changeTableData");
    }
};
</script>
<style >
.html-chart-down-wrap {
    padding: 8px;
}
.html-chart-down-wrap .el-breadcrumb__inner {
    color: #40a3cf !important;
    cursor: pointer !important;
}

.html-chart-down-wrap .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #909399 !important;
}
</style>