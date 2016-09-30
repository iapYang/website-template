<template lang="html">
    <h1>{{ count }}</h1>
</template>

<script>
import { count } from '../vuex/getters';

export default {
    vuex: {
        getters: {
            count
        }
    }
}
</script>
