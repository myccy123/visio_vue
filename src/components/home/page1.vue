<template>
    <div>
        <div id="temp"></div>
    </div>
</template>

<script>
    import {genTemplate, disposeAll} from '../../utils/vision';

    export default {
        name: "page1",
        mounted() {
            genTemplate('temp', getTempId())
        },
        beforeRouteUpdate() {
            console.log(11111111111)
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