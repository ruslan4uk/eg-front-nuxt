<template>
    <section :class="'navigation mb-5'
        + [revers ? ' navigation--revers navigation--main' : '']
        + [blue ? ' navigation--revers navigation--revers-blue' : '']
        ">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-4 col-md-6">
                    <nuxt-link to="/" class="logo mr-md-5">EG</nuxt-link>
                    <nuxt-link to="/about" class="navigation__link d-none d-md-inline">О нас</nuxt-link>
                    <a href="" class="navigation__link d-none d-md-inline">Обратная связь</a>
                </div>
                <div class="d-flex col-8 col-md-6 ml-auto justify-content-end">
                    <!-- Authentication Links -->
                    <div class="d-none d-md-block" v-if="!authenticated">
                        <nuxt-link to="/auth/login" class="btn btn-sm btn-blue">Вход</nuxt-link>
                        <nuxt-link to="/auth/register" class="btn btn-sm btn-white ml-3">Регистрация</nuxt-link>
                    </div>

                    <!-- Guest block -->
                    <div class="d-md-none position-relative" v-if="!authenticated" v-click-outside="submenuClose">
                        <div class="navigation__burger" @click="submenu = !submenu">
                            <span class="navigation__burger-span"></span>
                            <span class="navigation__burger-span"></span>
                            <span class="navigation__burger-span"></span>
                        </div>
                        <div class="navigation__submenu block-shadow mt-2" v-if="submenu">
                            <div class="navigation__submenu-item">
                                <nuxt-link to="/auth/login" class="navigation__submenu-link">Вход</nuxt-link>
                            </div>
                            <div class="navigation__submenu-item">
                                <nuxt-link to="/auth/register" class="navigation__submenu-link">Регистрация</nuxt-link>
                            </div>
                            <hr />
                            <div class="navigation__submenu-item">
                                <nuxt-link to="/about" class="navigation__submenu-link">О нас</nuxt-link>
                            </div>
                            <div class="navigation__submenu-item">
                                <nuxt-link to="/callback" class="navigation__submenu-link">Обратная связь</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <!-- End guest block -->
                    <!-- Auth user block  -->
                    <div class="navigation__user d-flex align-items-center" v-if="authenticated" v-click-outside="submenuClose">

                        <NuxtLink to="/trstprofile/messenger" class="navigation__user-messenger mr-3 position-relative">
                          <fa :icon="['fas', 'envelope-open-text']" />
                          <div class="navigation__user-badge" v-if="unreadMessage > 0">{{ unreadMessage }}</div>
                        </NuxtLink>

                        <div class="navigation__name d-flex justify-content-end align-items-center" @click="submenu = !submenu">
                            <span>{{ user.name }}</span>
                            <div class="navigation__avatar ml-3">
                                <img src="~assets/images/general/avatar-blank.jpg" alt="" v-if="!user.avatar" />
                                <img :src="baseImgPath + user.avatar" alt="" v-if="user.avatar" />
                            </div>
                        </div>
                        <div class="navigation__submenu block-shadow mt-2" v-if="submenu">
                            <div class="navigation__submenu-item">
                                <nuxt-link
                                    :to="'/guide/' + user.id + '?preview=1'"
                                    class="navigation__submenu-link"
                                    v-if="user.active >= 0">Мой профиль</nuxt-link>
                            </div>
                            <div class="navigation__submenu-item">
                                <nuxt-link to="/profile" class="navigation__submenu-link">Настройки профиля</nuxt-link>
                            </div>
                            <div class="navigation__submenu-item" v-if="user.role !== 'tourist'">
                                <a href="" @click.prevent="createTour" class="navigation__submenu-link">Добавить экскурсию</a>
                            </div>
                            <div class="navigation__submenu-item" v-if="user.role !== 'tourist'">
                                <nuxt-link to="/profile/tour" class="navigation__submenu-link">Мои экскурсии</nuxt-link>
                            </div>
                            <div class="navigation__submenu-item">
                                <a @click.prevent="logout" href="" class="navigation__submenu-link">Выход</a>
                            </div>

                            <form id="js--logout-form" action="" method="POST" style="display: none;">

                            </form>
                        </div>
                    </div>
                    <!-- End auth block -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import { mapGetters } from 'vuex'

export default {
    props: ['revers', 'blue'],

    data() {
        return {
            submenu: false
        }
    },

    computed: {
        ...mapGetters({
            unreadMessage: 'auth/unreadMessage',
            loggedIn: 'auth/loggedIn',
            // loggedIn: 'auth/user',
        })
    },

    methods: {
        logout() {
            this.$auth.logout();
        },

        submenuClose(event) {
            if(event.target.className !== 'navigation__burger-span')
                this.submenu = false
        },

        async createTour() {
            await this.$axios.get('profile/tour/create').then(res => {
                this.$router.push({path: '/profile/tour/' + res.data.data.id})
            })
        },

    },

    watch: {
        '$route.path': function() {
            this.submenu = false
        }
    },

    directives: {
        ClickOutside
    }
}
</script>

<style scoped>

</style>
