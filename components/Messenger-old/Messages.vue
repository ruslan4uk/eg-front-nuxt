<template>
  <div class="messenger-table">
    <div class="messenger-table__row">
      <div class="messenger-messages position-relative">
        <div class="messenger-messages__scroll-container">
          <div class="messenger-messages__overflow">
            <perfect-scrollbar ref="ps" :settings="settings" class="messenger-messages__outer" >
              <div class="messenger-messages__inner">
                <div class="messenger-messages__wrap-inner">
                  <div class="messenger-messages__list">

                    <div class="messenger-messages__item" v-for="(item, index) in messages.data" :key="index">
                      <div class="messenger-mail d-flex py-2 px-3">
                        <div class="messenger-mail__avatar mr-3">
                          <img :src="item.users.filter(x => x.id === item.user_id)[0].avatar || '~assets/images/general/avatar-blank.jpg'" alt="" class="rounded-circle">
                        </div>
                        <div class="messenger-mail__right">
                          <div class="messenger-mail__name">
                            {{ item.users.filter(x => x.id === item.user_id)[0].name }}
                            <span>{{ item.created_at }}</span>
                          </div>
                          <div class="messenger-mail__text">{{ item.message }}</div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </perfect-scrollbar>
          </div>
        </div>

        <div class="messenger-title border-bottom  py-2 px-3" v-if="messages.data.length > 0" >Диалог с {{ messages.paginate.name }} ({{ messages.paginate.from }})</div>

      </div>
    </div>

    <div class="messenger-typing px-3">
      <span v-if="typing">{{ messages.paginate.name }} печатает...</span>
    </div>

    <div class="messenger-sendmail border-top">
      <div class="px-3 py-3">
        <div class="form-group position-relative pb-0 mb-0">

          <input type="text" class="form-control" v-model="mail.text" @keypress.enter="sendMessage" @keydown="whisper()">
          <div class="messenger-sendmail__send position-absolute" @click="sendMessage">
            <fa :icon="['fas', 'paper-plane']" />
          </div>

          <!-- FileUpload -->
          <Uploader></Uploader>

        </div>
      </div>
    </div>
</div>
</template>

<script>
    import Uploader from "~/components/Messenger/Uploader";
    import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    export default {
        name: "Messages",
        watchQuery: ['sel'],
        props: ['echo'],
        components: {
            PerfectScrollbar,
            Uploader
        },
        data() {
            return {
                mail: {
                    text: '',
                    attach: [],
                },
                messages: {
                    data: [],
                    paginate: {
                        preview: 1
                    }
                },

                isNotEnd: true,
                flag: true,
                settings: {
                    wheelPropagation: true,
                    maxScrollbarLength: 60,
                },

                typing: false,
                typingTimer: false,
            }
        },

        methods: {
            handleChatScroll () {
                let scrollbar = document.querySelector('.messenger-messages__outer');
                let offset = scrollbar.scrollTop;
                if(offset < 400 && this.flag === true) {
                    this.getMessages();
                    this.flag = false;
                    setTimeout(() => {
                        this.flag = true
                    }, 500);
                }
            },

            getMessages(scroll = false) {
                if(!this.$route.query.sel) return;
                if(!this.isNotEnd) return;

                this.flag = false;
                setTimeout(() => {
                    this.flag = true
                }, 500);

                console.log('getMessages - before');
                let scrollbar = document.querySelector('.messenger-messages__outer');
                let lastScrollHeight = scrollbar.scrollHeight;
                this.$axios.get('/messenger/messages', { params: { uid: this.$route.query.sel, page: this.messages.paginate.preview} }).then( res => {
                    console.log('getMessages - after');
                    this.isNotEnd = res.data.success;
                    if(res.data.success === false) return;

                    res.data.data.forEach(e => {
                        this.messages.data.unshift(e);
                    });

                    setTimeout(() => {
                        scrollbar.scrollTop += (scrollbar.scrollHeight - lastScrollHeight);
                    }, 0);

                    this.messages.paginate = res.data.paginate;
                    if(scroll === true) {
                        this.scrollChat();
                    }
                })
            },

            scrollChat() {
                setTimeout(() => {
                    const scrollbar = document.querySelector('.messenger-messages__outer');
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }, 0);
            },

            sendMessage() {
                this.$axios.post('/messenger/messages', {
                    text: this.mail.text,
                    attach: this.mail.attach,
                    user_to_id: this.messages.paginate.from || null,
                    dialog_uid: this.$route.query.sel,
                }).then(res => {
                    this.mail.text = '';
                    this.messages.data.push(res.data.data);
                    this.scrollChat();
                });
            },

            // Отправляем что печатаем
            whisper() {
                window.Echo.private(`messenger-dialog.${this.$route.query.sel}`)
                    .whisper('typing', {
                        name: this.user.id
                    });
            },

            listenMessage(hash) {
                // Слушаем конкретный диалог
                window.Echo.private(`messenger-dialog.${hash}`)
                    .listen('Messenger.MessageEvent', ({ message }) => {
                        if(message.user_id !== this.user.id) this.messages.data.push(message);
                        this.scrollChat();
                        this.typing = false;
                    })
                    .listenForWhisper('typing', (e) => {
                        this.typing = true;

                        if(this.typingTimer) clearTimeout(this.typingTimer);

                        this.typingTimer = setTimeout(() => {
                            this.typing = false;
                        }, 2000)
                    });
            }

        },

        watch: {
            '$route.query.sel': function (newVal, oldVal) {
                console.log(newVal);
                this.messages.data = [];
                this.messages.paginate.preview = 1;
                this.mail = {
                    text: '',
                    attach: [],
                };
                this.isNotEnd = true;
                this.getMessages(scroll = true);
            },
        },

        mounted() {
            window.Echo.private(`messenger-dialog.${this.$route.query.sel}`)
                .listen('Messenger.MessageEvent', ({ message }) => {
                    if(message.user_id !== this.user.id) this.messages.data.push(message);
                    this.scrollChat();
                    this.typing = false;
                })
                .listenForWhisper('typing', (e) => {
                    this.typing = true;

                    if(this.typingTimer) clearTimeout(this.typingTimer);

                    this.typingTimer = setTimeout(() => {
                        this.typing = false;
                    }, 2000)
                });

            // Скролл чата
            this.getMessages(scroll =  true);
            if (process.browser) {
                document.querySelector('.messenger-messages__outer').addEventListener('scroll', this.handleChatScroll);
            }
        },
        destroyed () {
            if (process.browser) {
                document.querySelector('.messenger-messages__outer').removeEventListener('scroll', this.handleChatScroll);
            }
        },

    }
</script>

<style scoped lang="sass">
.messenger-table
  display: table
  width: 100%
  table-layout: fixed
  height: 100%
  &__row
    display: table-row
    height: 100%
    width: 100%
    position: relative
.messenger-messages
  height: 100%
  &__list
    overflow-y: hidden
    overflow-x: hidden
    height: 100%
    box-sizing: border-box
    bottom: 0
    z-index: 1
    width: 100%
  &__scroll-container
    position: absolute
    top: 0
    bottom: 0
    width: 100%
    height: 100%
    display: -ms-flexbox
    display: flex
    -ms-flex-direction: column
    flex-direction: column
    overflow: visible !important
    padding-top: 2rem
    padding-bottom: 0.5rem
  &__overflow
    overflow: hidden
    position: relative
    width: inherit
    height: inherit
    min-height: inherit
    max-height: inherit

  &__outer
    max-height: 100%
    height: auto
    position: absolute
    bottom: 0
    -webkit-tap-highlight-color: transparent
    width: inherit
    min-height: inherit
    overflow-y: scroll
    overflow-x: hidden
    &::-webkit-scrollbar
      display: none

  &__inner
    width: inherit
    position: relative
    box-sizing: border-box
  &__wrap-inner
    overflow-y: hidden
    padding-top: 34px
    overflow-x: hidden
    height: 100%
    box-sizing: border-box
    bottom: 0
    z-index: 1
    width: 100%


// Messenger one mail
.messenger-mail
  transition: all ease 0.2s
  &:hover
    background-color: #f7f7f7
  &__avatar
    width: 2.5rem
    height: 2.5rem
    flex: 0 0 2.5rem
  &__name
    font-size: 13px
    font-weight: 500
    padding-top: 0.25rem
    padding-bottom: 0.25rem
    color: #405089
    & span
      font-size: 11px
      color: #777777
      padding-left: 0.25rem
      padding-bottom: 1px
  &__text
    font-size: 13px


// Input
.messenger-sendmail
  width: 100%
  display: table-row
  padding: 0.75rem
  background-color: #f9f9f9
  & input
    font-size: 0.875rem
    color: #333333
    outline: none
    box-shadow: none
    padding: 1.25rem 2rem
    &:focus
      border-color: #405089
  &__send
    right: 0.75rem
    top: 0.685rem
    color: #405089
    cursor: pointer
  &__attach
    left: 0.75rem
    top: 0.685rem
    color: #cccccc
    cursor: pointer

// Messenger title
.messenger-title
  position: absolute
  top: 0
  font-size: 1.125rem
  font-weight: 400
  width: 100%
  background-color: #ffffff

.messenger-typing
  height: 1.5rem
  font-size: 13px
  color: #777777
  display: flex
  align-content: center

</style>
