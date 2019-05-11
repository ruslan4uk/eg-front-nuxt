<template>
    <section class="profile mt-5">
        <b-container>
            <b-row>
                <b-col lg="3" class="mb-4 mb-lg-0">
                     <div class="profile__user d-flex align-items-center">
                        <div class="profile__avatar mr-3">
                            <img src="~assets/images/general/avatar-blank.jpg" alt="">                 
                        </div>
                        <div class="profile__username">{{ user.name }}</div>
                    </div>
                    <!-- <a href="" class="profile__avatar-upload">Добавить фото</a> -->
                    <label for="profile-avatar" class="profile__avatar-upload">Добавить фото</label>
                    <input type="file" name="avatar" ref="avatar" id="profile-avatar" class="profile__avatar-uploader">
                </b-col>

                <b-col lg="9">
                    <b-form @submit.prevent="saveProfile">
                        <b-card class="block-shadow border25 mb-4">
                            <div class="card-title mb-4">Основная информация</div>
                            <b-form-group class="custom-input mb-4">
                                <b-input v-model="form.name" placeholder="Иванов Иван" id="name"></b-input>
                                <label for="name">Введите Ваше ФИО или название компании</label>
                                <div class="invalid-feedback d-block" v-if="errors.name">
                                    {{ errors.name[0] }}
                                </div>
                            </b-form-group>

                            <div class="card-subtitle mb-3">Владение языками</div>
                            <b-form-group class="custon-input mb-4">
                                <Tags label="Выберите язык" 
                                    :selected="form.user_language"
                                    :options="languagies"
                                    :err="errors.user_language"
                                    placeholder="Выберите"
                                    @change="changeLanguage"
                                    @delete="deleteLanguage"></Tags>
                                <div class="invalid-feedback d-block" v-if="errors.user_language">
                                    {{ errors.user_language[0] }}
                                </div>
                            </b-form-group>

                            <div class="card-subtitle mb-3">Ваше местоположение</div>
                            <b-row>
                                <div class="col-12 col-md">
                                     <div v-if="form.user_city_ids.length > 0">
                                        <CityDisabled 
                                            v-for="(user_city, index) in form.user_city_ids"
                                            :key="index"
                                            :current="user_city"
                                            @delete="deleteLocation"></CityDisabled>
                                    </div>
                                    <div v-if="form.user_city_ids.length == 0 || addCity">
                                        <City @change="changeLocation"></City>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="custom-input mb-0 pb-0">
                                        <div class="btn btn-sm btn-small btn-blue js--location-add" @click="addCity = !addCity">Добавить</div>
                                    </div>
                                </div>
                            </b-row>
                           
                        </b-card>

                        {{ services }}

                        <hr>

                        {{ languagies }}

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
import { mapGetters, mapMutations } from 'vuex'
import Tags from '~/components/Tags'
import City from '~/components/City'
import CityDisabled from '~/components/CityDisabled'

    
export default {
    middleware: ['auth'],

    components: { Tags, City, CityDisabled },

    data() {
        return {
            addCity: false
        }
    },
   
    asyncData ({store}) {
        return {
            form: Object.assign({}, store.state.auth.user)
        }
    },

    async fetch({ store }) {
        await store.dispatch('helpers/languagies/getLanguagies')
        await store.dispatch('helpers/services/getServices')
    },

    computed: {
        ...mapGetters({
            services: 'helpers/services/services',
            languagies: 'helpers/languagies/languagies'
        })
    },

    methods: {
        saveProfile() {
            this.$axios.post('/profile', this.form).then(res => {
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

        ...mapMutations({
            changeLanguage: 'auth/SET_LANGUAGES',
            deleteLanguage: 'auth/DELETE_LANGUAGES',
            changeLocation: 'auth/SET_LOCATION',
            deleteLocation: 'auth/DELETE_LOCATION',
        }),
        
    },

}
</script>

<style scoped>

</style>