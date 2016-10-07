let Vue = require('vue');
let Vuex = require('vuex');

import * as state from './state';
import * as getters from './getters';

Vue.use(Vuex);

console.log('==========', state);

export default new Vuex.Store({
    state,
    getters
});
