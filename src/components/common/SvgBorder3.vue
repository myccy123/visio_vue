<template>
    <div style="width:100%;height:100%;" ref="svgBorderWrap" @mouseover="handleOver" @mouseout="handleOut">
        <svg 
			ref="svgEl"
			width="100%"
			height="100%" 
			xmlns="http://www.w3.org/2000/svg"
        	xmlns:xlink="http://www.w3.org/1999/xlink">
			
			<!-- 渐变背景色 -->
        	<radialGradient id="a" cx="50%" cy="50%"
        		gradientTransform="matrix(-.62431276 .59712637 -.46474465 -.80214718 1.044529 .60251)" r="80.088076%">
        		<stop offset="0" :stop-color="bgColor" stop-opacity="0.6" />
        		<stop offset=".52305507" :stop-color="bgColor" stop-opacity="0.9" />
        		<stop offset="1" :stop-color="bgColor" stop-opacity="1" />
        	</radialGradient>
			
			<!-- 四个角颜色 -->
        	<linearGradient id="b">
        		<stop offset="0" :stop-color="borderColor" />
        		<stop offset="1" :stop-color="borderColor" />
        	</linearGradient>
			
			<!-- 左上角 -->
        	<linearGradient id="c" x1="34.509881%" x2="0%" xlink:href="#b" y1="50%" y2="66.278547%" />
			
			<!-- 右上角 -->
        	<linearGradient id="d" x1="60.217677%" x2="45.875387%" xlink:href="#b" y1="30.623437%" y2="100%" />
        	
			<!-- 左下角 -->
			<linearGradient id="e" x1="59.876543%" x2="46.013094%" xlink:href="#b" y1="30.623437%" y2="100%" />
        	
			<!-- 右下角 -->
			<linearGradient id="f" x1="7.710386%" x2="29.81629%" xlink:href="#b" y1="36.911844%" y2="63.088156%" />
        	
			<!-- 路径绘制 -->
			<g fill="none" fill-rule="evenodd">
				<!-- 边框 -->
        		<path ref="outLine" d="m211.5 .5 v164 h-211 v-164 z" fill="url(#a)" :stroke="borderColor" />
        		<g fill-rule="nonzero">
					<!-- 左上角 -->
        			<path d="m70 0v1h-38.5v2h-28.5v28.5h-2v17h-1v-48.5zm4.6 0v1h-2.6v-1zm5.2 0v1h-2.6v-1zm5.2 0v1h-2.6v-1z"
        				fill="url(#c)" />
						
					<!-- 右上角 -->
        			<path ref="svgRT" d="m212 73h-1v-42h-2.02648v-27.9934922h-29.97352v-3.0065078h33z" fill="url(#d)" />
        			
					<!-- 左下角 -->
					<path ref="svgLB" d="m0 93h32v2.9946651h-29.001l.001 27.9502069-2-.000872v41.056h-1z" fill="url(#e)"
        				transform="matrix(1 0 0 -1 0 258)" />
        			
					<!-- 右下角 -->
					<path ref="svgRB"
        				d="m158.370759 121-.000759.034 37.652464.000387v1l-37.651464-.000387.003086 1.961309-29.382649.031394v27.892232l-1.991437-.000935v13.082h-1v-43.963948zm42.97755.034387v1h-2.662922v-1zm5.325846 0v1h-2.662923v-1zm5.325845 0v1h-2.662923v-1z"
        				fill="url(#f)" transform="matrix(-1 0 0 -1 338 286)" />
        		</g>
        	</g> 
        </svg>
    </div>
</template>
<script>
import ResizeObserver from "resize-observer-polyfill";
let observer = null;
export default {
    name: "SvgBorder",
    props:{
        animationMode:{
            type:String,
            default:'auto'
        },
        svgKey:{
            type:String
        },
        bgColor: {
            type: String,
            default: 'transparent',
        },
        borderColor: {
            type: String,
            default: '#00c0FF'
        },
    },
    data() {
        return {
            animationClass:'border-animation'
        }
    },
    mounted() {
        if(this.animationMode === 'hover'){
            this.animationClass = '';
        }
        this.$nextTick(() => {
            this.drawSvg();
            observer = new ResizeObserver(entries => {
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
			
			//容器大小
            this.$refs.svgEl.setAttribute(
                "viewBox",
                `0 0 ${svgWidth} ${svgHeight}`
            );
			
			//边框
			let outLineSvg = this.$refs.outLine
			let outLineSvgD = `
			m${svgWidth} 0.5 
			v${svgHeight-1} 
			h-${svgWidth-0.5}
			v-${svgHeight-1} 
			z`;
			outLineSvg.setAttribute("d", outLineSvgD);

            //右上角
            let svgRT = this.$refs.svgRT;
            let svgRTD = `
            m${svgWidth} 73
			h-1
			v-42
			h-2.02648
			v-27.9934922
			h-29.97352
			v-3.0065078
			h33
			z
            `;
            svgRT.setAttribute("d", svgRTD);
			
			//左下角
			let svgLB = this.$refs.svgLB;
			let svgLBD = `
			m0 ${svgHeight-73+1}
			h32
			v2.9946651
			h-29.001
			l.001 27.9502069-2-.000872
			v41.056
			h-1
			z
			`;
			let svgLBT = `
			matrix(1 0 0 -1 0 ${2*svgHeight-73+2})
			`;
			svgLB.setAttribute("d", svgLBD);	
			svgLB.setAttribute("transform", svgLBT);
			
			//右下角：212,165
			let svgRB = this.$refs.svgRB;
			let svgRBD = `
			m${svgWidth-53.629241} ${svgHeight-44}
			l-.000759 .034 
			l37.652464 .000387
			v1
			l-37.651464-.000387.003086 1.961309-29.382649.031394
			v27.892232
			l-1.991437-.000935
			v13.082
			h-1
			v-43.963948
			z
			m42.97755.034387
			v1
			h-2.662922
			v-1
			z
			m5.325846 0
			v1
			h-2.662923
			v-1
			z
			m5.325845 0
			v1
			h-2.662923
			v-1
			z
			`;
			let svgRBT = `
			matrix(-1 0 0 -1 ${2*svgWidth-86} ${2*svgHeight-44})
			`;
			svgRB.setAttribute("d", svgRBD);	
			svgRB.setAttribute("transform", svgRBT);
        }
    },
    destroyed() {
        observer.disconnect()
    }
};
</script>
<style>
.border-animation {
    stroke-dasharray: 50%;
    stroke-dashoffset: 0;
    animation: borderAnimation 3s linear infinite;
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
