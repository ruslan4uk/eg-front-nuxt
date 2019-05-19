<template>
    <div>
        <b-container>
            <b-row class="mt-5">
                <b-col cols="12">
                    <h3 class="mb-4">Достопримечательности</h3>
                </b-col>

                <!-- Плашка переключатель -->
                <NavCity></NavCity>

            </b-row>
        </b-container>


    </div>
</template>

<script>
import NavCity from '~/components/Frontend/NavCity'

export default {
    components: { 
        NavCity, 
    },
    
}
</script>

<style scoped>

</style>