<template>
    <div class="vdo-wrap">
        <video :src="vdo" autoplay="autoplay" muted width="100%" loop="loop">

        </video>
    </div>
</template>

<script>
    import options from "../../config/options";

    export default {
        name: "Video",
        data() {
            return {
                vdo: options.ASSETS.vdo
            }
        }
    }
</script>

<style scoped>
    .vdo-wrap {
        margin: 10px auto;
        border-radius: 4px;
        width: 80%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
</style>