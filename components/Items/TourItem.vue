<template>
    <b-col cols="12" sm="6" lg="3" class="mb-4">
        <div class="tour-item border25 block-shadow block-shadow-hover">
            
            <nuxt-link :to="'/profile/tour/' + item.id">
                <img :src="item.avatar" :alt="item.name" class="border25 mb-3" v-if="item.avatar">
                <img src="~assets/images/general/blank.png" alt="" class="border25 mb-3" v-if="!item.avatar">
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
  

}
</script>

<style scoped>

</style>