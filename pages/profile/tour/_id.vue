<template>
    <section class="profile mt-5">
        <b-container>
            <b-row>
                <b-col cols="8" lg="3" class="mb-4 mb-lg-0">
                    <TourAvatar 
                        :url="'/profile/tour/upload-avatar/' + form.id"
                        :img="form.avatar"
                        @change="setAvatar"/>
                </b-col>
                <b-col lg="9">
                    <b-form @submit.prevent="saveTour">
                        <b-card class="block-shadow border25 mb-4">
                            <div class="card-title mb-4">Основная информация</div>
                            <b-form-group class="custom-input mb-4">
                                <b-input v-model="form.name" placeholder="Введите название экскурсии" id="name"></b-input>
                                <label for="name">Введите название экскурсии</label>
                                <div class="invalid-feedback d-block" v-if="errors.name">
                                    {{ errors.name[0] }}
                                </div>
                            </b-form-group>

                            <CityDisabled 
                                v-if="form.city_id"
                                :current="form.city_id"
                                @delete="deleteLocation"></CityDisabled>
                            
                            <div class="mb-4">
                                <City 
                                    v-if="!form.city_id"
                                    @change="changeLocation"></City>
                                <div class="invalid-feedback d-block" v-if="errors.city_id">
                                    {{ errors.city_id[0] }}
                                </div>
                            </div>
                            

                            <b-form-group class="custom-input mb-4">
                                <b-input v-model="form.tour_route" placeholder="Маршрут экскурсии" id="tour_route"></b-input>
                                <label for="tour_route">Маршрут экскурсии</label>
                                <span class="form-helper">Введите краткое описание маршрута, напр. Колизей — Ватикан — Вилла Д’Эсте</span>
                                <div class="invalid-feedback d-block" v-if="errors.tour_route">
                                    {{ errors.tour_route[0] }}
                                </div>
                            </b-form-group>

                            <b-form-group class="custon-input mb-4">
                                <Tags label="Выберите язык" 
                                    :selected="form.tour_language"
                                    :options="helpers.language"
                                    :err="errors.tour_language"
                                    placeholder="Выберите"
                                    @change="changeLanguage"
                                    @delete="deleteLanguage"></Tags>
                                <div class="invalid-feedback d-block" v-if="errors.tour_language">
                                    {{ errors.tour_language[0] }}
                                </div>
                            </b-form-group>

                        </b-card>

                        <b-card class="block-shadow border25 mb-4">

                            <b-row>
                                <b-col md="6" class="mt-3">
                                    <b-form-group class="custom-input mb-4">
                                        <VueSelect
                                            :option="helpers.category"
                                            :current="form.category_id"
                                            @change="changeCategoryId"
                                            placeholder = "Категория экскурсии"
                                        ></VueSelect>
                                        <div class="invalid-feedback d-block" v-if="errors.category_id">
                                            {{ errors.category_id[0] }}
                                        </div>
                                    </b-form-group>
                                </b-col>

                                <b-col md="6" class="mt-3">
                                    <b-form-group class="custom-input mb-4">
                                        <VueSelect
                                            :option="helpers.people_category"
                                            :current="form.people_category_id"
                                            @change="changePeopleCategoryId"
                                            placeholder = "Категория доступности"
                                        ></VueSelect>
                                        <div class="invalid-feedback d-block" v-if="errors.people_category_id">
                                            {{ errors.people_category_id[0] }}
                                        </div>
                                    </b-form-group>
                                </b-col>

                                <b-col md="3">
                                    <b-form-group class="custom-input mb-4">
                                        <b-input v-model.number="form.people_count" type="number" placeholder="Количество участников" id="people_count"></b-input>
                                        <label for="people_count">Количество участников</label>
                                    </b-form-group>
                                </b-col>

                                <b-col md="3">
                                    <b-form-group class="custom-input mb-4">
                                        <VueSelect
                                            :option="helpers.timing"
                                            :current="form.timing_id"
                                            @change="changeTimingId"
                                            placeholder = "Длительность экскурсии"
                                        ></VueSelect>
                                    </b-form-group>
                                </b-col>

                                <b-col md="6">
                                    <b-row>
                                        <b-col>
                                            <b-form-group class="custom-input mb-4">
                                                <b-input v-model.number="form.price" type="number" placeholder="Стоимость" id="price"></b-input>
                                                <label for="price">Стоимость</label>
                                            </b-form-group>
                                        </b-col>

                                        <b-col>
                                            <b-form-group class="custom-input mb-4">
                                                <VueSelect
                                                    :option="helpers.currency"
                                                    :current="form.currency_id"
                                                    @change="changeCurrencyId"
                                                    placeholder = "Валюта"
                                                ></VueSelect>
                                            </b-form-group>
                                        </b-col>

                                        <b-col>
                                            <b-form-group class="custom-input mb-4">
                                                <VueSelect
                                                    :option="helpers.price_type"
                                                    :current="form.price_type_id"
                                                    @change="changePriceTypeId"
                                                    placeholder = "Выберите"
                                                ></VueSelect>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <!-- errors -->
                                <b-col cols="12">
                                    <div class="invalid-feedback d-block" v-if="errors.people_count">
                                        {{ errors.people_count[0] }}
                                    </div>
                                    <div class="invalid-feedback d-block" v-if="errors.timing_id">
                                        {{ errors.timing_id[0] }}
                                    </div>
                                    <div class="invalid-feedback d-block" v-if="errors.price">
                                        {{ errors.price[0] }}
                                    </div>
                                    <div class="invalid-feedback d-block" v-if="errors.currency_id">
                                        {{ errors.currency_id[0] }}
                                    </div>
                                    <div class="invalid-feedback d-block" v-if="errors.price_type_id">
                                        {{ errors.price_type_id[0] }}
                                    </div>
                                </b-col>
                            </b-row>
                        </b-card>

                        <b-card class="block-shadow border25 mb-4">
                            <b-row>
                                <b-col md="6">
                                    <b-form-group class="custom-input mb-4">
                                        <b-input v-model.number="form.tour_services" placeholder="Услуги" id="tour_services"></b-input>
                                        <label for="tour_services">Услуги</label>
                                        <div class="form-helper">Введите через запятую услуги, которые входят в экскурсию</div>
                                        <div class="invalid-feedback d-block" v-if="errors.tour_services">
                                            {{ errors.tour_services[0] }}
                                        </div>
                                    </b-form-group>
                                </b-col>

                                <b-col md="6">
                                    <b-form-group class="custom-input mb-4">
                                        <b-input v-model.number="form.tour_more" placeholder="Дополнительные расходы" id="tour_more"></b-input>
                                        <label for="tour_more">Дополнительные расходы</label>
                                        <div class="form-helper">Введите через запятую дополнительные расходы</div>
                                        <div class="invalid-feedback d-block" v-if="errors.tour_more">
                                            {{ errors.tour_more[0] }}
                                        </div>
                                    </b-form-group>
                                </b-col>

                                <b-col md="6">
                                    <b-form-group class="custom-input mb-2">
                                        <b-input v-model.number="form.tour_other" placeholder="Что с собой взять" id="tour_other"></b-input>
                                        <label for="tour_other">Что с собой взять</label>
                                        <div class="invalid-feedback d-block" v-if="errors.tour_other">
                                            {{ errors.tour_other[0] }}
                                        </div>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-card>

                        <!-- About -->
                        <b-card class="block-shadow border25 mb-4">
                            <div class="card-title mb-0">Расскажите туристам об экскурсии</div>
                            <div class="card-title-small mb-3">
                                не использовать тексты с других сайтов. Проверить уникальность текста 
                                <a href="text.ru" target="_blank">text.ru</a>
                            </div>
                            <b-form-group class="custom-input mb-0">
                                <textarea wrap="soft" cols="30" rows="12" 
                                        :class="'form-control' 
                                                + [errors['user_data.about'] ? ' is-invalid' : '']" 
                                        v-model="form.about"></textarea>
                                <div class="invalid-feedback d-block" v-if="errors.about">
                                    {{ errors.about[0] }}
                                </div>
                            </b-form-group>
                        </b-card>

                         <!-- Images Uploader -->
                        <b-card class="block-shadow border25 mb-4">
                            <div class="card-title mb-0">Фотографии экскурсии</div>
                            <div class="card-title-small mb-3"></div>

                            <MultiUploader
                                :items="form.tour_image" 
                                :url="'profile/tour/multi-upload/' + form.id" 
                                :urldelete="'profile/tour/multi-upload/' + form.id + '/delete'"
                                @change="changeImage"/>

                            <div class="invalid-feedback d-block" v-if="errors.tour_image">
                                {{ errors.tour_image[0] }}
                            </div>
                        </b-card>

                        <b-form-group class="custom-input d-flex justify-content-center">
                            <b-button type="submit" class="btn btn-sm btn-blue">Сохранить</b-button>
                        </b-form-group>

                    </b-form> 
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Tags from '~/components/Tags'
import City from '~/components/City'
import CityDisabled from '~/components/CityDisabled'
import VueSelect from '~/components/VueSelect'
import MultiUploader from '~/components/Uploader/MultiUploader'
import TourAvatar from '~/components/Uploader/TourAvatar'

export default {
    middleware: ['auth'],

    components: { 
        Tags,
        City,
        CityDisabled,
        VueSelect,
        MultiUploader,
        TourAvatar,
    },

    head() {
        return {
            title: this.form.name ? this.form.name : 'Создание тура'
        }
    },

    async asyncData ({ store, params, error }) {
        await store.dispatch('helpers/all/getHelpers')

        return store.$axios.get(`profile/tour/${params.id}`)
            .then((res) => {
                return { form: res.data.data }
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
        saveTour() {
            console.log(this.form);
            
            this.$axios.post('/profile/tour', this.form).then(res => {
                this.$bvToast.toast(res.data.message, {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })
            }).catch(error => {
                this.$bvToast.toast('Неправильно заполнены поля формы', {
                    title: 'Ошибка!',
                    autoHideDelay: 5000,
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })
            })
        },
        deleteLocation(id) {
            this.form.city_id = null 
        },

        changeLocation(id) {
            this.form.city_id = id
        },

        changeLanguage(id) {
            this.form.tour_language.push(id)
        },

        deleteLanguage(id) {
            this.form.tour_language = this.form.tour_language.filter(x => x !== id)
        },

        changeCategoryId(id) {
            this.form.category_id = id
        },

        changePeopleCategoryId(id) {
            this.form.people_category_id = id
        },

        changeTimingId(id) {
            this.form.timing_id = id
        },

        changePriceTypeId(id) {
            this.form.price_type_id = id 
        },

        changeCurrencyId(id) {
            this.form.currency_id = id
        },

        changeImage(obj) {
            this.form.tour_image = obj
        },

        setAvatar(path) {
            this.form.avatar = path;
        }
    },
}
</script>

<style scoped>

</style>