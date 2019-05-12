<template>
    <section class="navigation mb-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-4 col-md-6">
                    <nuxt-link to="/" class="logo mr-md-5">EG</nuxt-link>
                    <a href="" class="navigation__link d-none d-md-inline">О нас</a>
                    <a href="" class="navigation__link d-none d-md-inline">Обратная связь</a>
                </div>
                <div class="d-flex col-8 col-md-6 ml-auto justify-content-end">
                    <!-- Authentication Links -->
                    <div class="d-none d-md-block" v-if="!authenticated">
                        <nuxt-link to="/auth/login" class="btn btn-sm btn-blue">Вход</nuxt-link>
                        <nuxt-link to="/auth/register" class="btn btn-sm btn-white ml-3">Регистрация</nuxt-link>
                    </div>
                    <!-- Guest block -->
                    <div class="d-md-none position-relative" v-if="!authenticated">
                        <div class="navigation__burger" @click="submenu = !submenu">
                            <span class="navigation__burger-span"></span>
                            <span class="navigation__burger-span"></span>
                            <span class="navigation__burger-span"></span>
                        </div>    
                        <div class="navigation__submenu block-shadow mt-2" v-if="submenu" v-click-outside="submenuClose">
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
                    <div class="navigation__user" v-if="authenticated">
                        <div class="navigation__name d-flex justify-content-end align-items-center" @click="submenu = !submenu">
                            <span>{{ user.name }}</span>
                            <div class="navigation__avatar ml-3">
                                <img src="~assets/images/general/avatar-blank.jpg" alt="" v-if="!user.avatar" />
                                <img :src="baseImgPath + user.avatar" alt="" v-if="user.avatar" />
                            </div>
                        </div>
                        <div class="navigation__submenu block-shadow mt-2" v-if="submenu" v-click-outside="submenuClose">
                            <div class="navigation__submenu-item">
                                <nuxt-link to="/profile" class="navigation__submenu-link">Настройки профиля</nuxt-link>
                            </div>
                            <div class="navigation__submenu-item">
                                <a href="" class="navigation__submenu-link">Добавить экскурсию</a>
                            </div>
                            <div class="navigation__submenu-item">
                                <a href="" class="navigation__submenu-link">Мои экскурсии</a>
                            </div>
                            <div class="navigation__submenu-item">
                                <a @click="logout" class="navigation__submenu-link js--navigation-logout">Выход</a>
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
import vClickOutside from 'v-click-outside'

export default {
    data() {
        return {
            submenu: false
        }
    },

    methods: {
        logout() {
            this.$auth.logout();
        },

        submenuClose(event) {
            if(event.target.className !== 'navigation__burger-span')
                this.submenu = false
        }
    },

    watch: {
        '$route.path': function() {
            this.submenu = false
        }
    },

    directives: {
        clickOutside: vClickOutside.directive
    },
}
</script>

<style scoped>

</style>