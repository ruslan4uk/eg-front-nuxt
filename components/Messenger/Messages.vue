<template>
  <div class="messenger-table">

    <div class="messenger-title border-bottom position-relative py-2 px-3" v-if="dialog && dialog.user_dialog_from" >
      Диалог с {{ dialog.user_dialog_from.name }}
      <NuxtLink to="/trstprofile/messenger" class="messenger-close position-absolute d-md-none">
        <fa :icon="['fas', 'times']" />
      </NuxtLink>
    </div>

    <div class="messenger-table__row">
      <div class="messenger-messages position-relative">
        <div class="messenger-messages__scroll-container">
          <div class="messenger-messages__overflow">
            <perfect-scrollbar ref="ps" :settings="settings" class="messenger-messages__outer" >
              <div class="messenger-messages__inner">
                <div class="messenger-messages__wrap-inner">

                  <div class="messenger-table__loader py-2 text-center">
                    <div class="messenger-table__loader-wrap" v-if="loading">
                      <fa :icon="['fas', 'spinner']" />
                    </div>
                    <div class="messenger-table__message-end" v-if="loading === false && messageEnd">Конец диалога</div>
                  </div>

                  <div class="messenger-messages__list">

                    <div class="messenger-messages__item" v-for="(item, index) in messages" :key="index">
                      <div class="messenger-mail d-flex py-2 px-3">
                        <div class="messenger-mail__avatar mr-3">
                          <img :src="item.user_message_from.avatar || '/_nuxt/assets/images/general/avatar-blank.jpg'" alt="" class="rounded-circle">
                        </div>
                        <div class="messenger-mail__right">
                          <div class="messenger-mail__name">
                            {{ item.user_message_from.name }}
                            <span>{{ item.created_at }}</span>&nbsp;
                          </div>
                          <div class="messenger-mail__text">{{ item.message }}</div>

                          <!-- Attach -->
                          <div class="messenger-messages__attach d-flex flex-wrap" v-if="item.attach">
                            <div class="messenger-messages__attach-item " v-for="(attach, index) in item.attach" :key="index" v-if="attach.type === 'image'">
                              <div class="messenger-messages__attach-image mt-1 pr-1 pb-1" >
                                <div v-b-modal.modal-md @click="sendToModalUrl(attach.path.path_full)">
                                  <img :src="attach.path.path_crop" v-if="attach.path.path_crop" alt="">
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="messenger-messages__attach" v-if="item.attach">
                            <div class="messenger-messages__attach-item " v-for="(attach, index) in item.attach" v-if="attach.type === 'file'">
                              <div class="messenger-messages__attach-file mt-1 pr-1 pb-1" >
                                <fa :icon="['fas', 'paperclip']" /><a :href="attach.path" class="ml-2">{{ attach.name }}</a>
                              </div>
                            </div>
                          </div>
                          <!-- End attach -->

                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </perfect-scrollbar>
          </div>
        </div>

        <b-modal id="modal-md" size="lg" dialog-class="justify-content-center" body-class="p-0" content-class="d-flex w-auto" centered hide-footer hide-header title="Extra Large Modal">
          <img :src="modalImageUrl" v-if="modalImageUrl" class="modal-image" alt="" />
        </b-modal>

      </div>
    </div>

    <div class="messenger-typing px-3">
      <span v-if="typing">{{ dialog.user_dialog_from.name }} печатает...</span>
    </div>

    <Sender :dialog="dialog" :uid="uid" @send="sendMail"></Sender>

  </div>
</template>

<script>
    import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    import Sender from '~/components/Messenger/Sender'
    export default {
        name: "Messages",
        components: {
            PerfectScrollbar,
            Sender,
        },

        props: {
            uid: { type: String, default: '' },
            dialog: { type: Object, default: {} }
        },

        data() {
            return {
                messages: [],
                lastId: null,
                loading: false,
                messageEnd: false,

                settings: {
                    wheelPropagation: true,
                    maxScrollbarLength: 60,
                },

                typing: false,

                modalImageUrl: null,
            }
        },

        methods: {
            handleChatScroll () {
                let scrollbar = document.querySelector('.messenger-messages__outer');
                let offset = scrollbar.scrollTop;

                if(offset < 50 && offset !== 0 && this.loading === false) {
                    this.loading = true;
                    setTimeout(() => {
                        this.getMessages(this.$route.query.sel, false, this.lastId);
                    }, 500);
                }
            },

            getMessages(dialog_uid, scroll = false, lastId = null) {
                let scrollbar = document.querySelector('.messenger-messages__outer');
                let lastScrollHeight = scrollbar.scrollHeight;
                this.$axios.get(`/messenger/messages/${dialog_uid}/${lastId || ''}`).then(res => {
                    res.data.data.forEach(item => {
                        this.messages.unshift(item);
                        this.lastId = item.id;
                    });
                    // Ставим флаг если это конец сообщений
                    if(lastId && res.data.data.length < 1) this.messageEnd = true;
                    // Скролим чат вниз
                    if(scroll) this.scrollChat();
                    // При прокрутке оставляем скролл на том же месте
                    if(!scroll) setTimeout(() => {scrollbar.scrollTop += (scrollbar.scrollHeight - lastScrollHeight);}, 0);
                    // Убираем загрузку
                    setTimeout(() => { this.loading = false}, 100)
                });
            },

            sendMail(message) {
                this.$axios.post('/messenger/messages', {
                    message: message.text,
                    attach: message.attach,
                    user_to_id: this.dialog.user_dialog_from.id,
                    dialog_uid: this.uid,
                }).then(res => {
                    this.messages.push(res.data.data);
                    this.$emit('send', res.data.data);
                    this.scrollChat();
                });
            },

            scrollChat() {
                setTimeout(() => {
                    const scrollbar = document.querySelector('.messenger-messages__outer');
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }, 25);
            },

            listenMessage() {
                window.Echo.private(`messenger-dialog.${this.uid}`)
                    .listen('Messenger.MessageEvent', ({ message }) => {
                        if(this.messages.find(x => x.id === message.id)) return;
                        // if(message.user_id === this.user.id) return;
                        this.messages.push(message);
                        if(message.dialog_uid === this.$route.query.sel) this.$store.commit('auth/UPDATE_UNREAD', -1);
                        this.scrollChat();
                    })
                    .listenForWhisper('typing', (e) => {
                        this.typing = true;

                        if(this.typingTimer) clearTimeout(this.typingTimer);

                        this.typingTimer = setTimeout(() => {
                            this.typing = false;
                        }, 700)
                    })
            },

            sendToModalUrl(url) {
                this.modalImageUrl = url;
            }

        },

        mounted() {
            console.log('mount');
            this.getMessages(this.$route.query.sel, true);

            if (process.browser) {
                document.querySelector('.messenger-messages__outer').addEventListener('scroll', this.handleChatScroll);
            }

            this.listenMessage();

        },
        // destroyed () {
        //     if (process.browser) {
        //         document.querySelector('.messenger-messages__outer').removeEventListener('scroll', this.handleChatScroll);
        //     }
        // },

        watch: {
            '$route.query.sel': function (newVal,oldVal) {
                this.messages = [];
                this.getMessages(newVal, true);

                window.Echo.leave(`messenger-dialog.${oldVal}`);
                this.listenMessage();
            }
        }
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
    &__loader
      font-size: 1rem
      height: 2.5rem
      & svg
        color: #1b4b72
        animation: rotation 1.5s infinite linear
    &__message-end
      opacity: 0.7
      font-size: 0.75rem
      border: 1px solid #405089
      display: inline-block
      padding: 0.25rem 0.75rem 0.125rem
      border-radius: 20px
      font-weight: 400
      color: #405089

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
      /*padding-top: 2rem*/
      /*padding-bottom: 0.5rem*/
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
      padding-top: 10px
      overflow-x: hidden
      height: 100%
      box-sizing: border-box
      bottom: 0
      z-index: 1
      width: 100%

    &__attach-file
      color: #405089
      font-size: 14px
    &__attach-image
      width: 120px
      height: 90px
      cursor: pointer


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

  // Messenger title
  .messenger-title
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


  @-webkit-keyframes rotation
    from
      transform: rotate(0deg)
    to
      transform: rotate(359deg)


  .messenger-close
    top: 0.375rem
    right: 0.5rem
    font-size: 1.25rem
    color: #405089

  .modal-image
    max-height: 90vh
    & img
      max-height: 100%
  .modal-image-width
    width: auto !important
    text-align: center !important
    display: flex !important
    justify-content: center !important

</style>
