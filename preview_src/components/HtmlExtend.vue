<template>
    <div :id="domId" ref="htmlBoxWrap" style="height:100%;overflow:auto">
        <div></div>
        <div id="style_mount"></div>
    </div>
</template>
<script>
import Vue from "vue/dist/vue.esm.js";
export default {
    name: "HtmlExtend",
    props: ["chartId", "domId","htmlCode"],
    data() {
        return {};
    },
    computed: {},
    mounted() {
        let template = this.htmlCode
        console.log(template);
        document.getElementById("style_mount").innerHTML = "";
        let indexOf = template.indexOf("<style");
        let el = template.substring(0, indexOf);
        let style = template.substring(indexOf);
        let custom = Vue.extend({
            template: `<div>${el}</div>`
        });
        let mountDom = this.$refs.htmlBoxWrap.childNodes[0];
        new custom().$mount(mountDom);
        let styleDom = document.createRange().createContextualFragment(style);
        document.getElementById("style_mount").appendChild(styleDom);
    },
    methods: {},
    destroyed() {}
};
</script>
<style >
</style>