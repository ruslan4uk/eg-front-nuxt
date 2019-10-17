import Echo from 'laravel-echo'
import Cookie from 'js-cookie'

let token = Cookie.get('auth._token.local');

window.io = require('socket.io-client');

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: 'ws.' + window.location.hostname,
  auth: {headers: {Authorization: token}}
});

export default function({ $axios, store, app, redirect, query }) {
  window.Echo.private(`messenger.${store.state.auth.user.id}`)
    .listen('Messenger.DialogsEvent', ({message}) => {
      store.commit('auth/UPDATE_UNREAD', 1);
    })
}
