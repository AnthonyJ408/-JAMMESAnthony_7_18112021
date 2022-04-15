import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './authModule';
import { message } from './messageModule';
import { user } from './userModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    message,
    user,
  },
});
