<template>
    <div>
        <common-nav></common-nav>
        <div id="example" style="position: relative;">
            <vue-particles color="#dedede" style="height: 100%; width: 100%;"
                           :moveSpeed="5"
                           linesColor="#dedede"
                           :particlesNumber="200">

            </vue-particles>
            <div class="imax">
                <h1 style="font-size: 63px;font-weight: 500;color: #303133;text-align: center">一分钟数据可视化</h1>
                <p style="font-size: 21px;font-weight: 200;text-align: center">灵活的数据源管理，丰富的图表库，酷炫的驾驶舱大屏</p>
                <p style="font-size: 21px;font-weight: 200;text-align: center">便捷集成，随心定制</p>
            </div>
        </div>

        <div>
            <h2 class="title">各种常用图表</h2>
            <div id="temp1" class="tempContainer"></div>
        </div>

        <div>
            <div id="temp3" class="tempContainer"></div>
        </div>
        <div>
            <h2 class="title">地图</h2>
            <div id="temp4" class="tempContainer"></div>
        </div>
        <div>
            <h2 class="title">多种主题风格</h2>
            <div id="temp21" class="tempContainer"></div>
            <div id="temp22" class="tempContainer"></div>
            <div id="temp23" class="tempContainer"></div>
            <div id="temp24" class="tempContainer"></div>
        </div>
    </div>
</template>

<script>
    import CommonNav from "../common/nav";

    export default {
        name: "home",
        components: {CommonNav},
        mounted() {
            // genTemplate('temp1', 50);
            //
            // genTemplate('temp21', 53);
            // genTemplate('temp23', 54);
            // genTemplate('temp22', 55);
            // genTemplate('temp24', 56);
            //
            // genTemplate('temp3', 57);

            genTemplate('temp4', 52);


        },
        data(){
            return {
                timer: null,
                i: 0,
                themes: ['purple-passion', 'shine', 'walden', 'wonderland'],
            }
        },
        destroyed() {
            window.clearInterval(this.timer)
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

    .title{
        text-align: center;
        font-size: 30px;
        font-weight: 500;
    }
</style>