<template>
    <div :id="domId" ref="htmlBoxWrap" style="height:100%;overflow:auto">
        <div></div>
        <div :id="domId + '_style_mount'"></div>
    </div>
</template>
<script>
import Vue from "vue/dist/vue.esm.js";
export default {
    name: "HtmlExtend",
    props: ["chartId", "domId"],
    data() {
        return {};
    },
    computed: {},
    mounted() {
        this.$axios
            .post(this.$api.getChart, { id: this.chartId })
            .then(res => {
                if (res.data.code === "00") {
                    let template = res.data.data.diyCode;
                    document.getElementById(`${this.domId}_style_mount`).innerHTML = "";
                    let indexOf = template.indexOf("<style");
                    let el = template.substring(0, indexOf);
                    let style = template.substring(indexOf);
                    let custom = Vue.extend({
                        template: `<div style="height: 100%; width: 100%;">${el}</div>`
                    });
                    let mountDom = this.$refs.htmlBoxWrap.childNodes[0];
                    new custom().$mount(mountDom);
                    let styleDom = document
                        .createRange()
                        .createContextualFragment(style);
                    document
                        .getElementById(`${this.domId}_style_mount`)
                        .appendChild(styleDom);
                }
            })
            .catch(err => console.log(err));
    },
    methods: {
        getHtmlConfig() {
            this.$axios
                .post(this.$api.getChart, { id: this.chartId })
                .then(res => {
                    console.log(res);
                });
        }
    },
    destroyed() {
        this.$root.$off("htmlCustom");
    }
};
</script>
<style >
</style>