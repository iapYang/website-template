let Vue = require('vue');
let Vuex = require('vuex');

import Counter from '../component/Counter.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todos: [
            {
                id: 1,
                text: '111'
            },
            {
                id: 2,
                text: '222'
            },
            {
                id: 3,
                text: '333'
            }
        ]
    },
    getters: {
        count: state => state.todos.length
    },
    mutations: {
        increment: state => ++state.count,
        decrement: state => --state.count
    }
});

const app = new Vue({
    el: '#app',
    store,
    components: {
        Counter
    }
    // computed: {
    //     count(){
    //         return store.state.count;
    //     }
    // },
    // methods: {
    //     increment(){
    //         store.commit('increment');
    //     },
    //     decrement(){
    //         store.commit('decrement');
    //     }
    // },

});
