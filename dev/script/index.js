import 'babel-polyfill';



let Vue = require('vue');

import store from '../store/index';
import App from '../component/App.vue';



const app = new Vue({
    el: '#app',
    store,
    components: {
        App
    }
});
