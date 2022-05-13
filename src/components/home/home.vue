<template>
    <div>
        <common-nav-blue></common-nav-blue>
        <imax></imax>
        <Video></Video>
        <page1></page1>
    </div>
</template>

<script>
    import imax from "./imax";
    import page1 from "./page1";
    import Video from "./Video";
    import CommonNavBlue from "../common/nav_blue";

    export default {
        name: "home",
        components: {imax, CommonNavBlue, page1, Video},
    }
</script>

<style scoped>

</style>