<template>
    <div>
        <common-nav></common-nav>
        <imax></imax>
        <page1></page1>
    </div>
</template>

<script>
    import CommonNav from "../common/nav";
    import imax from "./imax";
    import page1 from "./page1";

    export default {
        name: "home",
        components: {imax, CommonNav, page1},
    }
</script>

<style scoped>

</style>