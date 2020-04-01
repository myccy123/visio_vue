<template>
    <div style="width:100%;height:100%;" ref="svgBorderWrap">
        <svg
                width="100%"
                height="100%"
                ref="svgEl"
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter :id="svgKey" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
                    <feGaussianBlur result="blur" stdDeviation="5.333" in="SourceAlpha"/>
                    <feFlood result="flood" class='filter-animation' :flood-color="borderColor" flood-opacity="0.38"/>
                    <feComposite result="composite-2" operator="out" in2="blur"/>
                    <feComposite result="composite" operator="in" in2="SourceAlpha"/>
                    <feBlend result="blend" mode="screen" in2="SourceGraphic"/>
                </filter>
                <linearGradient id="animation_line_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(0,192,255,1)"/>
                    <stop offset="68%" stop-color="rgba(0,192,255,1)"/>
                    <stop offset="92%" stop-color="rgba(0,192,255,0)"/>
                    <stop offset="100%" stop-color="rgba(0,192,255,0)"/>
                </linearGradient>
            </defs>
            <g stroke='none'>
                <path ref='svgOutline' :fill='bgColor' :stroke='borderColor' stroke-width='1px'
                      :filter='`url(#${svgKey})`'></path>
                <g>
                    <path ref='svgLT1' stroke='none' :fill='borderColor'/>
                    <path ref='svgLT2' stroke='none' :fill='borderColor'/>
                    <path ref='svgLT3' stroke='none' :fill='borderColor'/>
                    <path ref='svgLT4' stroke='none' :fill='borderColor'/>
                    <path ref='svgLT5' stroke='none' :fill='borderColor'/>
                </g>
                <g>
                    <path ref='svgRB1' stroke='none' :fill='borderColor'/>
                    <path ref='svgRB2' stroke='none' :fill='borderColor'/>
                    <path ref='svgRB3' stroke='none' :fill='borderColor'/>
                    <path ref='svgRB4' stroke='none' :fill='borderColor'/>
                    <path ref='svgRB5' stroke='none' :fill='borderColor'/>
                </g>
                <path ref='svgTopLine' class='sb2-animation' :stroke="borderColor" fill='none' stroke-width='2'/>
                <path ref='svgBottomLine' class='sb2-animation' :stroke="borderColor" fill='none' stroke-width='2'/>
            </g>
        </svg>
    </div>
</template>
<script>
    import ResizeObserver from "resize-observer-polyfill";
    let observer = null;
    export default {
        name: "SvgBorder2",
        props: {
            bgColor: {
                type: String,
                default: 'transparent'
            },
            svgKey: {
                type: String,
                default: 'filter'
            },
            borderColor: {
                type: String,
                default: '#00c0ff'
            }
        },
        data() {
            return {}
        },
        mounted() {
            this.$nextTick(() => {
                this.createSvg();
                observer = new ResizeObserver(entries => {
                    entries.forEach(entry => {
                        this.createSvg();
                    });
                });
                observer.observe(this.$refs.svgBorderWrap);
            })

        },
        methods: {
            createSvg() {
                let svgWrap = this.$refs.svgBorderWrap;
                let svgWidth = svgWrap.offsetWidth;
                let svgHeight = svgWrap.offsetHeight;
                let svgEl = this.$refs.svgEl;
                svgEl.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
                //矩形起始坐标与结束坐标
                let startX = 2, startY = 2, endX = svgWidth - startX, endY = svgHeight - startY, w = endX - startX,
                    h = endY - startY;
                //四个角的倒角
                let corner = 10;
                //边框
                let outline = this.$refs.svgOutline;
                let outlineD = `
            M${startX + corner},${startY}
            H${endX - corner}
            l${corner},${corner}
            v${(h - 2 * corner) / 3}
            l${-corner + 4},${corner - 4}
            v${(h - 2 * corner) / 3 - 2 * corner + 8}
            l${corner - 4},${corner - 4}
            v${(h - 2 * corner) / 3}
            l${-corner},${corner}
            H${startX + corner}
            l${-corner},${-corner}
            v${-(h - 2 * corner) / 3}
            l${corner - 4},${-corner + 4}
            v${-(h - 2 * corner) / 3 + 2 * corner - 8}
            l${-corner + 4},${-corner + 4}
            v${-(h - 2 * corner) / 3}
            Z
            `
                outline.setAttribute('d', outlineD);

                //左上
                let cornerWidth = 4;
                this.$refs.svgLT1.setAttribute('d', `
            M${corner - 4},0
            h${3 * corner}
            l${cornerWidth},${cornerWidth}
            h${-3 * corner}
            l${-corner + 4},${corner - 4}
            v${3 * corner}
            l${-cornerWidth},${-cornerWidth}
            v${-3 * corner}
            Z
            `)
                this.$refs.svgLT2.setAttribute('d', `
            M${4 * corner},0
            h${2 * cornerWidth}
            l${cornerWidth},${cornerWidth}
            h${-2 * cornerWidth}
            Z
            `)
                this.$refs.svgLT3.setAttribute('d', `
            M${4 * corner + 3 * cornerWidth},0
            h${cornerWidth}
            l${cornerWidth},${cornerWidth}
            h${-cornerWidth}
            Z
            `)
                this.$refs.svgLT4.setAttribute('d', `
            M${4 * corner + 5 * cornerWidth},0
            h${cornerWidth}
            l${cornerWidth},${cornerWidth}
            h${-cornerWidth}
            Z
            `)
                this.$refs.svgLT5.setAttribute('d', `
            M${4 * corner + 7 * cornerWidth},0
            h${cornerWidth}
            l${cornerWidth},${cornerWidth}
            h${-cornerWidth}
            Z
            `)

                //右下
                this.$refs.svgRB1.setAttribute('d', `
            M${svgWidth - corner + 4},${svgHeight}
            h${-3 * corner}
            l${-cornerWidth},${-cornerWidth}
            h${3 * corner}
            l${corner - 4},${-corner + 4}
            v${-3 * corner}
            l${cornerWidth},${cornerWidth}
            v${3 * corner}
            Z
            `)
                this.$refs.svgRB2.setAttribute('d', `
            M${svgWidth - 4 * corner},${svgHeight}
            h${-2 * cornerWidth}
            l${-cornerWidth},${-cornerWidth}
            h${2 * cornerWidth}
            Z
            `)
                this.$refs.svgRB3.setAttribute('d', `
            M${svgWidth - 4 * corner - 3 * cornerWidth},${svgHeight}
            h${-cornerWidth}
            l${-cornerWidth},${-cornerWidth}
            h${cornerWidth}
            Z
            `)
                this.$refs.svgRB4.setAttribute('d', `
            M${svgWidth - 4 * corner - 5 * cornerWidth},${svgHeight}
            h${-cornerWidth}
            l${-cornerWidth},${-cornerWidth}
            h${cornerWidth}
            Z
            `)
                this.$refs.svgRB5.setAttribute('d', `
            M${svgWidth - 4 * corner - 7 * cornerWidth},${svgHeight}
            h${-cornerWidth}
            l${-cornerWidth},${-cornerWidth}
            h${cornerWidth}
            Z
            `)

                //动画线
                this.$refs.svgTopLine.setAttribute('d', `
            M${startX + corner},${startY}
            H${endX - corner}
            l${corner},${corner}
            v${(h - 2 * corner) / 3}
            l${-corner + 4},${corner - 4}
            v${(h - 2 * corner) / 3 - 2 * corner + 8}
            l${corner - 4},${corner - 4}
            v${(h - 2 * corner) / 3}`)

                this.$refs.svgBottomLine.setAttribute('d', `
            M${svgWidth - startX - corner},${svgHeight - startY}
            H${corner + startX}
            l${-corner},${-corner}
            v${-(h - 2 * corner) / 3}
            l${corner - 4},${-corner + 4}
            v${-(h - 2 * corner) / 3 + 2 * corner - 8}
            l${-corner + 4},${-corner + 4}
            v${-(h - 2 * corner) / 3}`)
            }
        },
        destroyed() {
            observer.disconnect()
        }

    };
</script>
<style scoped>
    .sb2-animation {
        stroke-dasharray: 200%;
        animation: sb2Animation 4s linear infinite;
    }

    @keyframes sb2Animation {
        from {
            stroke-dashoffset: 0;
        }
        to {
            stroke-dashoffset: 400%;
        }
    }

    .filter-animation {
        animation: filterAnimation 2S linear infinite alternate;
    }

    @keyframes filterAnimation {
        from {
            flood-opacity: 0.2;
        }
        to {
            flood-opacity: 0.8;
        }
    }
</style>
