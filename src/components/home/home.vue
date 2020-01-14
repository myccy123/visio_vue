<template>
    <div>
        <common-nav></common-nav>
        <transition name="el-fade-in">
            <imax v-if="page === 0"></imax>
            <page1 v-else-if="page === 1"></page1>
            <page2 v-else-if="page === 2"></page2>
            <page3 v-else-if="page === 3"></page3>
        </transition>
    </div>
</template>

<script>
    import CommonNav from "../common/nav";
    import imax from "./imax";
    import page1 from "./page1";
    import page2 from "./page2";
    import page3 from "./page3";

    export default {
        name: "home",
        components: {imax, CommonNav, page1, page2, page3},
        data() {
            return {
                page: 0,
                canSwitch: false,
            }
        },
        mounted() {
            window.addEventListener('mousewheel', this.handleScroll, true);
            this.$bus.$on('switchPage', (can)=>{
                this.canSwitch = can
            })
        },
        methods: {
            handleScroll(e) {
                let total = document.body.scrollHeight;
                let scrollTop = document.documentElement.scrollTop;
                let currTop = document.documentElement.clientHeight+
                    document.documentElement.scrollTop;
                if (currTop > total && e.wheelDelta < 0) {
                    this.next()
                } else if(scrollTop === 0 && e.wheelDelta > 0) {
                    this.previous()
                }
            },
            previous(){
                if(this.page > 0) {
                    this.page--;
                }
            },
            next(){
                if(this.page < 3) {
                    this.page++;
                }
            }
        },
        destroyed() {
            window.removeEventListener('mousewheel', this.handleScroll)
            this.$bus.$off('switchPage')
        }
    }
</script>

<style scoped>

</style>