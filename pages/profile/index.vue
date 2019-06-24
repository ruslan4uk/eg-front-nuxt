<template>
    <section class="profile mt-5">
        <b-container>
            <b-row>
                <b-col lg="3" class="mb-4 mb-lg-0">
                    <ProfileAvatar url="/profile/upload-avatar" @change="setAvatar"/>
                    <div class="invalid-feedback d-block mb-3" v-if="errors.avatar">
                        {{ errors.avatar[0] }}
                    </div>
                    <nuxt-link 
                        :to="'/guide/' + user.id + '?preview=1'" 
                        class="btn btn-sm btn-block btn-blue mt-3"
                        v-if="user.active >= 0">Мой профиль</nuxt-link>
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
                                    :options="helpers.language"
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
                                    <div class="invalid-feedback d-block" v-if="errors.user_city_ids">
                                        {{ errors.user_city_ids[0] }}
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="custom-input mb-0 pb-0">
                                        <div class="btn btn-sm btn-small btn-blue" @click="addCity = !addCity">Добавить</div>
                                    </div>
                                </div>
                            </b-row>

                            <div class="card-subtitle mt-4 mb-4">Контакты</div>
                            <b-row>
                                <div class="col-12 col-md">
                                    <!-- TODO: Contacts -->
                                    <Contacts 
                                        v-if="form.user_contact.length < 1"
                                        :item="{type: null, text: null}"
                                        :errors="errors"
                                        :indexes="0"
                                        @change="changeContact"
                                        @delete="deleteContact"></Contacts>
                                    <Contacts 
                                        v-for="(contact, index) in form.user_contact" :key="index"
                                        :item="contact"
                                        :errors="errors"
                                        :indexes="index"
                                        @change="changeContact"
                                        @delete="deleteContact"></Contacts>
                                    <div class="invalid-feedback d-block" v-if="errors.user_contact">
                                        {{ errors.user_contact[0] }}
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="custom-input mb-0 pb-0">
                                        <div class="btn btn-sm btn-small btn-blue" @click="addContact">Добавить</div>
                                    </div>
                                </div>
                            </b-row>
                            
                           
                        </b-card>

                        <!-- Services -->
                        <b-card class="block-shadow border25 mb-4">
                            <div class="card-title mb-3">Услуги</div>
                            <b-form-group class="mb-2">
                                <div class="custom-checkbox custom-checkbox--profile mr-4 mb-2" 
                                    v-for="(service,index) in helpers.service" :key="index">
                                    <input type="checkbox" 
                                            :value="service.id" 
                                            v-model="form.user_service"
                                            :id="'service_' + index">
                                    <label class="form-check-label" :for="'service_' + index">{{ service.name }}</label>
                                </div>
                                <div class="invalid-feedback d-block" v-if="errors.user_service">
                                    {{ errors.user_service[0] }}
                                </div>
                            </b-form-group>
                        </b-card>

                        <!-- About -->
                        <b-card class="block-shadow border25 mb-4">
                            <div class="card-title mb-0">Расскажите туристам о себе</div>
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

                        <!-- License Uploader -->
                        <b-card class="block-shadow border25 mb-4">
                            <div class="card-title mb-0">Лицензия гида</div>
                            <div class="card-title-small mb-3">Если у Вас есть лицензия, обязательно покажите ее, это повысит уровень доверия к Вам</div>
                            
                            <MultiUploader
                                :items="form.user_license" 
                                url="/profile/multi-upload" 
                                urldelete="/profile/multi-upload/delete"
                                @change="changeLicense"/>

                            <div class="invalid-feedback d-block" v-if="errors.user_license">
                                {{ errors.user_license[0] }}
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
import { mapGetters, mapMutations } from 'vuex'
import Tags from '~/components/Tags'
import City from '~/components/City'
import CityDisabled from '~/components/CityDisabled'
import Contacts from '~/components/Contacts'
import MultiUploader from '~/components/Uploader/MultiUploader'
import ProfileAvatar from '~/components/Uploader/ProfileAvatar'
    
export default {
    middleware: ['auth'],

    components: { 
        Tags, 
        City, 
        CityDisabled, 
        MultiUploader,
        ProfileAvatar,
        Contacts,
    },

    head() {
        return {
            title: 'Настройка профиля' + this.form.name + ' - ExcursGuide'
        }
    },

    data() {
        return {
            addCity: false
        }
    },
   
    asyncData ({store}) {
        return {
            form: Object.assign({}, store.state.auth.user),
        }
    },

    async fetch({ store }) {
        await store.$auth.fetchUser()
        await store.dispatch('helpers/all/getHelpers')
    },

    computed: {
        ...mapGetters({
            helpers: 'helpers/all/helpers'
            // services: 'helpers/services/services',
            // languagies: 'helpers/languagies/languagies'
        })
    },

    methods: {
        saveProfile() {
            this.$axios.post('/profile', this.form).then(res => {
                this.form.user_contact = this.form.user_contact.filter(x => x.type !== null && x.text !== null)

                this.setUser(Object.assign({}, this.form))

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

        changeLanguage(id) {
            this.form.user_language = this.form.user_language.concat(id);     
        },
        deleteLanguage(id) {
            this.form.user_language = this.form.user_language.filter(x => x !== id);   
        },
        changeLocation(id){
            this.form.user_city_ids = this.form.user_city_ids.concat(id);   
        },
        deleteLocation(id) {
            this.form.user_city_ids = this.form.user_city_ids.filter(x => x !== id);
        },

        changeLicense(obj) {
            this.form.user_license = obj
            this.setLicense(this.form.user_license)
        },

        changeAvatar(url) {
            this.form.avatar = url
        },

        addContact() {
            if (this.form.user_contact.length < 5)
                this.form.user_contact = this.form.user_contact.concat({type: null, text: null})
            else 
                this.$bvToast.toast('Не более 5 контактов', {
                    title: 'Ошибка!',
                    autoHideDelay: 5000,
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })
        },

        changeContact(obj, index) {
            this.form.user_contact[index] = obj
        },

        deleteContact(index) {
            if(this.form.user_contact.length > 1)
                this.form.user_contact = this.form.user_contact.filter((x,i) => i !== index)
        },

        ...mapMutations({
            setUser: 'auth/SET_USER',
            setLicense: 'auth/SET_LICENSE',
            setAvatar: 'auth/SET_AVATAR'
        }),
        
    },
}
</script>

<style scoped>

</style>