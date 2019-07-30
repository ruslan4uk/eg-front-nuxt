<template>
    <b-container>
        <b-row>
            <b-col cols="12" class="mb-5">
                <h2>Блок номер один (серверный рендеринг)</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ratione quod ab libero, error eveniet maiores necessitatibus consequuntur? Mollitia nobis magnam dolorum nam suscipit quasi fuga saepe maiores doloribus nesciunt?</p>
            </b-col>
            <b-col cols="12" class="mb-5" v-if="block_1">
                <h2>Блок номер два (created - 2 сек задержка)</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ratione quod ab libero, error eveniet maiores necessitatibus consequuntur? Mollitia nobis magnam dolorum nam suscipit quasi fuga saepe maiores doloribus nesciunt?</p>
            </b-col>
            <b-col cols="12" class="mb-5" v-if="block_2">
                <h2>Блок номер три (mounted - 4 сек задержка)</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ratione quod ab libero, error eveniet maiores necessitatibus consequuntur? Mollitia nobis magnam dolorum nam suscipit quasi fuga saepe maiores doloribus nesciunt?</p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                block_1: false,
                block_2: false
            }
        },
        created () {
            setTimeout(() => {
                this.block_1 = true
            }, 2000);
        },
        mounted () {
            setTimeout(() => {
                this.block_2 = true
            }, 4000);
        },
    }
</script>

<style lang="sass" scoped>

</style>