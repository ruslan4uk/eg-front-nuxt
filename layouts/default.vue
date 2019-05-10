<template>
    <div>
        <navbar />
        <nuxt />
    </div>
</template>

<script>
import Navbar from '@/layouts/partials/Navbar'
    export default {
        components: { Navbar },
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