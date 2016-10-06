<template lang="html">
    <h1>{{ count }}</h1>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
      ...mapGetters([
          'count'
      ])
    //   count(){
    //       return this.$store.getters.count;
    //   }
  }
}
</script>
