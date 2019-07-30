<template>
    <div class="footer-fix">
        <b-container>
            <b-row class="mt-5">
                <b-col cols="12">
                    <h3 class="mb-4">Достопримечательности {{ city_country.name }}</h3>
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
                            <li class="breadcrumb-item active" aria-current="page">Достопримечательности</li>
                        </ol>
                    </div>
                </b-col>

                <!-- Плашка переключатель -->
                <NavCity></NavCity>

            </b-row>
        </b-container>

        <b-container>
            <b-row>
                <b-col cols="12" sm="6" lg="4" class="mb-4"
                    v-for="(article, index) in articles.data" :key="index">
                    <div class="tour-item border25 block-shadow block-shadow-hover">
                        
                        <nuxt-link :to="'/article/' + article.id">
                        
                            <b-img-lazy 
                                fluid-grow
                                v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}" 
                                :blank-src="require('~/assets/images/general/blank.png')"
                                :src="baseImgPath + article.avatar_crop" 
                                class="border25 mb-3"
                                v-if="article.avatar_crop"></b-img-lazy>

                            <b-img-lazy 
                                fluid-grow
                                v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}" 
                                :blank-src="require('~/assets/images/general/blank.png')"
                                :src="require('~/assets/images/general/blank.png')" 
                                class="border25 mb-3"
                                v-if="!article.avatar_crop"></b-img-lazy>

                        </nuxt-link>

                        <nuxt-link :to="'/article/' + article.id" class="tour-item__title mb-2">{{ article.name }}</nuxt-link>
                        
                        <div v-html="sliceText(article.text)"></div>

                        <nuxt-link :to="'/article/' + article.id" class="btn btn-sm btn-blue mb-2">Подробнее</nuxt-link>

                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import NavCity from '~/components/Frontend/NavCity'

export default {
    components: { 
        NavCity, 
    },
    
    head() {
        return {
            title: 'Достопримечательности города ' + this.city_country.name + ', описание и фото — «Еxcursguide достопримечательности ' + this.city_country.name + '»' 
        }
    },

    async asyncData({route, store, params, query, redirect, error}) {

        return store.$axios.get(route.path, {params: { page: query.page }})
            .then((res) => {
                return { 
                    articles: res.data.data,
                    city_country: res.data.city_country
                }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Article not found' })
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

<style scoped>

</style>