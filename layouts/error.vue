<template>
    <b-container>
        <b-row>
            <b-col>
                <div class="text-center py-5">
                    <h1>404</h1>
                    <h2 v-if="error.statusCode === 404">Упс =) Такой страницы у нас нет!</h2>
                    <nuxt-link to="/"><strong>На главную</strong></nuxt-link>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: ['error'],
}
</script>

<style scoped>

</style>