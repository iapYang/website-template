<template lang="html">
    <div class="app-container">
        <img src="../image/stuff.svg" alt="">
        <img src="../image/1.jpg" alt="">
        <div class="bg"></div>

        <message></message>
        <controller></controller>

        <router-view></router-view>
    </div>
</template>

<script>
import Message from './layout/Message.vue';
import Controller from './layout/Controller.vue';

export default {
    components: {
        Message,
        Controller,
    },
};
</script>

<style lang="scss">
@import "../style/reset";
@import "../style/mixin";

@include font-face("Lato-Regular");

:root{
    --color1: red;
    --color2: blue;
}

.bg {
    width: 40px;
    height: 40px;
    background-image: url('../image/stuff.svg');
}

@media (max-width: 1000px) {
    :root{
        --color1: green;
    }
}

.app-container{
    background-color: var(--color1);

    &:hover{
        background-color: var(--color2);
    }

    img{
        width: 200px;
    }
}


</style>
