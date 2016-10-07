<template lang="html">
    <h1>{{ count }}</h1>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'todoCount',
            'count'
        ])
    },
}
</script>
