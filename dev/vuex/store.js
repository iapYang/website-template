let Vue = require('vue');
let Vuex = require('vuex');

import state from './state';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
});
