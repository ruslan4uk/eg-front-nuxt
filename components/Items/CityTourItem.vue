<template>
    <div class="col-12 col-sm-6 col-lg-3 mb-4">
        <div class="tour-item border25 block-shadow block-shadow-hover">

            <nuxt-link :to="'/guide/' + item.user.id + '/tour/' + item.id">
                <img :src="baseImgPath + item.avatar" alt="" class="border25 mb-3" v-if="item.avatar">
                <img src="~assets/images/general/blank.png" alt="" v-if="!item.avatar" class="border25 mb-3">
            </nuxt-link>

            <nuxt-link :to="'/guide/' + item.user.id + '/tour/' + item.id" class="tour-item__title mb-3">
                {{ item.name }}
            </nuxt-link>
            
            <div class="tour-item__footer d-flex align-items-end justify-content-between">
                <div class="tour-item__time" data-toggle="tooltip" data-placement="top" title="Длительность экскурсии">
                    <i class="fas fa-history"></i>
                    <span>{{ item.tour_timing[0].name }}</span>
                </div>
                <div class="tour-item__price">
                    от <span>{{ item.price }}</span>
                    <span class="rubl">
                        <fa :icon="['fas', item.tour_currency[0].iso_code]" />
                    </span> 
                    {{ item.tour_price_type[0].name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],

}
</script>

<style scoped>

</style>