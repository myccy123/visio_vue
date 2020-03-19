<template>
    <div id='preview_template'>
    </div>
</template>
<script>
import {genTemplate,getParam,disposeAll} from '../utils/vision';
export default {
    name:'PreviewTemplate',
    mounted(){
        let id = getParam('id');
        genTemplate('preview_template',id)
    },
    destroyed(){
        disposeAll()
    }
}
</script>