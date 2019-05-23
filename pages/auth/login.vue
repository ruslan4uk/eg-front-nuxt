<template>
    <section class="auth mt-md-5">
        <b-container>
            <b-row class="align-items-center justify-content-center justify-content-lg-between">
                <b-col md="8" lg="6" class="mb-5">
                    <img src="~assets/images/auth/login.png" alt="">
                </b-col>
                <b-col md="8" lg="5" class="ml-lg-auto">
                    <div class="auth__title">Поехали!</div>
                    <div class="auth__subtitle">Мы рады Вашему возвращению</div>
                    <div class="auth__form mt-3 mt-md-4">
                        <b-form @submit.prevent="login">
                            <b-form-group class="custom-input">
                                <b-form-input id="email" placeholder="Введите Email" v-model="form.email"></b-form-input>
                                <label for="email">Введите Email</label>
                                <div class="invalid-feedback d-block" v-if="errors.email">
                                    {{ errors.email }}
                                </div>
                            </b-form-group>

                            <b-form-group class="custom-input">
                                <b-form-input id="password" placeholder="Ваш пароль" v-model="form.password"></b-form-input>
                                <label for="password">Ваш пароль</label>
                            </b-form-group>

                            <b-form-group class="custom-checkbox mb-4">
                                <input class="form-check-input" type="checkbox" name="remember" id="remember">
                                <label class="form-check-label" for="remember">Запомнить меня</label>
                            </b-form-group>

                            <b-form-group class="custom-input">
                                <b-button type="submit" class="btn btn-md btn-blue auth__btn">Ок!</b-button>
                            </b-form-group>
                        </b-form>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    remember_me: true,
                },
            }
        },

        methods: {
            async login() {                
                await this.$auth.login({ data: this.form });

                if(this.user.active === 0) {
                    this.$router.push({path: '/profile'});
                } else {
                    this.$router.push({name: 'index'});
                }
            }   
        },

        created() {
            // console.log(this.$auth);
        },
    }
</script>

<style scoped>

</style>