<template>
  <div class="messenger">
    <b-row>
      <b-col cols="12" md="4" class="border-right pr-0">
        <Dialogs :dialogs="dialogs" @selected="selectedDialogs" />
      </b-col>
      <b-col cols="12" md="8" class="pl-0">
        <Messages v-if="this.$route.query.sel" :echo="newMessage" />
        <div class="d-flex align-items-center justify-content-center messenger__empty" v-if="!this.$route.query.sel">
          <div class="messenger__empty-dialog">
            <fa :icon="['fas', 'inbox']" />
            <div>Необходмо выбрать диалог диалог</div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import Dialogs from '~/components/Messenger/Dialogs'
    import Messages from '~/components/Messenger/Messages'
    export default {
        name: "Main",
        components: {
            Dialogs,
            Messages,
        },

        data() {
            return {
                newMessage: {},
                dialogs: [],
            }
        },

        methods: {
            selectedDialogs(dialogItem) {
                this.updateUnreadCount(dialogItem, true);
            },
            // Получаем все диалоги с пользователями
            getDialogs() {
                this.$axios.get('/messenger/dialogs').then( res => {
                    this.dialogs = res.data;
                })
            },

            updateUnreadCount(message, reset) {
                if(this.dialogs.find(x => x.dialog_uid === message.dialog_uid) === undefined) {
                    message.unread = 0;
                    this.dialogs.push(message);
                }
                this.dialogs = this.dialogs.map((single) => {
                    if (single.dialog_uid !== message.dialog_uid) {
                        return single;
                    }
                    if (reset)
                        single.unread = 0;
                    else
                        single.unread += 1;
                    return single;
                })
            }
        },

        mounted() {
            this.getDialogs();

            window.Echo.private(`messenger.${this.user.id}`)
                .listen('Messenger.DialogsEvent', ({ message }) => {
                    if(message.dialog_uid === this.$route.query.sel) {
                        this.newMessage = message;
                        return;
                    }
                    this.updateUnreadCount(message);
                })
        }
    }
</script>

<style scoped lang="sass">
.messenger
  height: 70vh
  & .row
    height: 100%
  &__empty
    height: 100%
  &__empty-dialog
    text-align: center
    & div
      font-size: 0.75rem
      font-weight: 400
      color: #777777
    & svg
      font-size: 3.5rem
      margin-bottom: 0.5rem
      color: #405089
</style>
