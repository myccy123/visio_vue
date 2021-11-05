<template>
    <div>
        <div id='switch_template'></div>
        <div class="tool-box">
            <div class="btn-box" @click="prevTemp"><img :src="options.ASSETS.left"></div>
            <div class="btn-box" @click="nextTemp"><img :src="options.ASSETS.right"></div>
        </div>
    </div>
</template>
<script>
import {genTemplate, getParam, disposeAll} from '../utils/vision';
import options from "../../src/config/options";

export default {
    name: 'SwitchableTemplate',
    data() {
        return {
            tempList: [],
            currId: 0,
            options: options,
        }
    },
    mounted() {
        let id = getParam('id');
        let tempMap = getTempList();
        this.tempList = tempMap[parseInt(id)]
        this.gen()
    },
    methods: {
        gen() {
            disposeAll()
            document.getElementById('switch_template').innerHTML = ''
            genTemplate('switch_template', this.tempList[this.currId])
        },
        prevTemp() {
            this.currId--
            if (this.currId < 0) {
                this.currId = this.tempList.length - 1
            }
            this.gen()
        },
        nextTemp() {
            this.currId++
            if (this.currId >= this.tempList.length) {
                this.currId = 0
            }
            this.gen()
        },
    },
    destroyed() {
        disposeAll()
    }
}
</script>
<style scoped>
.tool-box {
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 9999;
}

.btn-box {
    height: 50px;
    width: 50px;
    cursor: pointer;
}

.btn-box img {
    height: 100%;
    width: 100%;
}

</style>