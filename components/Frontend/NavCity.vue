<template>
    <b-col cols="12" class="mb-4">
        <div class="subnavigation border25">
            <div class="subnavigation__list d-flex">
                <nuxt-link 
                    exact
                    class="subnavigation__item border25"
                    :to="{ name: 'country-country-city-city', params: {country: $route.params.country, city: $route.params.city} }">Экскурсии</nuxt-link>
                <nuxt-link 
                    class="subnavigation__item border25"
                    :to="{ name: 'country-country-city-city-guide', params: {country: $route.params.country, city: $route.params.city} }">Гиды</nuxt-link>
                <nuxt-link 
                    class="subnavigation__item border25"
                    :to="{ name: 'country-country-city-city-article', params: {country: $route.params.country, city: $route.params.city} }">Достопримечательности</nuxt-link>
            </div>
        </div>
    </b-col>
</template>

<script>
    export default {
        name: 'NavCity',
        
        data() {
            return {
                
            }
        }
    }
</script>

<style scoped>

</style>