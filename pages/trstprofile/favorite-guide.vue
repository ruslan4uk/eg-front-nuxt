<template>
    <div class="trst">
        <section class="container">
            <div class="row">
                <div class="col-12 col-lg-3">
                    <LeftNavigation />
                </div>
                <div class="col-12 col-lg-9">
                    <b-card class="block-shadow border25 mb-4 trst-favorite">
                        <div class="card-title mb-4 mt-2">Избранные гиды</div>

                        <b-row>
                            <b-col cols="12" v-if="favoriteGuide.length < 1">
                                <p>Избранных гидов нет</p>
                            </b-col>
                            <b-col cols="6" md="4" lg="3" v-for="(item,index) in favoriteGuide" :key="index" v-if="favoriteGuide.length > 0">
                                <nuxt-link :to="{ name: 'guide-guide', params: { guide: item.id } }" class="trst-favorite__item border25 mb-5">
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
                                    <p class="trst-favorite__tour-count">{{ item.tour_count }} {{ declOfNum(item.tour_count, ['экскурсия', 'экскурсии', 'экскурсий']) }}</p>
                                </nuxt-link>
                            </b-col>
                        </b-row>
                        
                    </b-card>

                    <p class="trst-favorite__descr mt-4">
                        * Что бы удалить гида из избранного, кликните на звездочку
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

    data() {
        return {
            favoriteGuide: {}
        }
    },

    async mounted () {
        await this.$axios.get('/profile/favorite-guide').then(res => {
            this.favoriteGuide = res.data.data.user_favorite_guide
        })
    },

    methods: {
        declOfNum(number, titles) {  
            var cases = [2, 0, 1, 1, 1, 2];  
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
        },

        deleteFavorite(id) {
            this.$axios.post('/profile/favorite-guide', {id: id}).then(res => {
                this.favoriteGuide = this.favoriteGuide.filter(x => x.pivot.guide_id !== id)
            })
        }
    },

}
</script>

<style lang="sass" scoped>

</style>