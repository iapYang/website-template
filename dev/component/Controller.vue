<template lang="html">
    <div class="controller">
        <input type="text" v-model="id">
        <input type="text" v-model="text">
        <input type="button" value="add" @click="clickHandler">
    </div>
</template>

<script>


export default {
    data() {
        return {
            id: '',
            text: ''
        }
    },
    computed: {},
    ready() {},
    attached() {},
    methods: {
        clickHandler(){
            this.$store.dispatch('addTodo', {
                id: this.id,
                text: this.text
            });
        }
    },
    components: {}
}
</script>
