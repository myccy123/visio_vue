<template>
    <div>
        <div class="dim">
            <el-form
                :model="chartConfig"
                size="mini"
                label-width="60px"
                style="padding: 10px 10px 0px 10px;">
                <el-form-item label="数据">
                    <el-select
                        :loading="colOptions.length == 0"
                        v-model="chartConfig.data"
                        placeholder="请选择"
                        clearable
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
                :model="chartConfig"
                size="mini"
                label-width="60px"
                style="padding: 10px 10px 0px 10px;"
            >
                <el-form-item label="name">
                    <el-input @blur="genVision" v-model="chartConfig.name" placeholder></el-input>
                </el-form-item>
                <el-form-item label="min">
                    <el-input
                        @change="genVision"
                        type="number"
                        v-model="chartConfig.min"
                        placeholder
                    ></el-input>
                </el-form-item>
                <el-form-item label="max">
                    <el-input
                        @change="genVision"
                        type="number"
                        v-model="chartConfig.max"
                        placeholder
                    ></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input @change="genVision" v-model="chartConfig.unit" placeholder></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import mixin from "../../chart-mixin";
import setMixin from "./set-mixin";
import options from "../../../../config/options";
export default {
    name: "GaugeBasic",
    mixins: [mixin, setMixin],
    data() {
        return {
            sumOptions: options.SUM_TYPE
        };
    },
    computed: {
        colOptions() {
            return this.$store.state.colOptions;
        }
    },
    mounted() {},
    methods: {}
};
</script>