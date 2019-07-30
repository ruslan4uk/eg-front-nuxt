<template>
    <div class="footer-fix">
        <b-container>
            <b-row class="mt-5">
                <b-col cols="12">
                    <h3 class="mb-4">Экскурсии  / {{categoryTitle()}}</h3>
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
                            <li class="breadcrumb-item active" aria-current="page">Категория "{{categoryTitle()}}"</li>
                        </ol>
                    </div>
                </b-col>

                <!-- Плашка переключатель -->
                <NavCity></NavCity>

            </b-row>
        </b-container>

        <!-- Category -->
        <div class="mt-2 mb-5">
            <div class="container">
                <div class="tour-category border25 py-5 px-5">
                    <div class="row">
                        <div class="col-12 mb-3"><div class="tour-category__title">Категории экскурсий</div></div>
                       
                        <b-col cols="12" md="6" lg="3" v-for="(category, index) in helpers.category" :key="index">
                            <nuxt-link :to="{ name: 'country-country-city-city-category', params: {country: $route.params.country, city: $route.params.city, category: category.id} }"
                            class="tour-category__link mb-1">{{ category.name }}</nuxt-link>
                        </b-col>

                    </div>
                </div>
            </div>
        </div>

        <b-container>
            <b-row>
                
                <CityTourItem v-for="(tour, index) in tours.data" 
                    :key="index"
                    :item="tour" />

                <b-col cols="12"  v-if="tours.total > tours.per_page">
                    <b-pagination-nav 
                        class="mt-3 custom-pagination"
                        align="center"
                        :link-gen="linkGen" 
                        :number-of-pages="tours.last_page" 
                        use-router />           
                </b-col>

                <b-col cols="12" class="mt-4" v-if="tours.data.length === 0">
                    <div class="alert alert-danger border25 d-block pt-3 pb-3 text-center">
                        В этой категории не экскурсий! <a href="">Зарегистрируйтесь</a> и станьте первым прямо сейчас
                    </div>
                </b-col>
                
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavCity from '~/components/Frontend/NavCity'
import CityTourItem from '~/components/Items/CityTourItem'

export default {    
    watchQuery: ['page'],

    head() {
        return{
            title: this.customTitle()
        }
    },

    components: {
        NavCity,
        CityTourItem,
    },
    
    async asyncData({route, store, params, query, redirect, error}) {
        await store.dispatch('helpers/all/getHelpers')

        return store.$axios.get(route.path, {params: { page: query.page }})
            .then((res) => {
                return { 
                    tours: res.data.data,
                    city_country: res.data.city_country   
                }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Post not found' })
        })
    },

    computed: {
        ...mapGetters({
            helpers: 'helpers/all/helpers'
        }),
    },

    methods: {
        linkGen(pageNum) {
            return { 
                path: this.$route.path,
                query: pageNum !== 1 ? { page: pageNum } : null
            }
        },

        categoryTitle() {
            return this.helpers.category.find(x => x.id === Number(this.$route.params.category)).name
        },

        customTitle() {
            console.log('Route', this.$route.params.category);
            
            switch (this.$route.params.category) {
                case 9: 
                    return this.categoryTitle() + ' - экскурсия по городу ' + this.city_country.name + ' — «Еxcursguide ' + this.categoryTitle() + '»'
                    break;
                case 13:
                    return 'Экскурсии с трансфером в городе ' + this.city_country.name + ' — «Еxcursguide трансферы»';
                    break;
                case 15:
                    return 'Экскурсия квест в городе ' + this.city_country.name + ' — «Еxcursguide квесты';
                    break;
                case 17: 
                    return 'Экскурсионное восхождение в горы ' + this.city_country.name + ' — «Еxcursguide восхождение в горы';
                    break;
                case 27: 
                    return 'Экскурсии по достопримечательностям в городе ' + + this.city_country.name + ' — «Еxcursguide экскурсии по достопримечательностям';
                    break;
                default:
                    return this.categoryTitle() + ' по городу ' + this.city_country.name + ' — «Еxcursguide ' + this.categoryTitle() + '»'
                    break;
            }
        },

    },

}
</script>

<style scoped>

</style>