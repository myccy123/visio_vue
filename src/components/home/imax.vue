<template>
    <div id="example" style="position: relative;">
        <img :src="bgImg" style="height: 100%;width: 100%;object-fit: cover">
        <div class="imax">
            <h1 style="margin: 3% 0 1% 0; font-size: 63px;font-weight: 500;color: #303133;text-align: center">一分钟数据可视化</h1>
            <p style="font-size: 21px;font-weight: 200;text-align: center">灵活的数据源管理，丰富的图表库，酷炫的驾驶舱大屏</p>
            <p style="font-size: 21px;font-weight: 200;text-align: center">便捷集成，随心定制</p>
        </div>
    </div>
</template>

<script>
    import option from '../../config/options'
    export default {
        name: "imax",
        data(){
            return {
                bgImg: option.ASSETS.bgImg
            }
        },
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