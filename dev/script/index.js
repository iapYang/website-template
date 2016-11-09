import 'babel-polyfill';

import '../style/index.scss';



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

console.log('=====111=====');
