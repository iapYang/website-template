import 'babel-polyfill';

import EntranceListener from './plugin/entranceListener';

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

new EntranceListener({
    el: document.getElementById('dv2'),
    offset: 500,
    enter: function(){
        this.classList.add('active');
    },
    leave: function(){
        this.classList.remove('active');
    }
});

new EntranceListener({
    el: document.getElementById('dv4'),
    offset: 500,
    enter: function(){
        this.classList.add('active');
    },
    leave: function(){
        this.classList.remove('active');
    }
});
