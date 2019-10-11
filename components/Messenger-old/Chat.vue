<template>
  <div class="row messenger">
    <div class="col-12 col-md-4 messenger__left px-0 messenger-scrollbar">

      <div class="messenger__loader" v-if="dialogsLoader">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>

      <div class="messenger__users">
        <div class="messenger__users-list">
          <perfect-scrollbar class="messenger__left-ps">
            <nuxtLink v-for="(item, index) in sortDialog" :key="index" :to="{name: 'trstprofile-messenger', query: {sel: item.dialog_uid}}">
              <div :class="'messenger__users-item d-flex align-items-center position-relative' + (($route.query.sel === item.dialog_uid) ? ' isActive' : '')">
                <div class="messenger__users-avatar mr-3">
                  <img :src="item.users.filter(x => x.id !== user.id)[0].avatar ? item.users.filter(x => x.id !== user.id)[0].avatar : '~assets/images/general/avatar-blank.jpg'" alt="">
                </div>
                <div class="messenger__users-right d-flex justify-content-between">
                  <div class="messenger__users-fio">{{ item.users.filter(x => x.id !== user.id)[0].name }}</div>
                </div>
                <div class="messenger__users-badge" v-if="item.unread">
                  {{ item.unread }}
                </div>
              </div>
            </nuxtLink>
          </perfect-scrollbar>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-8 messenger__chatbox">
      <div class="messenger__loader" v-if="messagesLoader">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>

      <div class="messenger__chatbox-title pb-2" v-if="messages.data && messages.data.length > 0">Диалог с {{ dialogName }}</div>
      <div class="messenger__messages position-relative" v-if="messages.data && messages.data.length > 0">

        <perfect-scrollbar class="messenger__right-ps" @ps-y-reach-start="loadPage" :settings="{wheelPropagation: true, maxScrollbarLength: 60}">
          <div class="messenger__right-lay">
            <div class="messenger__messages-item d-flex py-2" v-for="(item, index) in messages.data" :key="index">

              <div class="messenger__users-avatar mr-3">
                <img :src="messageAvatar(item.user_id)" alt="">
              </div>
              <div class="messenger__messages-right">
                <div class="messenger__messages-fio">{{ messageName(item.user_id) }}<span>{{ item.created_at }}</span></div>
                <div class="messenger__messages-mail">
                  {{ item.message }}
                </div>
              </div>

            </div>
          </div>
        </perfect-scrollbar>
      </div>
      <div class="form-group mt-4 messenger__sendmail-input position-relative" v-if="messages.data && messages.data.length > 0">
        <input type="text" class="form-control" v-model="message.text" @keypress.enter="sendMessage">
        <div class="messenger__sendmail-send position-absolute" @click="sendMessage">
          <fa :icon="['fas', 'paper-plane']" />
        </div>
        <div class="messenger__sendmail-attach position-absolute">
          <fa :icon="['fas', 'paperclip']" />
        </div>
      </div>
    </div>
    <pre>{{ messages }}</pre>
  </div>
</template>

<script>
    import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    export default {
        name: "Chat",
        components: {
            PerfectScrollbar
        },
        watchQuery: ['sel'],

        data() {
            return {
                dialogs: [],
                dialogCurrent: [],
                dialogsLoader: true,

                message: {
                    text: '',
                    attach: {}
                },
                messages: [],
                messagesLoader: false,
            }
        },

        computed: {
            query() {
                return this.$route.query.sel
            },
            dialogName() {
                if(this.$route.query.sel) {
                    let curDialog = this.dialogs.filter(x => x.dialog_uid === this.$route.query.sel);
                    if(curDialog.length > 0) {
                        return curDialog[0].users.filter(x => x.id !== this.user.id)[0].name
                    }
                }
            },

            sortDialog() {
                // return _.sortBy(this.dialogs, [(dialog) => {
                //     return dialog.unread
                // }]);
                return this.dialogs.sort((a, b) => {
                    // return b.unread - a.unread
                });
            }
        },

        methods: {
            scrollChat() {
                setTimeout(() => {
                    const container = document.querySelector('.messenger__right-ps');
                    container.scrollTop = container.scrollHeight;
                }, 0);
            },

            sendMessage() {
                let currentDialog = this.dialogs.filter(x => x.dialog_uid === this.$route.query.sel);
                this.$axios.post('/messenger/messages', {
                    text: this.message.text,
                    attach: this.message.attach,
                    user_to_id: currentDialog[0].users.filter(x => x.id !== this.user.id)[0].id,
                    dialog_uid: this.$route.query.sel
                }).then(res => {
                    this.message.text = '';
                    this.messages.data.push(res.data.data);
                    this.scrollChat();
                });
            },

            // Messages computed
            messageAvatar(user_id) {
                let avatar = this.dialogCurrent.users.filter(x => x.id === user_id)[0].avatar;
                return avatar ? avatar : 'assets/images/general/avatar-blank.jpg'
            },
            messageName(user_id) {
                let name = this.dialogCurrent.users.filter(x => x.id === user_id)[0].name;
                return name
            },

            handleIncoming(message) {
                if(this.dialogCurrent && message.dialog_uid === this.dialogCurrent.dialog_uid) {

                }
                this.messages.data.unshift(message);
                this.scrollChat();
            },

            // Infinity scroll
            loadPage() {
                setTimeout(() => {
                    this.messagesLoader = true;
                    if(this.$route.query.sel && this.messages.current_page < this.messages.last_page + 1) {
                        this.$axios.get('/messenger/messages', {params: {uid: this.$route.query.sel, page: this.messages.current_page + 1}}).then(res => {
                            if(res.data.data.data.length > 0) {
                                this.messages.current_page = res.data.data.current_page;
                                this.messages.last_page = res.data.data.last_page;

                                res.data.data.data.forEach(value => {
                                    this.messages.data.push(value)
                                });

                                this.messagesLoader = false;

                                console.log(res.data.data.data)

                            }
                        })
                    }
                }, 500)
            }
        },

        mounted() {
            // let jwt_token = this.$auth.getToken('local');
            //
            // Echo.connector.options.auth.headers['Authorization'] = jwt_token;
            // Echo.options.auth = {
            //     headers: {
            //         Authorization: jwt_token
            //     },
            // };

            window.Echo.channel(`laravel_database_chat`) // laravel_database_presence-messages.${this.user.id}
                .listen('Messenger.DialogsEvent', ({ message }) => {
                    console.log(message);
                    this.handleIncoming(message)
                });

            this.$axios.get('/messenger/dialogs').then(res => {
                this.dialogs = res.data.data;
                this.dialogsLoader = false;
            });

            if(this.$route.query.sel) {
                this.$axios.get('/messenger/messages', {params: {uid: this.$route.query.sel}}).then(res => {
                    this.messages = res.data.data;
                    this.scrollChat();
                    this.dialogCurrent = this.dialogs.filter(x => x.dialog_uid === this.$route.query.sel)[0]
                })
            }
        },

        watch: {
              '$route.query.sel': function (newVal, oldVal) {
                  this.$axios.get('/messenger/messages', {params: {uid: newVal}}).then(res => {
                      this.messages = res.data.data;
                      this.messageLoader = false;
                      this.scrollChat();
                      this.dialogs.filter(x => x.dialog_uid === this.$route.query.sel)[0].unread = 0
                      this.dialogCurrent = this.dialogs.filter(x => x.dialog_uid === this.$route.query.sel)[0]
                  });
              }
        },
    }
</script>

<style scoped lang="sass">
.messenger__left-ps
  height: 60vh
  overflow: hidden
.messenger__right-ps
  height: 50vh
  overflow: hidden
.messenger__right-lay
  display: flex
  flex-direction: column-reverse
  min-height: 100%

.messenger
  &__users
    margin-left: -6px
    &-item
      padding: 0.75rem 1.25rem
      cursor: pointer
      transition: all ease 0.25s
      &:hover, &.isActive
        background-color: #f0f3f7
    &-avatar
      width: 2.5rem
      height: 2.5rem
      flex: 0 0 2.5rem
      & img
        border-radius: 50%
    &-fio
      font-size: 0.825rem
      font-weight: 500
      padding-right: 2rem
      color: #333333
    &-badge
      width: 1.25rem
      height: 1.25rem
      background-color: #405089
      color: #ffffff
      font-size: 0.625rem
      line-height: 1
      display: flex
      align-items: center
      justify-content: center
      font-weight: 500
      position: absolute
      right: 1rem
      top: calc(50% - 0.625rem)
      border-radius: 50%


  &__chatbox
    border-left: 1px solid #eeeeee
    &-title
      font-size: 1.125rem
      font-weight: 400
      border-bottom: 1px solid #eeeeee

  &__messages
    max-height: 60vh
    padding-top: 0.25rem
    &-item
      padding-right: 1rem
    &-fio
      font-size: 0.875rem
      font-weight: 500
      padding-top: 0.75rem
      padding-bottom: 0.25rem
      color: #405089
      & span
        font-size: 0.75rem
        color: #777777
        padding-left: 0.25rem
        padding-bottom: 1px
    &-mail
      font-size: 0.875rem

  &__sendmail
    &-input
      padding-bottom: 0
      & input
        font-size: 0.875rem
        color: #333333
        outline: none
        box-shadow: none
        padding: 1.25rem 2rem
        &:focus
          border-color: #405089
    &-send
      right: 0.75rem
      top: 0.685rem
      top: 0.685rem
      color: #405089
      cursor: pointer
    &-attach
      left: 0.75rem
      top: 0.685rem
      color: #cccccc
      cursor: pointer


  // Loader
  &__loader
    position: absolute
    top: 45%
    left: calc(50% - 1rem)
</style>
