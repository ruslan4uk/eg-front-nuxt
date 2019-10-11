<template>
    <div class="messenger-dialogs" v-if="dialogs.length > 0">
      <div class="messenger-dialogs__list">
        <div class="messenger-dialogs__item" v-for="(item, index) in sortedDialogs" :key="index">
          <NuxtLink :to="{ query: { sel: item.dialog_uid} }" class="d-flex align-items-center pr-5 pl-2 py-2 position-relative" exact @click.native="$emit('selected', item)">
            <img :src="item.users.filter(x => x.id !== user.id)[0].avatar || '~assets/images/general/avatar-blank.jpg'" alt="" class="messenger-dialogs__avatar mr-2 rounded-circle">
            <div class="messenger-dialogs__name">
              {{ item.users.filter(x => x.id !== user.id)[0].name }}
            </div>
            <div class="messenger-dialogs__user-badge" v-if="item.unread">
              {{ item.unread }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
</template>

<script>
  import _ from 'lodash'
    export default {
        name: "Dialogs",
        props: {
            dialogs: {
                type: Array,
                default: []
            }
        },
        data() {
            return {

            }
        },

        computed: {
            sortedDialogs() {
                return _.orderBy(this.dialogs, ['unread', 'created_at'], ['desc', 'desc'])
            }
        },

    }
</script>

<style scoped lang="sass">
.messenger-dialogs
  &__item
    &:hover, & .active
      background-color: #f0f3f7
  &__avatar
    width: 2.5rem
    flex: 0 0 2.5rem
  &__name
    font-size: 0.825rem
    font-weight: 500
    padding-right: 2rem
    color: #333333
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
