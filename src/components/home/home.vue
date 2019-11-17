<template>
    <div>
        <common-nav></common-nav>
        <div id="example">
            <vue-particles color="#dedede" style="height: 100%; width: 100%;"></vue-particles>
        </div>
    </div>
</template>

<script>
    import CommonNav from "../common/nav";
    export default {
        name: "home",
        components: {CommonNav},
        mounted() {
        }
    }
</script>

<style scoped>
    #example {
        min-height: calc(100vh - 57px);
    }
</style>