<template>
    <div
        style="position:relative;width:100%;height:80px;font-size:40px;line-height:80px;color:#93EBF8;font-weight:bold;text-align:center"
        ref="svgTitleWrap"
    >
        <svg
            ref="svgEl"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
        >
            <defs>
                <linearGradient id="stroke_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="4%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="16%" stop-color="rgba(21,134,238,1)" />
                    <stop offset="50%" stop-color="rgba(21,134,238,1)" />
                    <stop offset="84%" stop-color="rgba(21,134,238,1)" />
                    <stop offset="96%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="100%" stop-color="rgba(21,134,238,0)" />
                </linearGradient>

                <linearGradient id="fill_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="4%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="36%" stop-color="rgba(21,134,238,0.7)" />
                    <stop offset="50%" stop-color="rgba(21,134,238,1)" />
                    <stop offset="64%" stop-color="rgba(21,134,238,0.7)" />
                    <stop offset="96%" stop-color="rgba(21,134,238,0)" />
                    <stop offset="100%" stop-color="rgba(21,134,238,0)" />
                </linearGradient>
                <filter id="fill_filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                    
                </filter>
                <linearGradient id="animation_left_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(0,192,238,0)" />
                    <stop offset="8%" stop-color="rgba(0,192,238,0)" />
                    <stop offset="32%" stop-color="rgba(0,192,238,1)" />
                    <stop offset="100%" stop-color="rgba(0,192,238,1)" />
                </linearGradient>
                <linearGradient id="animation_right_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(0,192,255,1)" />
                    <stop offset="68%" stop-color="rgba(0,192,255,1)" />
                    <stop offset="92%" stop-color="rgba(0,192,255,0)" />
                    <stop offset="100%" stop-color="rgba(0,192,255,0)" />
                </linearGradient>
            </defs>
            <g id="layer101">
                <path
                    fill="url(#fill_gradient)"
                    filter="url(#fill_filter)"
                    stroke="none"
                    ref="svgInnerShape"
                />
                <path
                    stroke="url(#stroke_gradient)"
                    stroke-width="2px"
                    fill="none"
                    ref="svgOutline"
                />
                <path stroke="#00c0ff" stroke-width="4px" fill="none" ref="svgLigthLine" />
                <path
                    class="path-animation"
                    stroke="url(#animation_left_gradient)"
                    stroke-width="2px"
                    fill="none"
                    ref="svgAnimationLeft"
                />
                <path
                    class="path-animation"
                    stroke="url(#animation_right_gradient)"
                    stroke-width="2px"
                    fill="none"
                    ref="svgAnimationRight"
                />
                <path stroke="#00c0ff" stroke-width="4px" fill="none" ref="svgLigthLine" />
            </g>
        </svg>
        <span ref="titleTextWrap" style="position:absolute;left:50%;transform:translateX(-50%)">
            <slot></slot>
        </span>
    </div>
</template>
<script>
import ResizeObserver from "resize-observer-polyfill";
export default {
    name: "SvgTitle",
    data() {
        return {
            svgColor: "#90a3cf"
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
            observer.observe(this.$refs.svgTitleWrap);
        });
    },
    methods: {
        drawSvg() {
            let svgWrap = this.$refs.svgTitleWrap;
            if (!svgWrap) return;
            let svgWidth = svgWrap.offsetWidth;
            let svgHeight = svgWrap.offsetHeight - 4;
            let titleSize = 40;

            let corner = svgHeight / 2;
            let lightWidth = titleSize * 4;
            let titleTextWrap = this.$refs.titleTextWrap;
            let titleWidth = titleTextWrap.offsetWidth + 20;
            if (titleWidth <= lightWidth) {
                titleWidth = lightWidth + 80;
                lightWidth = titleSize * 3;
            }
            console.log(svgWidth, svgHeight);
            this.$refs.svgEl.setAttribute(
                "viewBox",
                `0 0 ${svgWidth} ${svgHeight}`
            );

            //边框
            let outline = this.$refs.svgOutline;
            let outlineD = `
            M0,${svgHeight / 2}
            H${(svgWidth - titleWidth - 2 * corner) / 2}
            l${corner},${corner}
            l${titleWidth},0
            l${corner},${-corner}
            H${svgWidth}
            `;
            outline.setAttribute("d", outlineD);

            //中间高亮线
            let lightLine = this.$refs.svgLigthLine;
            let lightLineD = `
            M${(svgWidth - lightWidth) / 2},${svgHeight}
            l${lightWidth},0
            `;
            lightLine.setAttribute("d", lightLineD);

            //背景
            let innerShape = this.$refs.svgInnerShape;
            let innerShapeD = `
            M${(svgWidth - titleWidth - 4 * corner) / 2},0
            l${2 * corner},${2 * corner}
            h${titleWidth}
            l${2 * corner},${-2 * corner}
            Z
            `;
            innerShape.setAttribute("d", innerShapeD);

            //左动效
            let animationLeft = this.$refs.svgAnimationLeft;
            let animationLeftD = `
            M0,${svgHeight / 2}
            H${(svgWidth - titleWidth - 2 * corner) / 2}
            l${corner},${corner}
            l${titleWidth / 2},0
            `;
            animationLeft.setAttribute("d", animationLeftD);

            //右动效
            let animationRight = this.$refs.svgAnimationRight;
            let animationRightD = `
            M${svgWidth},${svgHeight / 2}
            h${-(svgWidth - titleWidth - 2 * corner) / 2}
            l${-corner},${corner}
            l${-titleWidth / 2},0
            `;
            animationRight.setAttribute("d", animationRightD);
        }
    }
};
</script>

<style>
.path-animation {
    stroke-dasharray: 50%;
    stroke-dashoffset: 0;
    animation: pathAnimation 2s linear infinite;
}
@keyframes pathAnimation {
    from {
        stroke-dashoffset: 0%;
    }
    to {
        stroke-dashoffset: 100%;
    }
}
</style>