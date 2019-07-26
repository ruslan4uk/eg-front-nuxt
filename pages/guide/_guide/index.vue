
<template>
<div>
    <section class="guide-blue-line"></section>
    <section class="guide pt-5">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-3 pr-lg-4 mb-4 text-center text-md-left">
                    <div class="guide__avatar mb-3 position-relative">
                        <FavoriteBadge :userId="guide.id" type="guide"></FavoriteBadge>
                        <img :src="baseImgPath + guide.avatar" alt="" class="border25" v-if="guide.avatar">
                        <img src="~/assets/images/general/avatar-blank.jpg" alt="" class="border25" v-if="!guide.avatar">
                    </div>
                    <div class="guide__name mb-3">{{ guide.name }}</div>
                                        
                    <div class="mb-3">
                        <div class="subtitle mb-1">Владение языками</div>
                        <div class="guide__small pb-1" 
                            v-for="(language, index) in guide.user_language" :key="index">
                            <span :class="'mr-1 flag-icon flag-icon-' + language.iso_code + ' flag-icon-squared'"></span>
                            <span class="pb-1">{{ language.name }}</span></div>
                    </div> 
                                                               
                    <div class="mb-3">
                        <div class="subtitle mb-1">Услуги</div>
                        <div class="guide__small"
                            v-for="(service, index) in guide.user_service" :key="index">{{ service.name }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="subtitle mb-1">Города проживания</div>
                        <div class="guide__small"
                            v-for="(location, index) in guide.user_city" :key="index">
                            <div class="mb-2">
                                <i class="fas fa-map-marker-alt"></i>
                                <fa :icon="['fas', 'map-marker-alt']" />
                                {{ location.name }}, {{ location.city_country }}
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="subtitle mb-1">Контакты</div>
                        <div class="guide__small"
                            v-for="(contact, index) in guide.user_contact_type" :key="index">
                            <div class="mb-1">
                                <span v-b-tooltip.hover :title="contact.contact_type[0].name">
                                    {{ contact.text }}
                                </span>                                    
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Right coll  -->
                <div class="col-12 col-lg-9">
                    
                    <div class="card block-shadow border25 mb-3">
                        <div class="card-body">

                            <div class="alert alert-info" v-if="guide.active === 0">
                                Внимание! Профиль находится на модерации! Эта страница доступна только вам!
                            </div>

                            <div class="guide__about mb-4">
                                <div class="title mb-2">Обо мне</div>
                                <div class="guide__small textarea-pre-wrap">{{ guide.about }}</div>
                            </div>
                            
                            <div class="guide__tours">
                                <div class="title mb-3">Экскурсии</div>
                                <div class="row">
                                
                                    <div class="col-12 col-sm-6 col-lg-4 mb-4" v-for="(tour, index) in guide.tour" :key="index">
                                        <div class="border25">
                                            <nuxt-link :to="'/guide/' + guide.id + '/tour/' + tour.id" class="border25 mb-3">
                                                <img src="~/assets/images/general/blank.png" alt="" class="border25 mb-3" v-if="!tour.avatar" />
                                                <img :src="baseImgPath + tour.avatar" alt="" class="border25 mb-3" v-if="tour.avatar" />
                                            </nuxt-link>

                                            <nuxt-link :to="'/guide/' + guide.id + '/tour/' + tour.id" class="subtitle d-block mb-2">
                                                {{ tour.name }}
                                            </nuxt-link>
                                            
                                            <div class="d-block">
                                                <div class="tour-item__time mb-2" data-toggle="tooltip" data-placement="top" title="Длительность экскурсии">
                                                    <i class="fas fa-history"></i>
                                                    <span>{{ tour.tour_timing[0].name }}</span>
                                                </div>
                                                <div class="tour-item__price">
                                                    от <span>{{ tour.price }}</span>
                                                    <fa :icon="['fas', tour.tour_currency[0].iso_code]" /> 
                                                    {{ tour.tour_price_type[0].name }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12" v-if="!guide.tour">
                                        <div class="alert alert-info">
                                            У гида еще нет экскурсий
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Comment -->
                    <div class="card block-shadow border25 mb-3">
                        <div class="card-body">
                            <div class="title mb-3">Комментарии</div>

                            <div class="guide__comments">
                                
                                <div class="row mb-4 pb-4 guide__comments-item"
                                    v-for="(comment, index) in guide.user_comment" :key="index">
                                    <div class="col-4 col-md-2">
                                        <nuxt-link :to="{name: 'guide-guide', params: {guide: comment.id}}">
                                            <b-img-lazy 
                                                fluid-grow
                                                v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}" 
                                                :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                                                :src="baseImgPath + comment.avatar" 
                                                class="border25 mb-3"
                                                v-if="comment.avatar"></b-img-lazy>

                                            <b-img-lazy 
                                                fluid-grow
                                                v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}" 
                                                :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                                                :src="require('~/assets/images/general/avatar-blank.jpg')" 
                                                class="border25 mb-3"
                                                v-if="!comment.avatar"></b-img-lazy>
                                        </nuxt-link>
                                    </div>
                                    
                                    <div class="col-12 col-md-10">
                                        <nuxt-link :to="{name: 'guide-guide', params: {guide: comment.id}}">
                                            <div class="title">{{ comment.name }}</div>
                                        </nuxt-link>
                                        <div class="guide__small mb-2"><small>{{ comment.pivot.created_at }}</small></div>
                                        <div class="guide__small textarea-pre-wrap">{{ comment.pivot.text }}</div>
                                    </div>
                                </div>
                                
                                <div class="alert alert-info mb-3" v-if="guide.user_comment.length === 0">
                                    Гида пока никто не прокоментировал, сделайте это первыми
                                </div>

                                
                               
                            </div>
                            
                            <div class="guide__comment">
                                <div class="title mb-3">Написать комментарий</div>

                                <div class="alert alert-info mb-3" v-if="!authenticated">
                                    Вы не можете оставлять Комментарии, Вы должны <nuxt-link to="/auth/login">зарегистрироваться</nuxt-link>!
                                </div>

                                <b-form @submit.prevent="addComment" v-if="authenticated">
                                    <b-form-group>
                                        <textarea v-model="form.text" name="comment" id="" rows="5" class="form-control border25"></textarea>

                                        <div class="invalid-feedback d-block" v-if="errors.text">
                                            Поле обязательно для заполнения
                                        </div>
                                    </b-form-group>
                                    <b-form-group>
                                        <b-button type="submit" class="btn btn-sm btn-blue">Отправить</b-button>
                                    </b-form-group>
                                </b-form>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>
</div>
</template>

<script>
import FavoriteBadge from '~/components/Frontend/FavoriteBadge'

export default {
    
    head() {
        return {
            title: 'Гид ' + this.guide.name + ' — Excursguide гид Москва'
        }
    },
    
    layout (context) {
      return 'guide'
    },

    components: { 
        FavoriteBadge,
    },

    data() {
        return {
            form: {
                text: ''
            }
        }
    },

    async asyncData({route, store, params, query, redirect, error}) {
        
        return store.$axios.get(`guide/${params.guide}`, {params: { preview: query.preview }})
            .then((res) => {
                return { guide: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Post not found' })
        })
        
    },

    methods: {
        addComment() {
            this.$axios.post(
                this.$route.path + '/comment', 
                {text: this.form.text, user_id: this.user.id}
            ).then(res => {
                this.guide.user_comment = res.data.data.user_comment
                this.form.text = ''
            })
        },
    },
}
</script>

<style scoped>

</style>