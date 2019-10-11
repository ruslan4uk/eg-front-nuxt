<template>
  <div>
    <button class="btn btn-blue btn-block btn-sendmail mt-2" @click="newMessageModal = !newMessageModal">Написать сообщение</button>

    <b-modal v-model="newMessageModal" centered hide-footer	class="messenger-new">
      <template v-slot:modal-title>Написать сообщение</template>
      <div class="messenger-new__user d-flex align-items-center">
        <img :src="touser.avatar" alt="" v-if="touser.avatar" class="messenger-new__avatar rounded-circle mr-3">
        <img src="~/assets/images/general/avatar-blank.jpg" alt="" v-if="!touser.avatar" class="messenger-new__avatar rounded-circle mr-3">
        <div class="messenger-new__name">{{ touser.name }}</div>
      </div>

      <b-form-textarea
        v-model="newMessage.text"
        placeholder="Введите сообщение"
        size="sm"
        rows="6"
        class="mt-3"></b-form-textarea>

      <div class="text-right mt-3 mb-1">
        <button class="btn btn-sm btn-blue" @click="sendMessage">Отправить</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
    export default {
        name: "NewMessage",
        props: ['touser'],

        data() {
            return {
                newMessageModal: false,
                newMessage: {
                    text: '',
                    attach: null,
                }
            }
        },

        methods: {
            sendMessage() {
                if(this.newMessage.text.length < 1) return;
                this.$axios.post('/messenger/messages', {
                    message: this.newMessage.text,
                    attach: this.newMessage.attach,
                    user_to_id: this.touser.id
                }).then(res => {
                    this.newMessage.text = '';
                    this.newMessage.attach = null;
                    this.newMessageModal = false;
                })
            }
        }

    }
</script>


<style lang="sass">
.messenger-new
  & .modal-content
    border-radius: 15px
    overflow: hidden
  & .modal-header
    background-color: #405089
    & .modal-title
      color: #ffffff
      font-size: 1rem !important
      font-weight: 400 !important
    & .close
      color: #ffffff
      font-size: 1.25rem
      margin-right: -0.75rem

  // Body
  & .modal-body
    background-color: #eeeeee

  & .messenger-new__avatar
    with: 2.5rem
    height: 2.5rem
    flex: 0 0 2.5rem
  & .messenger-new__name
    font-size: 0.875rem
    font-weight: 500
    color: #405089

  & .btn
    font-size: 0.875rem
</style>
