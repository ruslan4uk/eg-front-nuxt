export default {
    namespaced: true,

    state() {
        return {
            busy: false,
            loggedIn: false,
            strategy: 'local',
            user: false,
        }
    },

    getters: {
        authenticated(state) {
            return state.loggedIn;
        },
        user(state) {
            return state.user;
        }
    },

    mutations: {
        SET_LANGUAGES(state, payload) {
            state.user.user_language.push(payload)
        },
        DELETE_LANGUAGES(state, payload) {
            state.user.user_language.splice(state.user.user_language.indexOf(payload), 1)
        },

        SET_LOCATION(state, payload) {
            state.user.user_city_ids.push(payload)
        },
        DELETE_LOCATION(state, payload) {
            this._vm.$delete(state.user.user_city_ids, state.user.user_city_ids.indexOf(payload))
            //state.user.user_city_ids.splice(state.user.user_city_ids.indexOf(payload), 1)
            //state.user.user_city.splice(state.user.user_city.findIndex(x => x.id === payload), 1)
        }
    },

    actions: {
        
    }
}