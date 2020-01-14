<template>
    <div>
        <div id="temp"></div>
    </div>
</template>

<script>
    import {genTemplate, disposeAll} from '../../utils/vision';

    export default {
        name: "page3",
        created() {
            this.$bus.$emit('switchPage', false)
        },
        mounted() {
            genTemplate('temp', 57)
            this.$bus.$emit('switchPage', true)
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