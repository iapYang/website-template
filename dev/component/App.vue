<template lang="html">
    <div class="app-container">
        <message></message>
        <controller></controller>
    </div>
</template>

<script>
import Message from './Message.vue';
import Controller from './Controller.vue';

export default {
    components: {
        Message,
        Controller,
    }
}
</script>

<style lang="scss">
.app-container{
    font-family: "Lato-Regular";
    transform: translateX(50px);
}
</style>
