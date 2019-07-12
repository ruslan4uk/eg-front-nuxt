<template>
    <div class="trst">
        <b-container>
            <b-row>
                <b-col cols="12" lg="3" class="mb-5 d-none d-lg-block">
                    <LeftNavigation />
                </b-col>
                <b-col cols="12" lg="9">
                    <b-card class="block-shadow border25 mb-4">
                        <ProfileAvatar url="/profile/upload-avatar" descr="false" @change="setAvatar"/>
                        
                        <hr />

                        <b-form @submit.prevent class="mt-4 row">
                            <b-col cols="12">
                                <b-form-group class="custom-input mb-4">
                                    <b-input v-model="form.name" placeholder="Иванов Иван" id="name"></b-input>
                                    <label for="name">Введите Ваше ФИО или название компании</label>
                                    <div class="invalid-feedback d-block" v-if="errors.name">
                                        {{ errors.name[0] }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-form>

                        <div class="card-subtitle mb-4 mt-2">Контактная информация</div>

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

                        <b-form-group class="custom-input d-flex justify-content-center mb-3 mt-3">
                            <b-button type="submit" class="btn btn-sm btn-blue">Сохранить</b-button>
                        </b-form-group>

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
import { mapMutations } from 'vuex';

export default {
    middleware: ['auth'],

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

    methods: {
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
            setAvatar: 'auth/SET_AVATAR'
        }),
    },

}
</script>

<style lang="sass" scoped>

</style>