<template>
    <div>
        <h2 class="title">丰富的主题</h2>
        <div id="temp1"></div>
        <div id="temp2"></div>
        <div id="temp3"></div>
        <div id="temp4"></div>
    </div>
</template>

<script>
    import {genTemplate, disposeAll} from '../../utils/vision';

    export default {
        name: "page2",
        created() {
            this.$bus.$emit('switchPage', false)
        },
        mounted() {
            genTemplate('temp1', 53)
            genTemplate('temp2', 55)
            genTemplate('temp3', 54)
            genTemplate('temp4', 56)
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