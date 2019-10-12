<template>
  <div class="trst footer-fix">
    <b-container>
      <b-row>
        <b-col cols="12" lg="3" class="mb-4">
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
    import Messenger from '~/components/Messenger/Main'
    export default {
        middleware: ['auth', 'emailConfirm', 'checkRole'],

        name: "messenger",

        components: {
            Messenger
        },
    }
</script>

<style scoped>

</style>
