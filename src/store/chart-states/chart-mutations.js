export default {
    setBaseConfig: (state,baseConfig)=>{
        state.baseConfig = baseConfig;
    },
    setTableConfig: (state,tableConfig)=>{
        state.tableConfig = tableConfig;
    },
    setChartConfig: (state,chartConfig)=>{
        state.chartConfig = chartConfig;
    },
    setMoreConfig: (state,moreConfig)=>{
        state.moreConfig = moreConfig;
    },
    setFilter: (state,filter)=>{
        state.filter = filter;
    },
    setDiy: (state,diy)=>{
        Object.assign(state.diy,diy)
    },
    setId: (state,id)=>{
        state.id = id;
    },
    setSrcid: (state,srcid)=>{
        state.srcid = srcid;
    },
    setUserid: (state,userid)=>{
        state.userid = userid;
    },
    setChartCate: (state,chartCate)=>{
        state.chartCate = chartCate;
    },
    setChartType: (state,chartType)=>{
        state.chartType = chartType;
    },
    // setIsSave: (state,isSave)=>{
    //     state.isSave = isSave;
    // }
}