<template>
    <div>
        <div class="dim">
            <el-form
                :model="chartConfig.x"
                size="mini"
                label-width="60px"
                style="padding: 10px 10px 0px 10px;">
                <el-form-item label="X轴">
                    <el-select
                        :loading="colOptions.length == 0"
                        v-model="chartConfig.x.xAxis"
                        placeholder="请选择"
                        @change="genVision"
                    >
                        <el-option
                            v-for="col in colOptions"
                            :value="col.colname"
                            :key="col.colname"
                            :label="col.coldesc"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="dim">
            <el-form
                :model="chartConfig.x"
                size="mini"
                label-width="60px"
                style="padding: 10px 10px 0px 10px;"
            >
                <el-form-item label="多例" style="text-align: left;">
                    <el-switch
                        v-model="chartConfig.legend.isLegend"
                        @change="switchLegend"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="分类轴">
                    <el-select
                        :loading="colOptions.length == 0"
                        :disabled="!chartConfig.legend.isLegend"
                        v-model="chartConfig.legend.legendAxis"
                        @change="genVision"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="col in colOptions"
                            :value="col.colname"
                            :key="col.colname"
                            :label="col.coldesc"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="dim">
            <el-form
                v-for="(item, idx) in chartConfig.y"
                :model="item"
                size="mini"
                label-width="60px"
                :key="'y_key_' + idx"
                style="padding: 10px 10px 5px 10px;position: relative;"
            >
                <el-form-item label="Y轴">
                    <el-select
                        :loading="colOptions.length == 0"
                        v-model="item.yAxis"
                        placeholder="请选择"
                        @change="genVision"
                    >
                        <el-option
                            v-for="col in colOptions"
                            :value="col.colname"
                            :key="col.colname"
                            :label="col.coldesc"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="算法">
                    <el-select v-model="item.sum" placeholder="请选择" @change="genVision">
                        <el-option
                            v-for="sm in sumOptions"
                            :value="sm.value"
                            :key="sm.value"
                            :label="sm.label"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <i :id="'del-y-btn-'+idx" class="el-icon-circle-close del-y" @click="delY(idx)"></i>
            </el-form>
            <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="addY"
                :disabled="chartConfig.legend.isLegend"
                style="margin-bottom: 10px;"
            ></el-button>
        </div>
    </div>
</template>
<script>
import mixin from '../../chart-mixin';
import setMixin from './set-mixin';
import options from '../../../../config/options';
export default {
    name: "ColumnBasic",
    mixins:[mixin,setMixin],
    data(){
        return{
            sumOptions:options.SUM_TYPE,
        }
    },
    computed:{
        colOptions(){
            return this.$store.state.colOptions;
        }
    },
    mounted(){

    },
    methods:{
        
    }
};
</script>