<template>
    <b-col cols="12" sm="6" lg="3" class="mb-4">
        <div class="tour-item border25 block-shadow block-shadow-hover position-relative">

            <b-modal :id="'tour-item-' + item.id" title="Удалить?" centered hide-footer>
              <div class="row">
                <div class="col-6">
                  <b-button class="mt-3 btn-sm btn-orange" block  @click="deleteTour(item.id)">Удалить</b-button>
                </div>
                <div class="col-6">
                  <b-button class="mt-3 btn-sm btn-blue btn-secondary" block @click="$bvModal.hide('tour-item-' + item.id)">Закрыть</b-button>
                </div>
              </div>
            </b-modal>

            <nuxt-link :to="'/profile/tour/' + item.id">

              <div class="tour-item__delete" @click.prevent="$bvModal.show('tour-item-' + item.id)">
                <fa :icon="['fas', 'trash-alt']" />
              </div>

                <b-img-lazy
                    fluid-grow
                    v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}"
                    :blank-src="require('~/assets/images/general/blank.png')"
                    :src="baseImgPath + item.avatar"
                    class="border25 mb-3"
                    v-if="item.avatar"></b-img-lazy>

                <b-img-lazy
                    fluid-grow
                    v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}"
                    :blank-src="require('~/assets/images/general/blank.png')"
                    :src="require('~/assets/images/general/blank.png')"
                    class="border25 mb-3"
                    v-if="!item.avatar"></b-img-lazy>

            </nuxt-link>

            <nuxt-link :to="'/profile/tour/' + item.id" class="tour-item__title mb-3">{{ item.name }}</nuxt-link>

            <div class="tour-item__footer d-flex align-items-end justify-content-between">
                <div class="tour-item__time" data-toggle="tooltip" data-placement="top" title="Длительность экскурсии">
                    <i class="fas fa-history"></i>
                    <fa :icon="['fas', 'history']" />
                    <span>{{ item.tour_timing[0].name }}</span>
                </div>
                <div class="tour-item__price">
                    от <span>{{ item.price }}</span>
                    <fa :icon="['fas', item.tour_currency[0].iso_code]" />
                    {{ item.tour_price_type[0].name }}
                </div>
            </div>
        </div>
    </b-col>
</template>

<script>
export default {
    middleware: ['auth'],
    props: ['item'],

    methods: {
        deleteTour(tour_id) {
            this.$emit('deleteTour', tour_id);
        }
    },

}
</script>

<style scoped lang="sass">
.tour-item
  &__delete
    position: absolute
    top: 1rem
    left: 1rem
    width: calc(100% - 2rem)
    text-align: center
    border-radius: 25px 25px 0 0
    color: #ffffff
    background-color: #405089
    padding: 0.75rem 1rem
    opacity: 0.25
    transition: all ease 0.25s
  &:hover &__delete
    opacity: 0.75
    &:hover
      background-color: #ff7555
      opacity: 1
</style>
