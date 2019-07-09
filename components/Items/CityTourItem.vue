<template>
    <div class="col-12 col-lg-6 mb-4">
        <div class="tour-item border25 block-shadow block-shadow-hover d-flex">

            <!-- <div class="tour-item__left"> -->
            <nuxt-link 
                v-if="!item.avatar"
                :to="'/guide/' + item.user.id + '/tour/' + item.id" class="tour-item__left"
                :style="{'background-image': 'url(' + require('@/assets/images/general/blank.png') + ')'}">
            </nuxt-link>
            <nuxt-link 
                v-if="item.avatar"
                :to="'/guide/' + item.user.id + '/tour/' + item.id" class="tour-item__left"
                :style="{'background-image': 'url(' + baseImgPath + item.avatar + ')'}">
            </nuxt-link>
            <!-- </div> -->

            <div class="tour-item__right">
                <nuxt-link :to="'/guide/' + item.user.id + '/tour/' + item.id" class="tour-item__title mb-3">
                    {{ item.name }}
                </nuxt-link>

                <div class="tour-item__about mb-5">{{ item.about  | truncate(100)}}</div>

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

            <!-- <nuxt-link :to="'/guide/' + item.user.id + '/tour/' + item.id">
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
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],

    filters: {
        truncate(string, value) {
            return string.substring(0, value) + '…';
        }
    }

}
</script>

<style lang="sass" scope>
.tour-item
    padding: 0
    &__left
        width: 35%
        flex: 0 0 35%
        min-height: 15rem
        background-size: cover
        background-position: center center
        border-radius: 25px 0 0 25px
    &__right 
        width: 65%
        flex: 0 0 65%
        padding: 1rem
        position: relative
    &__about
        font-size: 0.875rem
    
    &__footer
        position: absolute
        width: calc(100% - 2rem)
        bottom: 1rem
</style>