<template>
    <div class="trst footer-fix">
        <b-container>
            <b-row>
                <b-col cols="12" lg="3" class="mb-4">
                    <LeftNavigation />
                </b-col>
                <b-col cols="12" lg="9">
                    <b-card class="block-shadow border25 mb-4">
                        <ProfileAvatar url="/profile/upload-avatar" descr="false" @change="setAvatar"/>
                        
                        <hr />

                        <b-form @submit.prevent="saveProfile" class="mt-4 row">
                            <b-col cols="12">
                                <b-form-group class="custom-input mb-4">
                                    <b-input v-model="form.name" placeholder="Иванов Иван" id="name"></b-input>
                                    <label for="name">Введите Ваше ФИО или название компании</label>
                                    <div class="invalid-feedback d-block" v-if="errors.name">
                                        {{ errors.name[0] }}
                                    </div>
                                </b-form-group>
                            

                                <div class="card-subtitle mb-4 mt-2">Контактная информация</div>
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

                                <b-form-group class="custom-input d-flex justify-content-center mb-3 mt-3">
                                    <b-button type="submit" class="btn btn-sm btn-blue">Сохранить</b-button>
                                </b-form-group>

                            </b-col>
                        </b-form>

                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

import LeftNavigation from '~/components/Trst/LeftNavigation'
import ProfileAvatar from '~/components/Uploader/ProfileAvatar'
import Contacts from '~/components/Contacts'
import { mapGetters, mapMutations } from 'vuex';

export default {
    middleware: ['auth', 'emailConfirm', 'checkRole'],

    components: {
        LeftNavigation,
        ProfileAvatar,
        Contacts
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
        })
    },

    methods: {
        saveProfile() {
            this.$axios.post('/trstprofile', this.form).then(res => {
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

        addContact() {
            if (this.form.user_contact.length < 3)
                this.form.user_contact = this.form.user_contact.concat({type: null, text: null})
            else 
                this.$bvToast.toast('Не более 3 контактов', {
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
            setAvatar: 'auth/SET_AVATAR'
        }),

    },

}
</script>

<style lang="sass" scoped>

</style>