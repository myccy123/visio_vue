<template>
    <div id="example" style="position: relative;">
        <div class="imax">
            <h1 style="font-size: 63px;font-weight: 500;color: #303133;text-align: center">一分钟数据可视化</h1>
            <p style="font-size: 21px;font-weight: 200;text-align: center">灵活的数据源管理，丰富的图表库，酷炫的驾驶舱大屏</p>
            <p style="font-size: 21px;font-weight: 200;text-align: center">便捷集成，随心定制</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "imax",
        created() {
            this.$bus.$emit('switchPage', false)
        },
        mounted() {
            setTimeout(() => {
                this.$bus.$emit('switchPage', true)
            }, 2000)
        }
    }
</script>

<style scoped>
    #example {
        height: calc(100vh - 57px);
    }

    .imax {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
    }

</style>