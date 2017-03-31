<template lang="html">
    <div class="app-container">
        <img src="../image/stuff.svg" alt="">
        <img src="../image/1.jpg" alt="">
        <div class="bg"></div>

        <message></message>
        <controller></controller>

        <router-view></router-view>
        <loading spinner="circles"></loading>
        <div class="video-container">
            <vue-video :options="videoOptions"></vue-video>
        </div>
    </div>
</template>

<script>
import Message from './layout/Message.vue';
import Controller from './layout/Controller.vue';

import Loading from 'vue-simple-loading';
import VueVideo from 'vue-video-module';

export default {
    data() {
        return {
            videoOptions: {
                src: 'http://vjs.zencdn.net/v/oceans.mp4',
                fullscreen: true,
            },
        };
    },
    components: {
        Message,
        Controller,
        Loading,
        VueVideo,
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

    .video-container {
        max-width: 600px;
    }
}


</style>
