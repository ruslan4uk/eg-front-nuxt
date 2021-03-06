export default {
    namespaced: true,

    state() {
        return {
            busy: false,
            loggedIn: false,
            strategy: 'local',
            user: false,
            baseImgPath: ''
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
        },
        loggedIn(state) {
            return state.loggedIn
        },
        unreadMessage (state) {
            return state.user.unreadMessage
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
        },
        UPDATE_UNREAD (state, payload) {
          state.user.unreadMessage = state.user.unreadMessage + payload
        },
        DELETE_UNREAD (state, payload) {
          state.user.unreadMessage = payload
        }
    },

    actions: {

    }
}
