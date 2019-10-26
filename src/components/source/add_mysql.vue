<template>
    <div>
        <common-nav></common-nav>
        <div style="width: 500px; margin: auto;">
            <h2 class="thedata-title">创建MySQL数据源</h2>
            <el-steps class="steps-title" :active="addMysqlStep" align-center finish-status="success"
                      style="margin: 30px 0;" process-status="process">
                <el-step title="连接MySQL"></el-step>
                <el-step title="选择数据表"></el-step>
            </el-steps>
            <el-form class="thedata-info" ref="form" v-show="addMysqlStep==0" :model="mysqlInfo" label-width="120px">
                <el-form-item label="数据源名称">
                    <el-input v-model="mysqlInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="HOST / IP">
                    <el-input v-model="mysqlInfo.ip"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="mysqlInfo.user"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="mysqlInfo.passWord"></el-input>
                </el-form-item>
                <el-form-item label="端口">
                    <el-input v-model="mysqlInfo.port"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 200px;margin-left: 60px;" @click="next">下一步</el-button>
                </el-form-item>
            </el-form>
            <el-form v-show="addMysqlStep==1" :model="mysqlInfo" label-width="120px">
                <el-form-item label="库 & 表">
                    <el-cascader :options="options" filterable
                                 v-model="dbTable" separator="." style="width: 100%;"></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" style="width: 120px;margin-left: 30px;" @click="previous">上一步</el-button>
                    <el-button :loading="lding" :disabled="!canSave" type="primary" style="width: 120px;margin-left: 60px;" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import commonNav from '../common/nav'

    export default {
        name: "addMysql",
        components: {commonNav},
        data() {
            return {
                addMysqlStep: 0,
                mysqlInfo: {},
                dbTable: [],
                lding: false,
                options: [
                    {
                        value: 'zhinan',
                        label: '指南',
                        children: [{
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [{
                                value: 'yizhi',
                                label: '一致'
                            }, {
                                value: 'fankui',
                                label: '反馈'
                            }, {
                                value: 'xiaolv',
                                label: '效率'
                            }, {
                                value: 'kekong',
                                label: '可控'
                            }]
                        }, {
                            value: 'daohang',
                            label: '导航',
                            children: [{
                                value: 'cexiangdaohang',
                                label: '侧向导航'
                            }, {
                                value: 'dingbudaohang',
                                label: '顶部导航'
                            }]
                        }]
                    }, {
                        value: 'zujian',
                        label: '组件',
                        children: [{
                            value: 'basic',
                            label: 'Basic',
                            children: [{
                                value: 'layout',
                                label: 'Layout 布局'
                            }, {
                                value: 'color',
                                label: 'Color 色彩'
                            }, {
                                value: 'typography',
                                label: 'Typography 字体'
                            }, {
                                value: 'icon',
                                label: 'Icon 图标'
                            }, {
                                value: 'button',
                                label: 'Button 按钮'
                            }]
                        }, {
                            value: 'form',
                            label: 'Form',
                            children: [{
                                value: 'radio',
                                label: 'Radio 单选框'
                            }, {
                                value: 'checkbox',
                                label: 'Checkbox 多选框'
                            }, {
                                value: 'input',
                                label: 'Input 输入框'
                            }, {
                                value: 'input-number',
                                label: 'InputNumber 计数器'
                            }, {
                                value: 'select',
                                label: 'Select 选择器'
                            }, {
                                value: 'cascader',
                                label: 'Cascader 级联选择器'
                            }, {
                                value: 'switch',
                                label: 'Switch 开关'
                            }, {
                                value: 'slider',
                                label: 'Slider 滑块'
                            }, {
                                value: 'time-picker',
                                label: 'TimePicker 时间选择器'
                            }, {
                                value: 'date-picker',
                                label: 'DatePicker 日期选择器'
                            }, {
                                value: 'datetime-picker',
                                label: 'DateTimePicker 日期时间选择器'
                            }, {
                                value: 'upload',
                                label: 'Upload 上传'
                            }, {
                                value: 'rate',
                                label: 'Rate 评分'
                            }, {
                                value: 'form',
                                label: 'Form 表单'
                            }]
                        }, {
                            value: 'data',
                            label: 'Data',
                            children: [{
                                value: 'table',
                                label: 'Table 表格'
                            }, {
                                value: 'tag',
                                label: 'Tag 标签'
                            }, {
                                value: 'progress',
                                label: 'Progress 进度条'
                            }, {
                                value: 'tree',
                                label: 'Tree 树形控件'
                            }, {
                                value: 'pagination',
                                label: 'Pagination 分页'
                            }, {
                                value: 'badge',
                                label: 'Badge 标记'
                            }]
                        }, {
                            value: 'notice',
                            label: 'Notice',
                            children: [{
                                value: 'alert',
                                label: 'Alert 警告'
                            }, {
                                value: 'loading',
                                label: 'Loading 加载'
                            }, {
                                value: 'message',
                                label: 'Message 消息提示'
                            }, {
                                value: 'message-box',
                                label: 'MessageBox 弹框'
                            }, {
                                value: 'notification',
                                label: 'Notification 通知'
                            }]
                        }, {
                            value: 'navigation',
                            label: 'Navigation',
                            children: [{
                                value: 'menu',
                                label: 'NavMenu 导航菜单'
                            }, {
                                value: 'tabs',
                                label: 'Tabs 标签页'
                            }, {
                                value: 'breadcrumb',
                                label: 'Breadcrumb 面包屑'
                            }, {
                                value: 'dropdown',
                                label: 'Dropdown 下拉菜单'
                            }, {
                                value: 'steps',
                                label: 'Steps 步骤条'
                            }]
                        }, {
                            value: 'others',
                            label: 'Others',
                            children: [{
                                value: 'dialog',
                                label: 'Dialog 对话框'
                            }, {
                                value: 'tooltip',
                                label: 'Tooltip 文字提示'
                            }, {
                                value: 'popover',
                                label: 'Popover 弹出框'
                            }, {
                                value: 'card',
                                label: 'Card 卡片'
                            }, {
                                value: 'carousel',
                                label: 'Carousel 走马灯'
                            }, {
                                value: 'collapse',
                                label: 'Collapse 折叠面板'
                            }]
                        }]
                    }, {
                        value: 'ziyuan',
                        label: '资源',
                        children: [{
                            value: 'axure',
                            label: 'Axure Components'
                        }, {
                            value: 'sketch',
                            label: 'Sketch Templates'
                        }, {
                            value: 'jiaohu',
                            label: '组件交互文档'
                        }]
                    }
                ]
            }
        },
        computed: {
            canSave() {
                return this.dbTable.length >= 2
            }
        },
        methods: {
            next() {
                this.addMysqlStep++;
            },
            previous() {
                this.addMysqlStep--;
            },
            save() {
                this.mysqlInfo.db = this.dbTable[0]
                this.mysqlInfo.table = this.dbTable[1]
                console.log(this.mysqlInfo)
                this.$router.replace({name: 'source'})
            },
        }
    }
</script>

<style scoped>
    .thedata-title{
        font-size: 18px;
        color: #909399;
        position: relative;
    }
</style>