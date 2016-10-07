<template lang="html">
    <h1>{{ todoCount }}</h1>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'todoCount',
        ])
    },
}
</script>
