export default {
    namespaced: true,

    state() {
        return {
            busy: false,
            loggedIn: false,
            strategy: 'local',
            user: false,
            baseImgPath: 'http://localhost:8000/storage/'
        }
    },

    getters: {
        authenticated(state) {
            return state.loggedIn;
        },
        user(state) {
            return state.user;
        },
        baseImgPath(state) {
            return state.baseImgPath
        }
    },

    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },

        SET_LICENSE(state, payload) {
            state.user.user_license = payload
        },
        SET_AVATAR(state, payload) {            
            state.user.avatar = payload
            
            console.log(state.user.avatar);
        }
        // SET_LANGUAGES(state, payload) {
        //     state.user.user_language.push(payload)
        // },
        // DELETE_LANGUAGES(state, payload) {
        //     state.user.user_language.splice(state.user.user_language.indexOf(payload), 1)
        // },

        // SET_LOCATION(state, payload) {
        //     state.user.user_city_ids.push(payload)
        // },
        // DELETE_LOCATION(state, payload) {
        //     this._vm.$delete(state.user.user_city_ids, state.user.user_city_ids.indexOf(payload))
        // }
    },

    actions: {
        
    }
}