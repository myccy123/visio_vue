<template>
    <div class="center-top-wrap">
        <el-tabs class="chart-config" v-model="$store.state.defTab">
            <el-tab-pane label="基本设置" name="first">
                <el-form
                        ref="form"
                        :inline="true"
                        :model="baseConfig"
                        size="mini"
                        label-width="80px"
                        style="text-align: left;"
                >
                    <el-form-item label="主标题">
                        <el-input v-model="baseConfig.title" @blur="genVision"></el-input>
                    </el-form-item>
                    <el-form-item label="副标题">
                        <el-input v-model="baseConfig.subTitle" @blur="genVision"></el-input>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-autocomplete
                                v-model="baseConfig.cate"
                                style="width: 185px;"
                                :fetch-suggestions="querySearchAsync"
                                clearable
                                placeholder="未分类"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="主题">
                        <el-select
                                v-model="baseConfig.theme"
                                placeholder="请选择"
                                @change="genVision"
                                clearable
                                style="width: 186px;"
                        >
                            <el-option
                                    v-for="item in themeOptions"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane
                    id="flt"
                    label="数据筛选"
                    name="second"
                    :disabled="chartType==='diy'"
                    style="height: 70px; overflow: auto;"
            >
                <el-button
                        class="add-filter"
                        type="primary"
                        icon="el-icon-plus"
                        plain
                        size="mini"
                        @click="addFilter"
                ></el-button>
                <el-form
                        v-for="(item,idx) in filter"
                        :inline="true"
                        :model="item"
                        size="mini"
                        label-width="60px"
                        :key="'filter_key_' + idx"
                >
                    <el-form-item label="数据项">
                        <el-select
                                class="data-filter"
                                :loading="colOptions.length == 0"
                                v-model="item.col"
                                placeholder="请选择"
                                @change="filterColChange(item.col, idx)"
                        >
                            <el-option
                                    v-for="col in colOptions"
                                    :value="col.colname"
                                    :key="col.colname"
                                    :label="col.coldesc"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <template v-if="item.filterType == 'val'">
                        <el-form-item label="条件">
                            <el-select class="data-filter" v-model="item.opt" placeholder="请选择">
                                <el-option
                                        v-for="opt in filterOptions"
                                        :key="opt.value"
                                        :value="opt.value"
                                        :label="opt.label"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="条件值">
                            <el-input class="data-filter" v-model="item.val" @blur="genVision"></el-input>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="开始">
                            <el-date-picker
                                    v-model="item.bgndate"
                                    type="datetime"
                                    value-format="yyyyMMddHHmmss"
                                    @change="genVision"
                                    placeholder="选择日期时间"
                                    style="width: 150px;"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束">
                            <el-date-picker
                                    v-model="item.enddate"
                                    type="datetime"
                                    value-format="yyyyMMddHHmmss"
                                    @change="genVision"
                                    placeholder="选择日期时间"
                                    style="width: 150px;"
                            ></el-date-picker>
                        </el-form-item>
                    </template>
                    <i class="el-icon-circle-close del-btn" @click="delFilter(idx)"></i>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="高级设置" name="third">
                <el-form
                        ref="form"
                        :inline="true"
                        :model="moreConfig"
                        size="mini"
                        label-width="80px"
                >
                    <el-form-item label="排序项">
                        <el-select
                                v-model="moreConfig.orderBy"
                                placeholder="请选择"
                                style="width: 186px;"
                                @change="genVision"
                        >
                            <el-option
                                    v-for="item in orderByOptions"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序规则">
                        <el-select
                                v-model="moreConfig.sort"
                                placeholder="请选择"
                                style="width: 186px;"
                                @change="genVision"
                        >
                            <el-option
                                    v-for="item in orderOptions"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据更新">
                        <el-select
                                v-model="moreConfig.static"
                                style="width: 186px;"
                                placeholder="请选择"
                        >
                            <el-option
                                    v-for="item in updateOptions"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="条数限制">
                        <el-input-number
                                size="mini"
                                :min="0"
                                @change="genVision"
                                v-model="moreConfig.limit"
                        ></el-input-number>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="自定义开发" name="fourth" :disabled="customDisable">
                <el-form ref="form" :inline="true" :model="diy" size="mini" label-width="80px">
                    <el-form-item style="margin-left: 10px;">
                        <el-button type="primary" plain @click="showEditorDialog">编辑代码</el-button>
                    </el-form-item>
                    <el-form-item style="margin-left: 10px;">
                        <el-button type="primary" plain @click="showEditorSql">编辑SQL</el-button>
                    </el-form-item>
                    <el-form-item label="地图">
                        <el-input v-model="moreConfig.map" @blur="genVision"></el-input>
                    </el-form-item>
                </el-form>
                <el-dialog
                        title="编辑代码"
                        :visible.sync="showEditCode"
                        width="800px"
                        top="50px"
                        :modal="false"
                        :close-on-click-modal="false"
                >
                    <div style="position:relative">
                        <div style='text-align:right;position:absolute;right:10px;top:0;z-index:333'>
                            <el-button
                                    size="mini"
                                    @click="handleShowJsonViewer"
                            >getVisionData预览
                            </el-button>
                        </div>
                        <transition name="el-zoom-in-top">
                            <div class="json-viewer-wrap" v-show="showJsonViewer">
                                <json-viewer :value="jsonData" :expand-depth="3" boxed></json-viewer>
                            </div>
                        </transition>
                        <div id="edit-code" style="height:50vh"></div>
                    </div>
                    <span slot="footer">
                        <el-button @click="showEditCode = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="genEidtChart" size="mini">运 行</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                        title="编辑SQL"
                        :visible.sync="showSQL"
                        width="800px"
                        top="50px"
                        :modal="false"
                        :close-on-click-modal="false"
                >
                    <div style="height:50vh;">
                        <div id="edit-code-sql" style="height:20vh"></div>
                        <el-table
                                :data="rows"
                                :highlight-current-row="true"
                                :row-style="{cursor: 'pointer'}"
                                :cell-style="{padding: '2px 0'}"
                                height="30vh"
                                stripe
                                style="margin: 10px auto;"
                                :border="true"
                        >
                            <template v-for="col in colnames">
                                <el-table-column
                                        :prop="col"
                                        :label="col"
                                        align="center"
                                        :key="col"
                                        :show-overflow-tooltip="true"
                                ></el-table-column>
                            </template>
                        </el-table>
                    </div>

                    <span slot="footer">
                        <el-button @click="showSQL = false" size="mini">关 闭</el-button>
                        <el-button type="primary" @click="previewData" size="mini">预览数据</el-button>
                    </span>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="表格设置" name="fifth" v-if="chartType==='tableBasic'">
                <el-form ref="form" :inline="true" :model="diy" size="mini" label-width="80px">
                    <el-form-item label="下钻">
                        <el-switch v-model="tableConfig[0].isDrillDown"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="margin-left: 10px;" plain @click="openEditTableCell">单元格样式</el-button>
                        <el-dialog
                                title="编辑单元格样式"
                                :visible.sync="showEditTableCell"
                                width="800px"
                                top="50px"
                                :modal="false"
                                :close-on-click-modal="false"
                        >
                            <div style="position:relative">
                                <div id="edit-table-cell" style="height:50vh"></div>
                            </div>
                            <span slot="footer">
                                <el-button @click="showEditTableCell = false" size="mini">取 消</el-button>
                                <el-button type="primary" @click="saveTableCellConf" size="mini">保 存</el-button>
                            </span>
                        </el-dialog>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="margin-left: 10px;" plain @click="openEditTableHeader">表头样式</el-button>
                        <el-dialog
                                title="编辑表头样式"
                                :visible.sync="showEditTableHeader"
                                width="800px"
                                top="50px"
                                :modal="false"
                                :close-on-click-modal="false"
                        >
                            <div style="position:relative">
                                <div id="edit-table-header" style="height:50vh"></div>
                            </div>
                            <span slot="footer">
                                <el-button @click="showEditTableHeader = false" size="mini">取 消</el-button>
                                <el-button type="primary" @click="saveTableHeaderConf" size="mini">保 存</el-button>
                            </span>
                        </el-dialog>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import mixin from "../chart-mixin";
    import {mapState, mapMutations} from "vuex";
    import options from "../../../config/options";
    import JsonViewer from "vue-json-viewer";
    import "vue-json-viewer/style.css";

    export default {
        name: "CenterTop",
        mixins: [mixin],
        components: {JsonViewer},
        data() {
            return {
                themeOptions: options.THEME,
                filterOptions: options.FILTER,
                orderOptions: options.ORDER,
                orderByOptions: options.ORDER_BY,
                updateOptions: options.UPDATE,
                sumOptions: options.SUM_TYPE,
                showEditCode: false,
                showSQL: false,
                showEditTableCell: false,
                showEditTableHeader: false,
                rows: [],
                colnames: [],
                showJsonViewer: false, //是否显示json
                jsonData: []
            };
        },
        computed: {
            ...mapState({
                defTab: "defTab",
                colOptions: "colOptions"
            }),
            customDisable() {
                return this.chartCate !== "diy" && this.chartType !== "htmlBasic";
            }
        },
        mounted() {
        },
        methods: {
            ...mapMutations({
                setDefTab: "setDefTab"
            }),
            //模糊搜索
            querySearchAsync(queryString, cb) {
                this.$axios
                    .post(this.$api.customCateQuery, {str: queryString})
                    .then(res => {
                        if (res.data.code === "00") {
                            cb(res.data.data);
                        }
                    })
                    .catch(err => {
                    });
            },
            addFilter() {
                this.filter.push({
                    col: "",
                    opt: "",
                    val: "",
                    bgndate: "",
                    enddate: "",
                    filterType: "val"
                });
            },
            genEidtChart() {
                this.diy.code = getEditorData();
                this.genVision();
            },
            showEditorDialog() {
                this.showEditCode = true;
                this.$nextTick(() => {
                    if (this.chartCate === "diy") {
                        initEditor("edit-code", 'javascript', this.diy.code);
                    } else if (this.chartType === "htmlBasic") {
                        initEditor("edit-code", "html", this.diy.code);
                    }
                });
            },
            showEditorSql() {
                this.showSQL = true;
                this.$nextTick(() => {
                    initEditor("edit-code-sql", "sql", this.moreConfig.sql);
                });
            },
            openEditTableCell() {
                this.showEditTableCell = true;
                this.$nextTick(() => {
                    initEditor("edit-table-cell", "javascript", JSON.stringify(this.tableConfig[0].cellStyle));
                });
            },
            openEditTableHeader() {
                this.showEditTableHeader = true;
                this.$nextTick(() => {
                    initEditor("edit-table-header", "javascript", JSON.stringify(this.tableConfig[0].headerStyle));
                });
            },
            saveTableCellConf() {
                console.log(this.tableConfig[0].cellStyle)
                this.tableConfig[0].cellStyle = JSON.parse(getEditorData());
                this.genVision();
                this.showEditTableCell = false;
            },
            saveTableHeaderConf() {
                console.log(this.tableConfig[0].headerStyle)
                this.tableConfig[0].headerStyle = JSON.parse(getEditorData());
                this.genVision();
                this.showEditTableHeader = false;
            },
            previewData() {
                this.moreConfig.sql = getEditorData();
                this.$axios
                    .post(this.$api.mysqlPreview, {
                        id: this.srcid,
                        sql: this.moreConfig.sql
                    })
                    .then(res => {
                        this.rows = [];
                        if (res.data.code === "00") {
                            let columns = res.data.data.columns;
                            let rows = res.data.data.rows;
                            this.colnames = columns;
                            for (let row of rows) {
                                let tmp = {};
                                for (let i = 0; i < row.length; i++) {
                                    tmp[columns[i]] = row[i];
                                }
                                this.rows.push(tmp);
                            }
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                    .catch(err => {
                    });
            },
            delFilter(idx) {
                this.filter.splice(idx, 1);
                if (this.filter.length === 0) {
                    this.addFilter();
                }
            },
            filterColChange(v, idx) {
                for (let i = 0; i < this.colOptions.length; i++) {
                    if (
                        this.colOptions[i].colname === v &&
                        this.colOptions[i].coltype.search("date") !== -1
                    ) {
                        this.filter[idx].filterType = "date";
                        return;
                    } else {
                        this.filter[idx].filterType = "val";
                    }
                }
            },
            handleShowJsonViewer() {
                this.showJsonViewer = !this.showJsonViewer;
                if (this.showJsonViewer) {
                    let params = {
                        srcid: this.srcid,
                        sql: this.moreConfig.sql
                    }
                    this.$axios.post(this.$api.getVisionData, params).then(res => {
                        if (res.data.code == '00') {
                            this.jsonData = res.data.data;
                        }
                    }).catch(err => console.log(err))
                }
            }
        }
    };
</script>
<style>
    .center-top-wrap .el-tabs__item {
        font-size: 12px !important;
    }

    .data-filter {
        width: 150px;
    }

    .add-filter {
        position: absolute;
        right: 5px;
    }

    .del-btn {
        height: 5px;
        width: 5px;
        display: inline-block;
        top: 5px;
        cursor: pointer;
        color: red;
        position: relative;
        left: -5px;
    }

    .json-viewer-wrap {
        position: absolute;
        top: 32px;
        width: 100%;
        z-index: 666;
        border: 1px solid #aaa;
        border-radius: 6px;
        height: 50vh;
        overflow: auto;
        background-color: #eee;
    }

    .center-top-wrap #tab-first {
        padding-left: 10px;
    }

    .jv-container.boxed {
        border: none;
        background-color: #eee;
        /* height: 56vh; */
        /* overflow: auto; */
    }

    .jv-container.boxed:hover {
        border: none;
        background-color: #eee;
    }

    .jv-more .jv-toggle {
        color: #409eff !important;
    }
</style>