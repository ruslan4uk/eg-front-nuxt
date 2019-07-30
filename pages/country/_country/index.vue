<template>
    <section class="country">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <h2 class="mb-5">{{ country.name }}</h2>
                </b-col>
            </b-row>
        </b-container>

        <section class="country__navigation py-2 mb-5">
            <b-container>
                <b-row>
                    <b-col cols="12">
                        <div class="d-lg-flex justify-content-between country__navigation-list">
                            <div class="d-inline py-2 px-2" v-for="(item, index) in 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЫЬЭЮЯ'.split('')" :key="index">
                                <nuxt-link 
                                    exact
                                    :class="$route.query.litter === item ? 'active' : ''"
                                    :to="{ name: 'country-country', params: {country: $route.params.country}, query: {litter: item} }">{{ item }}</nuxt-link>
                            </div>  
                        </div>                      
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <b-container>
            <b-row>
                <b-col cols="12">
                    <div class="alert alert-danger border25 d-block pt-3 pb-3 text-center" v-if="city.data.length < 1">
                        К сожалению ничего не найдено =(
                    </div>
                </b-col>

                <b-col cols="6" lg="3" v-for="(item, index) in city.data" :key="index" class="mb-2">
                    <nuxt-link :to="{ name: 'country-country-city-city', params: {country: $route.params.country, city: item.id} }" class="country__link">{{ item.name }}</nuxt-link>
                </b-col>

                <b-col cols="12"  v-if="city.total > city.per_page">
                    <b-pagination-nav 
                        class="mt-5 custom-pagination"
                        align="center"
                        :link-gen="linkGen" 
                        :number-of-pages="city.last_page" 
                        use-router />           
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
export default {
    watchQuery: ['page','litter'],

    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return store.$axios.get(route.path, {params: { page: query.page, litter: query.litter }})
            .then((res) => {
                return {
                    city: res.data.city,
                    country: res.data.country
                }                
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Post not found' })
        })
    },

    methods: {
        linkGen(pageNum) {
            return { 
                path: this.$route.path,
                query: pageNum !== 1 ? { page: pageNum, litter: this.$route.query.litter } : { litter: this.$route.query.litter }
            }
        },   
    },
}
</script>

<style lang="sass" scoped>
.country
    &__navigation
        background: #f3f3f3
        & a 
            font-size: 1.25rem
            font-weight: 500
            border-bottom: 3px solid transparent
            transition: all ease 0.3s
            color: #444
            &:hover, &.active
                border-bottom: 3px solid #0056b3
                color: #0056b3
        &-list 
            overflow-y: scroll
            @media (min-width: 1000px)
                overfloy-y: none

    &__link
        color: #777
        border-bottom: 1px solid transparent
        transition: all ease 0.3s
        display: inline-block
        padding-bottom: 0.125rem
        font-weight: 400
        &:hover
            border-bottom: 1px solid #ff7555
            color: #ff7555

</style> 