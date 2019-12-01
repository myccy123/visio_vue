<template>
    <div style="width:100%;height:100%;position: absolute;z-index: 97" ref="svgBorderWrap">
        <svg
            ref="svgEl"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
        >
            <g id="layer101" fill="none" stroke="none">
                <path ref="svgOutline" d :style="{strokeWidth: '1px',stroke: svgColor }" />
                <!-- 左上 -->
                <path ref="svgLT" d :style="{fill:svgColor}"/>
                <path ref="svgRT" d :style="{fill:svgColor}"/>
                <path ref="svgLB" d :style="{fill:svgColor}"/>
                <path ref="svgRB" d :style="{fill:svgColor}"/>
            </g>
        </svg>
    </div>
</template>
<script>
import ResizeObserver from "resize-observer-polyfill";
export default {
    name: "SvgBorder",
    data() {
        return {
            svgColor:'#90a3cf'
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.drawSvg();
            const observer = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    this.drawSvg();
                });
            });
            observer.observe(this.$refs.svgBorderWrap);
        });
    },
    methods: {
        drawSvg() {
            let svgWrap = this.$refs.svgBorderWrap;

            if(!svgWrap) {
                return
            }

            let svgWidth = svgWrap.offsetWidth - 1;
            let svgHeight = svgWrap.offsetHeight - 1;
            this.$refs.svgEl.setAttribute(
                "viewBox",
                `0 0 ${svgWidth} ${svgHeight}`
            );
            //边框
            let outline = this.$refs.svgOutline;
            let corner = 12;

            let outlineD = `
            M${corner},0
            H${svgWidth - corner - 1}
            l${corner},${corner}
            V${svgHeight - 76}
            l-8,8
            v0,24
            l8,8
            v0,24
            l -12,12
            H${corner + 1}
            l${-corner},${-corner}
            V76
            l8,-8
            v0,-24
            l-8,-8
            V${corner}
            Z
            `;
            outline.setAttribute("d", outlineD);
            //左上
            let svgLT = this.$refs.svgLT;
            let svgLTD = `
            M0,38
            l6,6
            v24
            l-6,6
            Z
            `;
            svgLT.setAttribute("d", svgLTD);

            //右上
            let svgRT = this.$refs.svgRT;
            let svgRTD = `
            M${svgWidth - 10},0
            H${svgWidth}
            V10
            Z 
            `;
            svgRT.setAttribute("d", svgRTD);

            //左下
            let svgLB = this.$refs.svgLB;
            let svgLBD = `
            M0,${svgHeight - 10}
            V${svgHeight}
            H10
            Z 
            `;
            svgLB.setAttribute("d", svgLBD);

            //右下
            let svgRB = this.$refs.svgRB;
            let svgRBD = `
            M${svgWidth},${svgHeight - 38}
            l-6,-6
            v-24
            l6,-6
            Z 
            `;
            svgRB.setAttribute("d", svgRBD);
        }
    }
};
</script>
<style scoped>
</style>>
