<template>
    <div class="trst-left-nav">
        <ul class="trst-left-nav__list border25 block-shadow">
            <nuxt-link to="/trstprofile" 
                class="trst-left-nav__item" exact>Профиль</nuxt-link>
            <nuxt-link to="/trstprofile/favorite-guide" 
                class="trst-left-nav__item">Избранные гиды</nuxt-link>
            <nuxt-link to="/trstprofile/favorite-tour" 
                class="trst-left-nav__item">Избранные экскурсии</nuxt-link>
            <nuxt-link to="/trstprofile/change-password" 
                class="trst-left-nav__item">Смена пароля</nuxt-link>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="sass" scoped>
.trst-left-nav
    &__list 
        margin: 0
        padding: 1rem 0
        border: 1px solid #efefef
    &__item
        color: #777
        display: block
        padding: 0.5rem 1rem 0.5rem 2rem
        position: relative
        overflow: hidden
        &:before
            content: ' '
            position: absolute
            left: -2rem
            width: 1.5rem
            height: 1.5rem
            background-color: #ff7555
            border-radius: 25px
            transition: all ease 0.3s
        &.active, &:hover
            color: #111111
            &:before 
                left: -0.875rem
</style>