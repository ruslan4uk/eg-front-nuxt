<template>
    <section class="auth-confirm footer-fix">
        <b-container>
            <b-row class="align-items-center">
                <b-col cols="12" lg="6" class="text-center mb-5">
                    <img src="~assets/images/auth/confirm.png" alt="">
                </b-col>
                <b-col cols="12" lg="6" class="mb-5">
                    <div class="auth__title mb-2">Осталось еще чуть-чуть</div>
                    <div class="auth__subtitle mb-3">Чтобы завершить регистрацию подтвердите свой эл.адрес</div>
                    <!-- <a href="" class="btn btn-blue" @click.prevent="reloadData()">Обновить</a> -->
                </b-col>
                <!-- <b-col cols="12" lg="6" class="mb-5" v-if="account_confirm">
                    <div class="auth__title mb-2">Осталось еще чуть-чуть</div>
                    <div class="auth__subtitle mb-3">Ваш аккаунт успешно подтвержден</div>
                    <nuxt-link to="/" class="btn btn-blue">На главную</nuxt-link>
                </b-col> -->
            </b-row>
        </b-container>
    </section>
</template>

<script>
    export default {

        watchQuery: ['mail', 'hash'],

        asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

            return store.$axios.post(route.path, {mail: query.mail, hash: query.hash })
                .then((res) => {
                    return { account_confirm: true }
                })
                .catch((e) => {
                    return { account_confirm: false }
            })

        },
        
        methods: {
            reloadData() {
                this.$auth.fetchUser();
            }
        },

    }
</script>

<style scoped>

</style>