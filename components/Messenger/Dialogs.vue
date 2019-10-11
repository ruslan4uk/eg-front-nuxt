<template>
  <div class="messenger-dialogs h-100" v-if="dialogs.length > 0">
    <div class="messenger-dialogs__list h-100">
      <perfect-scrollbar class="messenger-dialogs__scroll">
        <div class="messenger-dialogs__item" v-for="(item, index) in sortedDialogs" :key="index">
          <NuxtLink :to="{ query: { sel: item.uid} }" class="d-flex align-items-center pr-5 pl-2 py-2 position-relative" exact @click.native="$emit('selected', item)">
            <img :src="item.user_dialog_from.avatar || '/_nuxt/assets/images/general/avatar-blank.jpg'" alt="" class="messenger-dialogs__avatar mr-2 rounded-circle">
            <div class="messenger-dialogs__name">
              {{ item.user_dialog_from.name }}
            </div>
            <div class="messenger-dialogs__user-badge" v-if="item.unread">
              {{ item.unread }}
            </div>
          </NuxtLink>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
    import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    import _ from 'lodash'
    export default {
        name: "Dialogs",
        props: {
            dialogs: { type: Array, default: [] },
        },

        components: {
            PerfectScrollbar
        },

        computed: {
            sortedDialogs () {
                return _.sortBy(this.dialogs, ['unread', 'updated_at'], ['asc', 'asc']).reverse()
            }
            // sortedDialogs() {
            //     return _.sortBy(this.dialogs, [(dialog) => {
            //         if(dialog.uid === this.$route.query.sel) return Infinity;
            //         return dialog.unread
            //     }]).reverse();
            // }
        },



    }
</script>


<style scoped lang="sass">
  .messenger-dialogs
    &__scroll
      height: 100%
      overflow-y: hidden
    &__item
      &:hover, & .active
        background-color: #f0f3f7
    &__avatar
      width: 2.5rem
      flex: 0 0 2.5rem
    &__name
      font-size: 0.75rem
      font-weight: 500
      padding-right: 2rem
      color: #2a3456
    &__user-badge
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
</style>
