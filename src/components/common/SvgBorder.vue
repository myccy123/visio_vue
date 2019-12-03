<template>
    <div style="width:100%;height:100%;" ref="svgBorderWrap" @mouseover="handleOver" @mouseout="handleOut">
        <svg
            ref="svgEl"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
        >
            <filter
                :id="svgKey"
                x="0"
                y="0"
                width="100%"
                height="100%"
                filterUnits="userSpaceOnUse"
            >
                <feGaussianBlur result="blur" stdDeviation="5.333" in="SourceAlpha" />
                <feFlood result="flood" flood-color="#1c92ff" flood-opacity="0.38" />
                <feComposite result="composite-2" operator="out" in2="blur" />
                <feComposite result="composite" operator="in" in2="SourceAlpha" />
                <feBlend result="blend" mode="screen" in2="SourceGraphic" />
            </filter>

            <g id="layer101" :filter="'url(#'+svgKey+')'" stroke="none" fill='#222974'>
                <path
                    ref="svgOutline"
                    :style="{strokeWidth: '1px',stroke: svgColor }"
                />
                <!-- 左上 -->
                <path ref="svgLT" d :style="{fill:svgColor}" />
                <path ref="svgRT" d :style="{fill:svgColor}" />
                <path ref="svgLB" d :style="{fill:svgColor}" />
                <path ref="svgRB" d :style="{fill:svgColor}" />

                <path
                    ref="svgAnimationline"
                    :class='animationClass'
                    :style="{strokeWidth: '1px',stroke: animationColor }"
                />
            </g>
            
        </svg>
    </div>
</template>
<script>
import ResizeObserver from "resize-observer-polyfill";
export default {
    name: "SvgBorder",
    props:{
        animationMode:{
            type:String,
            default:'auto'
        },
        svgKey:{
            type:String
        }
    },
    data() {
        return {
            svgColor: "rgba(21,134,238,1)",
            animationColor:'#00c0FF',
            animationClass:'border-animation'
        }
    },
    mounted() {
        if(this.animationMode == 'hover'){
            this.animationClass = '';
        }
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
        handleOver(){
            if(this.animationMode=='auto') return;
            this.animationClass = 'border-animation';
        },
        handleOut(){
            if(this.animationMode=='auto') return;
            this.animationClass = '';
        },
        drawSvg() {
            let svgWrap = this.$refs.svgBorderWrap;
            if (!svgWrap) return;
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
            M${corner},1
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

            //动效
            let animationLine = this.$refs.svgAnimationline;
            let animationLineD = `
            M${corner},1
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
            // if(this.animationMode == 'auto'){
                animationLine.setAttribute("d", animationLineD);
            // }
            
        }
    }
};
</script>
<style>
.border-animation {
    stroke-dasharray: 50%;
    stroke-dashoffset: 0;
    animation: borderAnimation 4s linear infinite;
}
@keyframes borderAnimation {
    from {
        stroke-dashoffset: 0%;
    }
    to {
        stroke-dashoffset: 100%;
    }
}
</style>>
