<template>
    <div>
        <common-nav></common-nav>
        <div class="container">
            <div class="left-side">
                <h2 class="h2-title">chart类型</h2>
                <div class="chart-cate">
                    <ul>
                        <el-tooltip v-for="cate in cates" effect="dark" :content="cate.name" placement="left">
                            <li @click="chartCate=cate.value"><img :src="cate.icon"></li>
                        </el-tooltip>
                    </ul>
                </div>
                <div class="chart-type">
                    <ul>
                        <li v-for="tp in types[chartCate]" class="seled-type">
                            <div><img :src="tp.icon"></div>
                            <h3>{{tp.name}}</h3></li>
                    </ul>
                </div>
            </div>
            <div class="main">
                <h2 class="h2-title">chart设置</h2>
                <el-tabs class="chart-config" v-model="defTab">
                    <el-tab-pane label="基本设置" name="first">
                        <el-form ref="form" :inline="true" :model="formOptions.baseConfig" size="mini"
                                 label-width="80px" style="text-align: left;">
                            <el-form-item label="主标题">
                                <el-input class="chart-base-info" v-model="formOptions.baseConfig.title"
                                          @blur="checkChart"></el-input>
                            </el-form-item>
                            <el-form-item label="分类">
                                <el-input class="chart-base-info" v-model="formOptions.baseConfig.cate"
                                          placeholder="未分类"></el-input>
                            </el-form-item>
                            <el-form-item label="副标题">
                                <el-input class="chart-base-info" v-model="formOptions.baseConfig.subTitle"
                                          @blur="checkChart"></el-input>
                            </el-form-item>
                            <el-form-item label="主题">
                                <el-select v-model="formOptions.baseConfig.theme"
                                           placeholder="请选择" @change="checkChart"
                                           style="width: 186px;">
                                    <el-option v-for="item in themeOptions" :key="item.value" :value="item.value"
                                               :label="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane id="flt" label="数据筛选" name="second" style="height: 70px; overflow: auto;">
                        <!--                        <el-button class="add-filter" type="primary" icon="el-icon-plus" plain size="mini"-->
                        <!--                                   @click="addFilter"></el-button>-->
                        <el-form v-for="(item,idx) in formOptions.filter" :inline="true" :model="item" size="mini"
                                 label-width="60px" @mouseover.native="showDelbtn(idx)"
                                 @mouseleave.native="hideDelbtn(idx)">
                            <el-form-item label="数据项">
                                <el-select class="data-filter" :loading="colOptions.length == 0" v-model="item.col"
                                           placeholder="请选择" @change="changeCol(item.col,idx)">
                                    <el-option v-for="col in colOptions" :value="col.colname" :key="col.colname"
                                               :label="col.coldesc">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <template v-if="item.filterType == 'val'">
                                <el-form-item label="条件">
                                    <el-select class="data-filter" v-model="item.opt" placeholder="请选择"
                                               @change="filterOtpChg($event,idx)">
                                        <el-option v-for="opt in filterOptions" :key="opt.value" :value="opt.value"
                                                   :label="opt.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="条件值">
                                    <el-input class="data-filter" v-model="item.val"
                                              @blur="checkChart"></el-input>
                                </el-form-item>
                                <i :id="'del-filter-btn-'+idx" class="el-icon-circle-close-outline del-filter"
                                   @click="delFilter(idx)"></i>
                            </template>
                            <template v-else>
                                <el-form-item label="开始">
                                    <el-date-picker v-model="item.bgndate" type="datetime" value-format="yyyyMMddHHmmss"
                                                    @change="checkChart" placeholder="选择日期时间" style="width: 150px;">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="结束">
                                    <el-date-picker v-model="item.enddate" type="datetime" value-format="yyyyMMddHHmmss"
                                                    @change="checkChart" placeholder="选择日期时间" style="width: 150px;">
                                    </el-date-picker>
                                </el-form-item>
                                <i :id="'del-filter-btn-'+idx" class="el-icon-circle-close-outline del-filter"
                                   @click="delFilter(idx)"></i>
                            </template>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="高级设置" name="third">
                        <el-form ref="form" :inline="true" :model="formOptions.moreConfig" size="mini"
                                 label-width="80px">
                            <el-form-item label="排序">
                                <el-select v-model="formOptions.moreConfig.sort" placeholder="请选择"
                                           @change="checkChart">
                                    <el-option v-for="item in orderOptions" :key="item.value" :value="item.value"
                                               :label="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据更新">
                                <el-select v-model="formOptions.moreConfig.static"
                                           placeholder="请选择"
                                           @change="checkChart">
                                    <el-option v-for="item in updateOptions" :key="item.value" :value="item.value"
                                               :label="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="自定义开发" name="fourth">
                        <el-form ref="form" :inline="true" :model="currDemo" size="mini" label-width="80px">
                            <el-form-item label="样例">
                                <el-select class="data-order" v-model="currDemo" @change="renderDemo" placeholder="请选择">
                                    <el-option v-for="demo in demoOptions" :key="demo.value"
                                               :value="demo.value" :label="demo.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item style="margin-left: 30px;">
                                <el-button type="info" plain @click="showDemoCode = true">查看代码</el-button>
                            </el-form-item>
                            <el-form-item style="margin-left: 10px;">
                                <el-button type="primary" plain @click="showEditCode = true">编辑代码</el-button>
                            </el-form-item>
                        </el-form>
                        <el-dialog title="代码示例" :visible.sync="showDemoCode" width="800px" top="50px" @open="highlight"
                                   modal="false">
                            <div class="demo-code">
                                <pre><code class="javascript">[[demoCode]]</code></pre>
                            </div>
                        </el-dialog>
                        <el-dialog title="编辑代码" :visible.sync="showEditCode" width="800px" top="50px" modal="false">
                            <div class="edit-code">
                                <el-input type="textarea" autosize="true" v-model="demoCode"
                                          style="min-height: 100px;"></el-input>
                            </div>
                            <span slot="footer">
                                        <el-button @click="showEditCode = false">取 消</el-button>
                                        <el-button type="primary" @click="runCode">运 行</el-button>
                                    </span>
                        </el-dialog>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="right-side">

            </div>
        </div>

    </div>
</template>

<script>
    import CommonNav from "../common/nav";
    import options from "../../config/options"

    export default {
        name: "chartEdit",
        components: {CommonNav},
        data() {
            return {
                defTab: 'first',
                cates: options.CHART_CATES,
                types: options.CHART_TYPES,
                chartCate: 'line',
                chartType: 'line',
                showDemoCode: false,
                showEditCode: false,
                themeOptions: options.THEME,
                filterOptions: options.FILTER,
                orderOptions: options.ORDER,
                demoOptions: options.DEMO,
                updateOptions: options.UPDATE,
                colOptions: [],
                formOptions: {
                    baseConfig: {},
                    chartConfig: {},
                    moreConfig: {static: '0', sort: 'asc'},
                    filter: [{col: '', opt: '', val: '', bgndate: '', enddate: '', filterType: 'val'}],
                    diy: {code: ''},
                    id: '',
                    srcid: '',
                    userid: '',
                }
            }
        }
    }
</script>

<style scoped>

    .container {
        width: 90%;
        min-width: 1200px;
        margin: 20px auto 0 auto;
        height: calc(100vh - 77px);
        display: flex;
        justify-content: space-between;
    }

    .left-side {
        width: 220px;
        height: 100%;
    }

    .right-side {
        height: 100%;
        width: 250px;
        background-color: #6b6fce;
    }

    .main {
        height: 100%;
        width: calc(100% - 500px);
        float: left;
    }

    .h2-title {
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        color: #909399;
        margin: 0px;
        padding: 5px;
        background-color: #F2F6FC;
    }

    .chart-cate {
        background-color: #F2F6FC;
        float: left;
        height: calc(100% - 30px);
    }

    .chart-cate li {
        width: 20px;
        height: 20px;
        padding: 5px;
        margin-top: 10px;
        cursor: pointer;
    }

    .chart-cate li:hover {
        background-color: #e8f6fd;
    }

    .chart-cate img {
        width: 100%;
        height: 100%;
    }

    .chart-type {
        float: right;
        width: 189px;
        height: calc(100% - 30px);
        overflow: auto;
    }

    .chart-type li {
        width: 95%;
        margin: 7px auto 5px auto;
        cursor: pointer;
    }

    .chart-type li:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .chart-type img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .chart-type h3 {
        font-size: 14px;
        font-weight: 500;
        color: #6b6fce;
        text-align: center;
        margin: 0px;
        padding: 2px;
        background-color: #F2F6FC;
    }

    .del-filter {
        height: 5px;
        width: 5px;
        display: inline-block;
        top: 5px;
        cursor: pointer;
        color: red;
        position: relative;
        left: -10px;
        display: none;
    }

    .chart-config {
        width: 90%;
        height: 125px;
        margin: auto;
        margin-top: 10px;
        padding: 0 10px 10px 10px;
        border: 1px solid #79aec8;
        border-radius: 2px;
    }

    .data-filter {
        width: 150px;
    }
</style>

<style>
    .el-tabs__item {
        font-size: 12px !important;
    }
</style>