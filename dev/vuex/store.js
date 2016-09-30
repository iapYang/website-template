let Vue = require('vue');
let Vuex = require('vuex');

import * as types from './mutation-types';

Vue.use(Vuex);

const state = {
    count: 0
};

const mutations = {
    [types.SETCOUNT](state, value){
        state.count = value;
    }
};

export default new Vuex.Store({
    state,
    mutations
});
