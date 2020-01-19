<template>
    <div>
        <h2 class="title">多种基本图表</h2>
        <div id="temp"></div>
    </div>
</template>

<script>
    import {genTemplate, disposeAll} from '../../utils/vision';

    export default {
        name: "page1",
        created() {
            this.$bus.$emit('switchPage', false)
        },
        mounted() {
            genTemplate('temp', 50)
            setTimeout(() => {
                this.$bus.$emit('switchPage', true)
            }, 2000)

        },
        destroyed() {
            disposeAll()
        }
    }
</script>

<style scoped>
    .title{
        text-align: center;
        font-size: 30px;
        font-weight: 500;
    }
</style>