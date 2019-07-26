<template>
    <div class="trst">
        <section class="container">
            <div class="row">
                <b-col cols="12" lg="3" class="mb-4">
                    <LeftNavigation />
                </b-col>
                <div class="col-12 col-lg-9">
                    <b-card class="block-shadow border25 mb-4 trst-favorite">
                        <div class="card-title mb-4 mt-2">Избранные гиды</div>

                        <b-row>
                            <b-col cols="12" v-if="favoriteTour.length < 1">
                                <p>Избранных Экскурсий нет</p>
                            </b-col>
                            <b-col cols="6" md="6" lg="4" v-for="(item,index) in favoriteTour" :key="index">
                                <nuxt-link :to="'/guide/' + item.user_id + '/tour/' + item.id" class="trst-favorite__item border25 mb-5">
                                    <div class="favorite__badge" @click.prevent="deleteFavorite(item.id)">
                                        <fa :icon="['fas', 'star']" />
                                    </div>
                                    <b-img-lazy 
                                        fluid-grow
                                        v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}" 
                                        :blank-src="require('~/assets/images/general/blank.png')"
                                        :src="item.avatar ? item.avatar : require('~/assets/images/general/blank.png')"
                                        class="border25 mb-2"></b-img-lazy>
                                    <div class="trst-favorite__title mb-1">{{ item.name }}</div>
                                    <p class="trst-favorite__tour-count">{{ item.about  | truncate(100)}}</p>
                                </nuxt-link>
                            </b-col>
                        </b-row>
                        
                    </b-card>

                    <p class="trst-favorite__descr mt-4">
                        * Что бы удалить экскурсию из избранного, кликните на звездочку
                    </p>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
import LeftNavigation from '~/components/Trst/LeftNavigation'

export default {
    middleware: ['auth', 'emailConfirm', 'checkRole'],

    components: {
        LeftNavigation
    },

    filters: {
        truncate(string, value) {
            return string.substring(0, value) + '…';
        }
    },

    data() {
        return {
            favoriteTour: {}
        }
    },

    async mounted () {
        await this.$axios.get('/profile/favorite-tour').then(res => {
            this.favoriteTour = res.data.data.user_favorite_tour
        })
    },

    methods: {
        declOfNum(number, titles) {  
            var cases = [2, 0, 1, 1, 1, 2];  
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
        },

        deleteFavorite(id) {
            this.$axios.post('/profile/favorite-tour', {id: id}).then(res => {
                this.favoriteTour = this.favoriteTour.filter(x => x.pivot.tour_id !== id)
            })
        }
    },

}
</script>

<style lang="sass" scoped>

</style>