<template>
    <div>
        <common-nav></common-nav>
        <source-list></source-list>
    </div>
</template>

<script>
    import commonNav from '../common/nav'
    import sourceList from './source_list'

    export default {
        name: "Source",
        components: {commonNav, sourceList},
    }
</script>

<style scoped>

</style>