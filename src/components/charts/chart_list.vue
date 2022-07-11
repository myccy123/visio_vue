<template>
    <div>
        <common-nav></common-nav>
        <div style="display: flex;justify-content: space-around;width: 950px;margin: 20px auto 0 auto">
            <el-radio-group v-model="chartCate" size="mini"
                            @change="initList">
                <el-radio-button v-for="cate in cates" :label="cate.value" :key="cate.value">{{cate.label}}
                </el-radio-button>
            </el-radio-group>

            <el-select v-model="customCate"
                       placeholder="请选择"
                       style="width: 130px;"
                       @change="initList"
                       size="mini">
                <el-option
                        v-for="item in customCates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

            <el-button size="mini" type="primary" plain icon="el-icon-circle-plus-outline"
                       @click="addChart">新建
            </el-button>
            <i class="el-icon-view" style="cursor: pointer;line-height: 28px;" @click="switchView"></i>
        </div>
        <div v-infinite-scroll="chartList"
             :infinite-scroll-disabled="disabled"
             style="margin-top: 20px;overflow: auto; display: flex;flex-wrap: wrap;justify-content:space-around;">
            <div v-for="chart in charts" class="chart-box" :id="chart.id" style="">
                <img class="chart-img" :src="chart.icon">
                <div class="mask" :class="{'view-mask': look}">
                    <el-tooltip effect="dark" content="克隆图表" placement="top">
                        <i @click="cloneChart(chart.id)" class="el-icon-document-copy"
                           style="position: absolute;top: 3px;right: 3px;cursor: pointer;color: #fff;"></i>
                    </el-tooltip>
                    <div class="btn-box">
                        <p style="font-size: 14px;margin: 0;">{{chart.title?chart.title:'未命名'}}</p>
                        <p style="font-size: 14px;">id : {{chart.id}}</p>
                        <el-button size="mini" type="primary" class="btns" @click="preview(chart.id)">预览</el-button>
                        <el-button size="mini" type="warning" class="btns" @click="editChart(chart.id)">编辑</el-button>
                        <el-button size="mini" type="danger" class="btns" @click="delChart(chart.id)">删除</el-button>
                    </div>
                </div>
            </div>
			<p v-if="loading" class="load-msg">加载中...</p>
			<p v-if="isEnd" class="load-msg">―我是有底线的哦―</p>
        </div>
    </div>
</template>

<script>
    import CommonNav from "../common/nav";
    import opts from "../../config/options"

    export default {
        name: "chart",
        components: {CommonNav},
        data() {
            return {
                chartCate: 'all',
                customCate: 'all',
                charts: [],
                loading: false,
                look: false,
                cates: opts.CATE_OPTIONS,
                customCates: [],
                page: 0,
                pageSize: 20,
                isEnd: false,
            }
        },
        mounted() {
            this.customCateList();
        },
		computed: {
			disabled() {
				return this.loading || this.isEnd
			},
		},
        methods: {
            initList() {
                this.page = 0
                this.isEnd = false
                this.charts = []
                this.chartList()
            },
            chartList() {
                this.loading = true;
                this.page++;
                this.$axios.post(this.$api.chartList, {
                    cate: this.chartCate,
                    customCate: this.customCate,
                    page: this.page,
                    pageSize: this.pageSize,
                }).then((res) => {
                    if (res.data.code === '00') {
                        this.charts = this.charts.concat(res.data.data.list);
                        if (res.data.data.total === this.page) {
                            this.isEnd = true
                        }
                    }
                    this.loading = false
                }).catch((err) => {
                    console.log(err);
                    this.loading = false
                })
            },
            customCateList() {
                this.$axios.post(this.$api.customCates).then((res) => {
                    if (res.data.code === '00') {
                        this.customCates = res.data.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            preview(id) {
                window.open(`${this.$api.baseUrl}/preview/#/?type=chart&id=${id}`, "_blank");
            },
            addChart() {
                this.$router.push({name: 'chartEdit'})
            },
            editChart(id) {
                this.$router.push({name: 'chartEdit', query: {id: id}})
            },
            cloneChart(id) {
                this.$axios.post(this.$api.cloneChart, {id: id}).then((res) => {
                    if (res.data.code === '00') {
                        this.initList()
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            delChart(id) {
                this.$confirm('是否删除该图表?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.$api.delChart, {id: id}).then((res) => {
                        if (res.data.code === '00') {
                            this.initList()
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch(() => {

                });
            },
            switchView() {
                this.look = !this.look
            }
        }
    }
</script>

<style scoped>
    .chart-box {
        cursor: pointer;
        overflow: hidden;
        width: 250px;
        height: 250px;
        line-height: 250px;
        margin: 5px;
        position: relative;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        transition-duration: 0.4s;
    }

    .chart-box:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        transform: scale(1.03);
    }

    .chart-img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        vertical-align: middle;
    }

    .mask {
        height: 100%;
        width: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
    }

    .view-mask {
        background: rgba(0, 0, 0, 0.4)!important;
        opacity: 1;
    }

    .mask:hover {
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.4)!important;
        opacity: 1;
        position: absolute;
        top: 0;
        left: 0;
    }

    .btn-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

    .btn-box p {
        height: 30px;
        line-height: 30px;
        color: #fff;
        text-align: center;
        margin: 0 0 10px 0;
        font-weight: bold;
        font-size: 16px;
    }

    .btns {
        display: block;
        width: 100px;
        margin: 4px auto 4px auto !important;
        z-index: 100;
    }
	
	.load-msg {
		flex: 100vw;
		color: #909399;
		font-size: 14px;
		text-align: center;
	}
</style>