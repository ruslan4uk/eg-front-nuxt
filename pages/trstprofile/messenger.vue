<template>
  <div class="trst footer-fix">
    <b-container>
      <b-row>
        <b-col cols="12" lg="3" class="mb-4">
          <LeftNavigation />
        </b-col>
        <b-col cols="12" lg="9">
          <b-card class="block-shadow border25 mb-4">
            <div class="card-title mb-4 mt-2">Сообщения</div>
            <Messenger />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    import LeftNavigation from '~/components/Trst/LeftNavigation'
    import Messenger from '~/components/Messenger/Chat'
    export default {
        name: "messenger",
        components: {
            LeftNavigation,
            Messenger
        },
    }
</script>

<style scoped>

</style>
