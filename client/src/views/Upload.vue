<template>
    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
</template>

<script>
import Vue from 'vue'
import vue2Dropzone from 'vue2-dropzone'

export default Vue.extend({
    components: {
        vueDropzone: vue2Dropzone
    },
    data: function () {
        return {
            dropzoneOptions: {
                url: 'http://localhost:8080/v1/clients/profile',
                thumbnailWidth: 150,
                maxFilesize: 100,
            }
        }
    }
})
</script>
