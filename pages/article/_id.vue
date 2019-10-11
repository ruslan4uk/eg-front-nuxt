<template>
    <section class="article">
        <!-- head -->
        <div class="article__jumbotron" :style="'background-image: url(' + baseImgPath + article.avatar + ')'">
            
        </div>
        <b-container>
            <b-row class="justify-content-center">
                <b-col md="10" lg="9">
                    <div class="article__text border25 block-shadow">
                        <div class="title mb-3">{{ article.name }}</div>

                        <div v-html="article.text"></div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
export default {
    async asyncData({route, store, params, query, redirect, error}) {

        return store.$axios.get(route.path)
            .then((res) => {
                return { article: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Article not found' })
        })

    },
}
</script>

<style scoped lang="sass">
    .article
        margin-top: -2.75rem
        &__jumbotron
            min-height: 65vh
            background-size: cover
            background-position: center center
        &__text
            padding: 3rem 5rem
            margin-top: -4rem
            background-color: #ffffff
</style>