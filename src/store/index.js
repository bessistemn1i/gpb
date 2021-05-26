import Vue from 'vue';
import Vuex from 'vuex';
import messages from './modules/messages';
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        messages
    }
});