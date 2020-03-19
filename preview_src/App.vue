<template>
    <div id="app">
        <component :is="componentName"></component>
    </div>
</template>
<script>
import {getParam} from './utils/vision'
import PreviewTemplate from './views/PreviewTemplate.vue';
import PreviewChart from './views/PreviewChart.vue';
const componentNameMap = {
    chart:'PreviewChart',
    template:'PreviewTemplate'
}
export default {
    components:{PreviewChart,PreviewTemplate},
    data(){
        return{
            componentName:'',
        }    
    },
    mounted(){
        this.componentName = componentNameMap[getParam('type')];
    },
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

* {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
    margin: 0px;
    padding: 0px;
}

ul {
    margin: 0px;
    padding: 0px;
}

::-webkit-scrollbar {
    width: 4px;
    height: 8px;
    position: fixed;
}
::-webkit-scrollbar-button {
    display: none;
}
::-webkit-scrollbar-thumb {
    background-color: hsla(220, 4%, 58%, 0.5);
    border-radius: 4px;
}
.anchorBL {
    display: none !important;
}
</style>