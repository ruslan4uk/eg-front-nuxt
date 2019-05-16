<template>
    <section>
        <div class="container">
            <div class="row mt-5">
                <div class="col-12"><h3 class="mb-4">Мои экскурсии</h3></div>

                <!-- Плашка переключатель -->
                <div class="col-12 mb-4">
                    <div class="subnavigation border25">
                        <div class="subnavigation__list d-flex">
                            <a href="" class="subnavigation__item border25">Активные</a>
                            <a href="" class="subnavigation__item border25">На модерации</a>
                        </div>
                    </div>
                </div>

                <TourItem />                

                <!-- @if(count($tours) == 0) -->
                    <div class="col-12 mt-4">
                        <div class="col-12 alert alert-danger border25 d-block pt-3 pb-3 text-center" role="alert">
                            У вас нет ни одной экскурсии! <a href="">Создайте</a> экскурсию прямо сейчас
                        </div>
                    </div>    
                <!-- @endif -->

            </div>
        </div>
    </section>
</template>

<script>
import TourItem from '~/components/Items/TourItem'

export default {
    middleware: ['auth'],
    components: { TourItem },

    
    
}
</script>

<style scoped>

</style>