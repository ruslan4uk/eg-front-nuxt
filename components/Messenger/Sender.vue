<template>
  <div class="messenger-sendmail border-top">
    <div class="px-3 py-3">
      <div class="form-group position-relative pb-0 mb-0">

        <input type="text" class="form-control" v-model="text" @keypress.enter="sendMessage" @keydown="whisper" placeholder="Введите сообщение">
        <div class="messenger-sendmail__send position-absolute" @click="sendMessage">
          <fa :icon="['fas', 'paper-plane']" />
        </div>

        <Uploader :uid="uid" @attach="newAttach"></Uploader>

        <div class="messenger-attach" v-if="attach">
            <b-row class="m-0 mt-3">
              <b-col cols="6" md="4" lg="3" class="p-1 mb-1" v-for="(item, index) in attach" :key="index" v-if="item.type === 'image'">
                <div class="messenger-attach__image position-relative">
                  <img :src="item.path.path_crop" alt="">
                  <div class="messenger-attach__delete" @click="deleteAttach(index)">
                    <fa :icon="['fas', 'times']" />
                  </div>
                </div>
              </b-col>
            </b-row>
        </div>

        <div class="messenger-attach" v-if="attach">
          <div class="messenger-attach__item" v-for="(item, index) in attach" :key="index">
            <div v-if="item.type === 'file'" class="position-relative pt-2">
              <fa :icon="['fas', 'paperclip']" /> {{ item.name }}
              <div class="messenger-attach__delete" @click="deleteAttach(index)">
                <fa :icon="['fas', 'times']" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import Uploader from '~/components/Messenger/Uploader'
    export default {
        name: "Sender",
        components: {
          Uploader,
        },
        watchQuery: true,
        props: {
            dialog: { type: Object, default: {} },
            uid: { type: String, default: '' }
        },

        data() {
            return {
                text: '',
                attach: [],
            }
        },

        methods: {
            sendMessage() {
                if(this.text.length < 1 && this.attach.length < 1) return;
                this.$emit('send', {text: this.text, attach: this.attach});
                this.text = '';
                this.attach = [];
            },

            newAttach(attach) {
                this.attach.push(attach)
            },

            deleteAttach(index) {
                this.attach.splice(index, 1)
            },

            whisper() {
                window.Echo.private(`messenger-dialog.${this.uid}`)
                    .whisper('typing', {
                        user_id: this.user.id
                    });
            },
        },



        watch: {
            'uid': function (newVal, oldVal) {
                this.text = '';
                this.attach = [];
            }
        }

    }
</script>

<style scoped lang="sass">
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

  .messenger-attach
    &__item
      color: #444444
      font-size: 0.875rem
      & svg
        color: #405089
    &__delete
      position: absolute
      top: 0
      right: 0.25rem
      cursor: pointer
      color: #405089
</style>
