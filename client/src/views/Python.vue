<template>
    <div>
        {{result}}
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
    data() {
        return {
            result : '',
        }
    },

    mounted() {
        axios.get('/v1/python').then((result) => {
            this.result = result.data;
        });
    }

})
</script>
