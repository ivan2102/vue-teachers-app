import { createStore } from 'vuex';
import authModule from './modules/auth';
import teachersModule from './modules/teachers';
import requestsModule from './modules/requests';

const store = createStore({

    modules: {
        teachers: teachersModule,
        requests: requestsModule,
        auth: authModule
    },

});

export default store;