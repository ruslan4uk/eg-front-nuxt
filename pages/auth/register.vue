<template>
    <section class="auth mt-md-5 footer-fix">
        <b-container>
            <b-row class="align-items-center justify-content-center justify-content-lg-between">
                <b-col md="8" lg="6" class="mb-5">
                    <img src="~assets/images/auth/register.png" alt="">
                </b-col>
                <b-col md="8" lg="5" class="ml-lg-auto">
                    <div class="auth__title">Сделайте первый шаг!</div>
                    <div class="auth__subtitle">И откройте много нового с сервисом</div>
                    <div class="auth__form mt-3 mt-md-4">
                        <b-form @submit.prevent="register">
                            <b-form-group class="custom-input">
                                <b-input v-model="form.name" id="name" placeholder="Введите Ваше ФИО"></b-input>
                                <label for="name">Введите Ваше ФИО</label>
                                <div class="invalid-feedback d-block" v-if="errors.name">
                                    {{ errors.name[0] }}
                                </div>
                            </b-form-group>

                            <b-form-group class="custom-input">
                                <b-input v-model="form.email" id="email" placeholder="Введите Ваш E-mail"></b-input>
                                <label for="email">Введите Ваш E-mail</label>
                                <div class="invalid-feedback d-block" v-if="errors.email">
                                    {{ errors.email[0] }}
                                </div>
                            </b-form-group>

                            <b-form-group class="custom-input">
                                <b-input v-model="form.password" id="password" placeholder="Придумайте пароль"></b-input>
                                <label for="password">Придумайте пароль</label>
                                <div class="invalid-feedback d-block" v-if="errors.password">
                                    {{ errors.password[0] }}
                                </div>
                            </b-form-group>

                            <b-form-group class="custom-input mb-3">
                                <b-input v-model="form.password_confirmation" id="password-confirm" placeholder="Повторите пароль"></b-input>
                                <label for="password-confirm">Повторите пароль</label>
                                <div class="invalid-feedback d-block" v-if="errors.password_confirmation">
                                    {{ errors.password_confirmation[0] }}
                                </div>
                            </b-form-group>

                            <!-- radio -->
                            <b-form-group>
                                <div class="custom-radio form-check-inline">
                                    <input name="role" type="radio" value="tourist" id='role_1' v-model="form.role" />
                                    <label for="role_1" class="mb-0">Я турист</label>
                                </div>
                                <div class="custom-radio form-check-inline">
                                    <input name="role" type="radio" value="guide" id='role_2' v-model="form.role" />
                                    <label for="role_2" class="mb-0">Я гид</label>
                                </div>
                                <div class="invalid-feedback d-block" v-if="errors.role">
                                    {{ errors.role[0] }}
                                </div>
                            </b-form-group>
                            <!-- end radio -->

                            <b-form-group class="custom-checkbox mb-4">
                                <input v-model="form.check_data" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    Согласие на обработку персональных данных
                                </label>
                                <div class="invalid-feedback d-block" v-if="errors.check_data">
                                    {{ errors.check_data[0] }}
                                </div>
                            </b-form-group>

                            <b-form-group class="custom-input">
                                <b-button type="submit" class="btn btn-md btn-blue auth__btn">Начинаем!</b-button>
                            </b-form-group>
                        </b-form>
                    </div>
                    <!-- Social auth btn -->
                    <div class="auth__social d-flex align-items-center">
                        <span>Вы также можете войти через</span>
                        <div class="auth__social-list ml-4">
                            <a href="" class="auth__social-item"><img src="~assets/images/general/vk.png" alt="" /></a>
                            <a href="" class="auth__social-item"><img src="~assets/images/general/ok.png" alt="" /></a>
                            <a href="" class="auth__social-item"><img src="~assets/images/general/fb.png" alt="" /></a>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
    export default {
        middleware: ['noGuest'],

        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '', 
                    check_data: '',
                    role: null,
                }
            }
        },

        methods: {
            register() {
                this.$axios.post('/auth/register', this.form).then(res => {
                    this.$bvToast.toast('Регистрация успешна', {
                        title: 'Внимание!',
                        autoHideDelay: 5000,
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-bottom-right',
                    })                    
                    this.$router.push({path: '/auth/login'})
                })
            }
        },
    }
</script>

<style scoped>

</style>