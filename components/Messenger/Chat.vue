<template>
  <div class="row messenger">
    <div class="col-12 col-md-4 messenger__left px-0 messenger-scrollbar">
      <div class="messenger__users">
        <div class="messenger__users-list">
          <perfect-scrollbar class="messenger__left-ps">
            <nuxtLink v-for="item in 10" :key="item" :to="{name: 'trstprofile-messenger', query: {sel: item + 'sel'}}">
              <div class="messenger__users-item d-flex align-items-center position-relative">
                <div class="messenger__users-avatar mr-3">
                  <img src="~assets/images/general/avatar-blank.jpg" alt="">
                </div>
                <div class="messenger__users-right d-flex justify-content-between">
                  <div class="messenger__users-fio">Ruslan Safin Safin Safin</div>
                </div>
                <div class="messenger__users-badge">2</div>
              </div>
            </nuxtLink>
          </perfect-scrollbar>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-8 messenger__chatbox">
      <div class="messenger__chatbox-title pb-2">Ruslan Safin {{ query }}</div>
      <div class="messenger__messages">
        <perfect-scrollbar class="messenger__right-ps">
          <div class="messenger__messages-item d-flex py-2" v-for="item in 10" :key="item">
            <div class="messenger__users-avatar mr-3">
              <img src="~assets/images/general/avatar-blank.jpg" alt="">
            </div>
            <div class="messenger__messages-right">
              <div class="messenger__messages-fio">Ruslan Safin <span>01.02.2019</span></div>
              <div class="messenger__messages-mail">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At enim eum
                explicabo facere libero, omnis suscipit! Atque libero, magni. Commodi
                consequatur delectus eligendi inventore modi molestiae odio quia quisquam?
                Nisi?
              </div>
            </div>
          </div>
        </perfect-scrollbar>
      </div>
      <div class="form-group mt-4 messenger__sendmail-input position-relative">
        <input type="text" class="form-control">
        <div class="messenger__sendmail-send position-absolute">
          <fa :icon="['fas', 'paper-plane']" />
        </div>
        <div class="messenger__sendmail-attach position-absolute">
          <fa :icon="['fas', 'paperclip']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    export default {
        name: "Chat",
        components: {
            PerfectScrollbar
        },

        watchQuery: true,

        computed: {
            query() {
                return this.$route.query.sel
            }
        },

        methods: {
            scrollChat() {
                setTimeout(() => {
                    const container = document.querySelector('.messenger__right-ps');
                    container.scrollTop = container.scrollHeight;
                }, 0);
            }
        },

        mounted() {
            this.scrollChat();
        }
    }
</script>

<style scoped lang="sass">
.messenger__left-ps
  max-height: 60vh
  overflow: hidden
.messenger__right-ps
  max-height: 50vh
  overflow: hidden

.messenger
  &__users
    margin-left: -6px
    &-item
      padding: 0.75rem 1.25rem
      cursor: pointer
      transition: all ease 0.25s
      &:hover
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
      color: #405089
      cursor: pointer
    &-attach
      left: 0.75rem
      top: 0.685rem
      color: #cccccc
      cursor: pointer
</style>
