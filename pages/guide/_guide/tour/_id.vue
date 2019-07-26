<template>
    <section class="tour">
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-3 tour__left pr-lg-4 mb-4">
                <div class="tour__guide border25 py-4 mb-3">
                    <div class="title mb-3">Гид</div>
                    <div class="mb-4">
                        <nuxt-link :to="'/guide/' + guide.id" class="tour__guide-avatar mb-3">
                            <img :src="baseImgPath + guide.avatar" alt="" class="border25" v-if="guide.avatar">
                            <img src="~/assets/images/general/avatar-blank.jpg" alt="" class="border25" v-if="!guide.avatar">
                        </nuxt-link>
                        
                        <nuxt-link :to="'/guide/' + guide.id" class="tour__guide-name">
                            {{ guide.name }}
                        </nuxt-link>
                    </div>

                    <div class="d-block mb-3">
                        <div class="subtitle mb-0">Услуги:</div>
                        <div class="tour__services" v-for="(service, index) in guide.user_service" :key="index">
                            {{ service.name }}
                        </div>
                    </div>

                    <div class="tour__contact">
                        <div class="subtitle mb-0">Контакты:</div>
                        <div class="tour__contact-item mb-1"
                            v-for="(contact, index) in guide.user_contact_type" :key="index">
                            <span v-b-tooltip.hover :title="contact.contact_type[0].name">
                                {{ contact.text }}
                            </span>   
                            <span class="ml-2"></span>
                        </div>
                    </div>

                </div>

                <div class="d-block tour__small mb-3" v-if="tour.tour_services">
                    <p class="mb-1"><strong>Услуги:</strong></p>
                    {{ tour.tour_services }}
                </div>

                <div class="d-block tour__small mb-3" v-if="tour.tour_more">
                    <p class="mb-1"><strong>Дополнительные расходы:</strong></p>
                    {{ tour.tour_more }}
                </div>

                <div class="d-block tour__small mb-3" v-if="tour.tour_other">
                    <p class="mb-1"><strong>Что с собой взять:</strong></p>
                    {{ tour.tour_other }}
                </div>

            </div>

            <div class="col-12 col-lg-9 tour__right">
                <div class="tour__title mb-3">{{ tour.name }}</div>
                <div class="tour__slider position-relative" v-if="tour.tour_image.length > 0">
                    <FavoriteBadge :userId="tour.id" type="tour"></FavoriteBadge>
                    <b-carousel
                        id="carousel-1"
                        :interval="4000"
                        fade
                        controls
                        img-width="1024"
                        img-height="480" >
                        <b-carousel-slide v-for="(slide, index) in tour.tour_image" :key="index">
                            <img slot="img"
                                class="d-block img-fluid w-100 border25"
                                width="1024"
                                height="480"
                                :src="baseImgPath + slide.image">
                        </b-carousel-slide>
                    </b-carousel>
                </div>
                
                <div class="tour__card">
                    <div class="card block-shadow border25">
                        <div class="card-body">
    
                            <div class="row mb-4">
                                <div class="col tour__about-item">
                                    <div class="tour__about-icon mb-1">
                                        <fa :icon="['fas', 'map-marker-alt']"/>
                                    </div>
                                    {{ tour.tour_city[0].name }}, {{ tour.tour_city[0].city_country.name }}
                                </div>
                                <div class="col tour__about-item">
                                    <div class="tour__about-icon mb-1">
                                        <fa :icon="['fas', 'history']"/>
                                    </div>
                                    {{ tour.tour_timing[0].name }}
                                </div>
                                <div class="col tour__about-item">
                                    <div class="tour__about-icon mb-1">
                                        <fa :icon="['fas', 'user-friends']"/>
                                    </div>
                                    {{ tour.people_count }} человек 
                                </div>
                                <div class="col tour__about-item">
                                    <div class="tour__about-icon mb-1">
                                        <fa :icon="['fas', 'money-bill-alt']"/>
                                    </div>
                                    {{ tour.price }} 
                                    <fa :icon="['fas', tour.tour_currency[0].iso_code]" /> 
                                    {{ tour.tour_price_type[0].name }}
                                </div>
                            </div>
    
                            <hr />
        
                            <div class="tour__about">
                                <div class="subtitle mb-3 textarea-pre-wrap">Описание экскурсии</div>
                                {{ tour.about }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

</template>

<script>
import FavoriteBadge from '~/components/Frontend/FavoriteBadge'

export default {

    head() {
        return {
            title: 'Экскурсия частного гида: "' + this.tour.name + '" город ' + this.tour.tour_city[0].name + ' — «Еxcursguide ' + this.tour.tour_city[0].name + '»'
        }
    },

    components: { 
        FavoriteBadge,
    },

    async asyncData({route, store, params, query, redirect, error}) {
        console.log(query);
        
        return store.$axios.get(`guide/${params.guide}/tour/${params.id}`, {params: { preview: query.preview }})
            .then((res) => {
                return { guide: res.data.data, tour: res.data.data.tour[0] }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Post not found' })
        })
    },

}
</script>

<style scoped>

</style>