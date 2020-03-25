export default{
    methods:{
        switchLegend(v){
            if (v) {
                this.chartConfig.y.splice(1, 999);
                this.chartConfig.datas.splice(1, 999);
            }
            this.genVision();
        },
        delY(idx) {
            this.chartConfig.y.splice(idx, 1);
            if (this.chartConfig.y.length === 0) {
                this.addY();
            }
            this.genVision();
        },
        addY() {
            this.chartConfig.y.push({ yAxis: "", sum: "sum" });
        },
        addData() {
            this.chartConfig.datas.push({ data: "", sum: "sum" });
        },
        delData(idx) {
            this.chartConfig.datas.splice(idx, 1);
            if (this.chartConfig.datas.length === 0) {
                this.addData();
            }
            this.genVision();
        },
    }    
}