<template>
    <section class="footer-fix">
        <b-container>
            <b-row class="mt-5">
                <b-col cols="12">
                    <h3 class="mb-4">Мои экскурсии</h3>
                </b-col>

                <!-- Плашка переключатель -->
                <b-col cols="12" class="mb-5">
                    <div class="subnavigation">
                        <div class="subnavigation__lay">
                            <div class="subnavigation__list d-flex">
                                <nuxt-link to="/profile/tour" exact class="subnavigation__item border25">Активные</nuxt-link>
                                <nuxt-link to="/profile/tour/moderate" class="subnavigation__item border25">На модерации</nuxt-link>
                            </div>
                        </div>
                    </div>
                </b-col>

                <b-col cols="12">
                    <b-row v-if="data.data.length > 0">
                        <TourItem 
                            v-for="(item,index) in data.data"
                            :key="index"
                            :item="item" />
                    </b-row>
                </b-col>
                
                <b-col cols="12" v-if="data.total > data.per_page">
                    <b-pagination-nav 
                        class="mt-3 custom-pagination"
                        align="center"
                        :link-gen="linkGen" 
                        :number-of-pages="data.last_page" 
                        use-router />           
                </b-col>

                <b-col cols="12" v-if="data.data.length === 0">
                    <div class="col-12 alert alert-danger border25 d-block pt-3 pb-3 text-center" role="alert">
                        У вас нет ни одной экскурсии! <a href="" @click.prevent="createTour">Создайте</a> экскурсию прямо сейчас
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
import TourItem from '~/components/Items/TourItem'

export default {
    middleware: ['auth', 'emailConfirm'],

    watchQuery: ['page'],

    components: { 
        TourItem 
    },

    head() {
        return {
           title: 'Экскурсии на модерации - ExcursGuide'
        }
    },

    async asyncData({ store, params, query, redirect, error}) {
        let page 

        if( query.page) { page = '?page=' + query.page} else { page = ''}

        return store.$axios.get('profile/tour-moderate' + page)
            .then((res) => {
                if(query.page > res.data.data.last_page) 
                    error({ statusCode: 404, message: 'Page not found' })
                return { data: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Page not found' })
        })
    },

    methods: {
        linkGen(pageNum) {
            return { 
                path: '/profile/tour/moderate',
                query: pageNum !== 1 ? { page: pageNum } : null
            }
        },

        async createTour() {
            await this.$axios.get('profile/tour/create').then(res => {
                this.$router.push({path: '/profile/tour/' + res.data.data.id})
            })
        },
    },

}
</script>

<style scoped lang="sass">

</style>