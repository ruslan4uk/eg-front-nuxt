<template>
    <div class="footer-fix">
        <b-container>
            <b-row class="mt-5">
                <b-col cols="12">
                    <h3 class="mb-4">Гиды {{ city_country.name }}</h3>
                </b-col>

                <!-- breadcrumbs -->
                <b-col>
                    <div aria-label="breadcrumb">
                        <ol class="breadcrumb border25 px-0">
                            <li class="breadcrumb-item">
                                <nuxt-link to="/">Главная</nuxt-link>                            
                            </li>
                            <li class="breadcrumb-item">
                                <nuxt-link :to="{ name: 'country-country', params: {country: city_country.city_country.id} }">{{ city_country.city_country.name }}</nuxt-link>
                            </li>
                            <li class="breadcrumb-item">
                                <nuxt-link :to="{ name: 'country-country-city-city', params: {country: city_country.city_country.id, city: city_country.id} }">{{ city_country.name }}</nuxt-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Гиды</li>
                        </ol>
                    </div>
                </b-col>

                <!-- Плашка переключатель -->
                <NavCity></NavCity>

            </b-row>
        </b-container>

        <b-container>
            <b-row>
                <b-col cols="12" class="mb-3 mt-3" v-for="(item, index) in guide.data" :key="index">
                    <b-row>
                        <b-col cols="12" md="2" class="guide-item-avatar">

                            <nuxt-link :to="{ name: 'guide-guide', params: { guide: item.id } }" class="position-relative d-block">
                                <FavoriteBadge :userId="item.id" type="guide"></FavoriteBadge>
                                <img :src="baseImgPath + item.avatar" alt="" class="border25 mb-3" v-if="item.avatar">
                                <img src="~assets/images/general/blank.png" alt="" class="border25 mb-3" v-if="!item.avatar">
                            </nuxt-link>
                                    
                        </b-col>
                        <b-col cols="12" md="10">
                            <div class="guide-item border25">
                                <nuxt-link :to="{ name: 'guide-guide', params: { guide: item.id } }" class="guide-item__name mb-2">
                                    {{ item.name }}
                                </nuxt-link>
                                <div class="guide-item__count-tour mb-2">{{ item.tour_count }} {{ declOfNum(item.tour_count, ['экскурсия', 'экскурсии', 'экскурсий']) }}</div>
                                <div class="guide-item__about mb-3">{{ sliceText(item.about) }}</div>
                                <div class="d-flex justify-content-end align-item-center">
                                    <nuxt-link :to="{ name: 'guide-guide', params: { guide: item.id } }" class="guide-item__more">
                                        Подробнее <fa :icon="['fas', 'angle-right']" />
                                    </nuxt-link>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
                
            </b-row>
        </b-container>

    </div>
</template>

<script>
import NavCity from '~/components/Frontend/NavCity'
import FavoriteBadge from '~/components/Frontend/FavoriteBadge'

export default {
    watchQuery: ['page'],

    components: { 
        NavCity, 
        FavoriteBadge,
    },

    head() {
        return {
            title: 'Экскурсионный гид город ' + this.city_country.name + ' услуги, цены — «Еxcursguide гиды ' + this.city_country.name + '»' 
        }
    },

    async asyncData({route, store, params, query, redirect, error}) {
        await store.dispatch('helpers/all/getHelpers')

        return store.$axios.get(route.path, {params: { page: query.page }})
            .then((res) => {
                return { 
                    guide: res.data.data, 
                    city_country: res.data.city_country
                }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Post not found' })
        })
    },
    methods: {
        declOfNum(number, titles) {  
            var cases = [2, 0, 1, 1, 1, 2];  
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
        },
        sliceText(text) {
            var sliced = text.slice(0,100);
            if (sliced.length < text.length) {
                sliced += '...';
            }
            return sliced
        }
    },  
    

}
</script>

<style scoped lang="sass">
.guide-item-avatar img
    width: 100%
</style>