<template>
    <div class="trst footer-fix">
        <section class="container">
            <div class="row">
                <div class="col-12 col-lg-3">
                    <LeftNavigation />
                </div>
                <div class="col-12 col-lg-9">

                    <b-card class="block-shadow border25 mb-4">
                        <div class="card-title mb-4 mt-2">Смена пароля</div>
                        <b-form @submit.prevent="saveProfile" class="mt-4 row">
                            <b-col cols="12" md="6">
                                <b-form-group class="custom-input mb-4">
                                    <b-input v-model="form.current_password" placeholder="Введите старый пароль" id="current_password"></b-input>
                                    <label for="current_password">Введите старый пароль</label>
                                    <div class="invalid-feedback d-block" v-if="errors.current_password">
                                        {{ errors.current_password[0] }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="6">
                                <b-form-group class="custom-input mb-4">
                                    <b-input v-model="form.new_password" placeholder="Введите новый пароль" id="new_password"></b-input>
                                    <label for="new_password">Введите новый пароль</label>
                                    <div class="invalid-feedback d-block" v-if="errors.new_password">
                                        {{ errors.new_password[0] }}
                                    </div>
                                </b-form-group>
                            </b-col>

                            <b-form-group class="col-12">
                                <b-button type="submit" class="btn btn-sm btn-blue">Сохранить</b-button>
                            </b-form-group>
                            
                        </b-form>

                    </b-card>
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
            form: {
                current_password: '',
                new_password: ''
            }
        }
    },

    methods: {
        saveProfile() {
            this.$axios.post('/auth/change-password', this.form).then(res => {
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
        }
    },

}
</script>

<style lang="sass" scoped>

</style>