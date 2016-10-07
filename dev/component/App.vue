<template lang="html">
    <Message></Message>
</template>

<script>
import store from '../vuex/store';

import Message from './Message.vue';

export default {
    store,
    components: {
        Message
    }
}
</script>
