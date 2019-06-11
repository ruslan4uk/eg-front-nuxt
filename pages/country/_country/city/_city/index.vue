<template>
    <div>
        <b-container>
            <b-row class="mt-5">
                <b-col cols="12">
                    <h3 class="mb-4">Экскурсии</h3>
                </b-col>

                <!-- Плашка переключатель -->
                <NavCity></NavCity>

            </b-row>
        </b-container>

        <!-- Category -->
        <div class="mt-2 mb-5">
            <div class="container">
                <div class="tour-category border25 py-4 px-4" :class="openTour ? ' tour-category--is-open' : 'tour-category--is-close'">
                    <div class="row">
                        <!-- <div class="col-12 mb-3"><div class="tour-category__title">Категории экскурсий</div></div> -->
                       
                        <b-col cols="12" md="6" lg="3" v-for="(category, index) in helpers.category" :key="index">
                            <nuxt-link :to="{ name: 'country-country-city-city-category', params: {country: $route.params.country, city: $route.params.city, category: category.id} }" class="tour-category__link mb-1">{{ category.name }}</nuxt-link>
                        </b-col>

                    </div>
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <button class="mb-0 btn btn-sm btn-blue" 
                        @click="openTour = !openTour">
                        <span v-html="openTour ? 'Скрыть' : 'Показать еще'"></span>
                        <span class="ml-1" v-if="!openTour"><fa :icon="['fas', 'chevron-down']" /></span>
                        <span class="ml-1" v-if="openTour"><fa :icon="['fas', 'chevron-up']" /></span>
                    </button>
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
                        В этом городе нет Экскурсий! <a href="">Зарегистрируйтесь</a> и станьте первым прямо сейчас
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
            title: 'Экскурсии'
        }
    },

    data() {
        return {
            openTour: false
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
                return { tours: res.data.data }
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
        linkCategory( cid ) {
            return this.$route.path + '/category_' + cid
        },

        linkGen(pageNum) {
            return { 
                path: this.$route.path,
                query: pageNum !== 1 ? { page: pageNum } : null
            }
        },   

    },

}
</script>

<style scoped lang="sass">
.tour-category
    &--is-close 
        max-height: 6rem
        overflow: hidden
        position: relative
        &:after
            content: ' '
            position: absolute
            bottom: 0
            width: 100%
            height: 2.5rem
            background: rgba(255,255,255,0)
            background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(246,246,246,0.4) 40%, rgba(247,247,248,1) 100%)
            background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(40%, rgba(246,246,246,0.4)), color-stop(100%, rgba(247,247,248,1)))
            background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(246,246,246,0.4) 40%, rgba(247,247,248,1) 100%)
            background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(246,246,246,0.4) 40%, rgba(247,247,248,1) 100%)
            background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(246,246,246,0.4) 40%, rgba(247,247,248,1) 100%)
            background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(246,246,246,0.4) 40%, rgba(247,247,248,1) 100%)
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f7f7f8', GradientType=0 )
</style>