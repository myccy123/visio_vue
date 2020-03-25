<template>
    <div>
        <div>
            <div
                class="dim"
                style="position:relative"
                v-for="(item,index) in tableConfig"
                :key="index"
            >
                <el-form
                    :model="chartConfig"
                    size="mini"
                    label-width="60px"
                    style="padding: 10px 10px 0px 10px;"
                >
                    <el-form-item label="SQL">
                        <el-button size='mini' @click='showSQLEditorDialog(index)'>编辑SQL</el-button>
                    </el-form-item>
                    <el-form-item label="表头">
                        <el-select
                            @blur="genVision"
                            v-model="item.tableHeader"
                            multiple
                            placeholder="请选择表头字段"
                        >
                            <el-option
                                v-for="item in tableConfig[index].colOptions"
                                :key="item.colname"
                                :label="item.colname"
                                :value="item.colname"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="下钻">
                        <el-select @blur="genVision" v-model="item.tableDown" @change='handleDownChange($event,index)' placeholder="请选择下钻字段">
                            <el-option
                                v-for="colItem in tableConfig[index].colOptions"
                                :key="colItem.colname"
                                :label="colItem.colname"
                                :value="colItem.colname"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <i
                        v-if="index!=0"
                        class="el-icon-circle-close del-y"
                        @click="delTableConfig(index)"
                    ></i>
                </el-form>
            </div>
        </div>
        <div style="text-align:center;padding:12px 0">
            <el-button icon="el-icon-plus" size="mini" @click="addTableConfig"></el-button>
        </div>

        <el-dialog
            title="编辑SQL"
            :visible.sync="showSQL"
            width="800px"
            top="50px"
            :modal="false"
            :close-on-click-modal="false">
            <div style="height:50vh;">
                <div id="edit-code-sql" style="height:20vh"></div>
                <!-- <el-table
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
                </el-table> -->
            </div>

            <span slot="footer">
                <el-button @click="showSQL = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="getSql" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import mixin from '../../chart-mixin';
export default {
    name: "TableBasic",
    mixins:[mixin],
    data(){
        return{
            showSQL:false,
            // rows:[],
            // colnames:[],
            dialogIndex:0,
            isDialogCreated:false,
        }
    },
    mounted(){
        
    },
    methods:{
        showSQLEditorDialog(index){
            this.dialogIndex = index;
            this.showSQL = true;
            this.$nextTick(() => {
                initEditor("edit-code-sql",'sql',this.tableConfig[index].sql);
            });
        },
        //添加表格配置数据
        addTableConfig() {
            this.tableConfig.push({
                tableHeader: [],
                tableDown: "", //下钻字段
                tableDownIndex:0,
                sql: "",
                colOptions:[],
            });
        },
        //移除表格配置数据
        delTableConfig(index) {
            this.tableConfig.splice(index, 1);
        },
        //处理下钻字段
        handleDownChange(val,index){
            const options =  this.tableConfig[index].colOptions;
            //获取下钻字段所在下标
            for(let optIndex in options){
                if(options[optIndex].colname == val){
                    this.tableConfig[index].tableDownIndex = optIndex;
                    break;
                }
            }
        },
        getSql(){
            this.tableConfig[this.dialogIndex].sql = getEditorData();
            this.showSQL = false;
            this.genTable(this.dialogIndex);
        }
    }
};
</script>