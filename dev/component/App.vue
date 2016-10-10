<template lang="html">
    <div class="app-container">
        <message></message>
        <controller></controller>
    </div>
</template>

<script>
import store from '../vuex/store';

import Message from './Message.vue';
import Controller from './Controller.vue';

export default {
    store,
    components: {
        Message,
        Controller,
    }
}
</script>
