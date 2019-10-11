<template>
  <div class="messenger">
    <b-row class="position-relative">
      <b-col cols="12" md="4" :class="(dialogUid) ? 'border-right pr-0 h-100' : 'border-right pr-0 messenger__mobile h-100'">
        <Dialogs :dialogs="dialogs" />
      </b-col>
      <b-col cols="12" md="8" :class="(dialogUid) ? 'px-0 pr-md-2 messenger__messages-row' : 'px-0 pr-md-2 messenger__messages-row'">
        <Messages :uid="dialogUid" :dialog="currentDialog" @send="sendNewMessage" v-if="dialogUid" />
        <div class="d-none d-md-flex align-items-center justify-content-center messenger__empty" v-if="!this.$route.query.sel">
          <div class="messenger__empty-dialog">
            <fa :icon="['fas', 'inbox']" />
            <div>Необходмо выбрать диалог</div>
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
        watchQuery: true,

        data() {
            return {
                dialogs: [],
                dialogUid:  this.$route.query.sel || '',
                currentDialog: {},
            }
        },

        methods: {
            // Получаем все диалоги пользователя
            getDialogs() {
                this.$axios.get('/messenger/dialogs').then(res => {
                    this.dialogs = res.data.data;
                    this.getCurrentDialog();
                });
            },

            getCurrentDialog(dialogUid) {
                if(this.dialogs.length > 0 && this.$route.query.sel)
                    this.currentDialog = this.dialogs.find(x => x.uid === this.$route.query.sel)
            },

            // Clear unread dialog
            updateUnreadCount(dialog_uid, reset, created_at) {
                this.dialogs = this.dialogs.map((single) => {
                    if (single.uid === this.$route.query.sel && single.uid === dialog_uid) {
                        this.$store.commit('auth/UPDATE_UNREAD', -single.unread);
                        single.unread = 0;
                        if(created_at) single.updated_at = created_at;
                        return single;
                    }
                    if (single.uid !== this.$route.query.sel && single.uid === dialog_uid) {
                        if (reset) {
                            this.$store.commit('auth/UPDATE_UNREAD', single.unread === 0 ? -1 : -single.unread);
                            single.unread = 0;
                        }
                        else
                            single.unread += 1;
                        if(created_at) { single.updated_at = created_at }
                        return single;
                    }

                    return single;
                })
            },

            sendNewMessage(message) {
                this.updateUnreadCount(message.dialog_uid, true, message.created_at)
            }
        },

        mounted() {
            this.getDialogs();

            window.Echo.private(`messenger.${this.user.id}`)
                .listen('Messenger.DialogsEvent', ({message}) => {
                    this.updateUnreadCount( message.dialog_uid, false, message.created_at );
                })
                .listen('Messenger.NewDialogEvent', ({ dialog }) => {
                    this.dialogs.push(dialog);
                })
        },

        watch: {
            '$route.query.sel': function (newVal,oldVal) {
                this.dialogUid = newVal;
                this.getCurrentDialog();
                this.updateUnreadCount(newVal, true)
            }
        }
    }
</script>

<style scoped lang="sass">
  .messenger
    height: 80vh
    &__messages-row
      position: absolute
      height: 100%
      background-color: #ffffff
      @media screen and (min-width: 768px)
        position: initial
    & .border-right
      @media screen and (max-width: 767px)
        border: 0 !important
    &__mobile
      z-index: 3
      position: relative
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
