<template>
    <div>
        <navbar :revers="true" />
        <nuxt />
        <Footer />
    </div>
</template>

<script>
import Navbar from '@/layouts/partials/Navbar'
import Footer from '@/layouts/partials/Footer'
    export default {
        components: { Navbar, Footer },
        methods: {
            logout() {
                this.$auth.logout();
                this.$router.push({name: 'index'})
            }
        },
    }   
</script>

<style scoped>

</style>