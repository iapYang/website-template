<template lang="html">
    <div class="app-container">
        <img src="../image/stuff.svg" alt="">

        <message></message>
        <controller></controller>

        <router-view></router-view>
        <loading spinner="circles"></loading>
    </div>
</template>

<script>
import Message from './layout/Message.vue';
import Controller from './layout/Controller.vue';

import Loading from 'vue-simple-loading';

export default {
    components: {
        Message,
        Controller,
        Loading,
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
