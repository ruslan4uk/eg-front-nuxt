<template>
    <section class="profile mt-5">
        <b-container>
            <b-row>
                <b-col cols="8" lg="3" class="mb-4 mb-lg-0">
                    <!-- Avatar -->
                </b-col>
                <b-col lg="9">
                    <b-form>
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
                                    :options="languagies"
                                    :err="errors.user_language"
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
                                            :option="categories"
                                            :current="form.category_id"
                                            @change="changeCategoryId"
                                            placeholder = "Категория экскурсии"
                                        ></VueSelect>
                                    </b-form-group>
                                </b-col>

                                <b-col md="6" class="mt-3">
                                    <b-form-group class="custom-input mb-4">
                                        <VueSelect
                                            :option="people_category"
                                            :current="form.people_category_id"
                                            @change="changePeopleCategoryId"
                                            placeholder = "Категория доступности"
                                        ></VueSelect>
                                    </b-form-group>
                                </b-col>

                                <b-col md="3">
                                    <b-form-group class="custom-input mb-4">
                                        <b-input v-model.number="form.people_count" type="number" placeholder="Количество участников" id="people_count"></b-input>
                                        <label for="people_count">Количество участников</label>
                                        <div class="invalid-feedback d-block" v-if="errors.people_count">
                                            {{ errors.people_count[0] }}
                                        </div>
                                    </b-form-group>
                                </b-col>

                                <b-col md="3">
                                    <b-form-group class="custom-input mb-4">
                                        <VueSelect
                                            :option="timing"
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
                                                <div class="invalid-feedback d-block" v-if="errors.price">
                                                    {{ errors.price[0] }}
                                                </div>
                                            </b-form-group>
                                        </b-col>

                                        <b-col>
                                            <b-form-group class="custom-input mb-4">
                                                <VueSelect
                                                    :option="currencies"
                                                    :current="form.currency_id"
                                                    @change="changeCurrencyId"
                                                    placeholder = "Валюта"
                                                ></VueSelect>
                                            </b-form-group>
                                        </b-col>

                                        <b-col>
                                            <b-form-group class="custom-input mb-4">
                                                <VueSelect
                                                    :option="price_type"
                                                    :current="form.price_type_id"
                                                    @change="changePriceTypeId"
                                                    placeholder = "Выберите"
                                                ></VueSelect>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
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

export default {
    middleware: ['auth'],

    components: { 
        Tags,
        City,
        CityDisabled,
        VueSelect,
    },

    async asyncData ({ store, params, error }) {
        await store.dispatch('helpers/languagies/getLanguagies')
        await store.dispatch('helpers/categories/getCategories')
        await store.dispatch('helpers/peopleCategory/getPeopleCategory')
        await store.dispatch('helpers/timing/getTiming')
        await store.dispatch('helpers/priceType/getPriceType')
        await store.dispatch('helpers/currencies/getCurrencies')

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
            languagies: 'helpers/languagies/languagies',
            categories: 'helpers/categories/categories',
            people_category: 'helpers/peopleCategory/people_category',
            timing: 'helpers/timing/timing',
            price_type: 'helpers/priceType/price_type',
            currencies: 'helpers/currencies/currencies'
        }),
    },
    
    methods: {
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
        }
    },
}
</script>

<style scoped>

</style>