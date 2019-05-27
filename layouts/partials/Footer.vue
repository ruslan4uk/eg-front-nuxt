<template>
    <section class="footer mt-5">
        <b-container>
            <b-row class="align-items-center">
                <b-col md="8" class="d-flex align-items-center">
                    <nuxt-link to="/" class="logo mr-4">EG</nuxt-link>
                    <div class="footer__info">
                        <p>Служба поддержки: <a href="mailto:support@excursguide.ru"></a></p> 
                        <!-- <p>+7 (499) 950-15-50</p> -->
                        <a href="">Политика конфиденциальности</a>
                    </div>
                </b-col>
                <div class="col-12 col-md ml-auto mt-4 mt-md-0">
                    <div class="footer__social social">
                        <div class="social__list justify-content-center justify-content-md-end">
                            <a href="https://www.instagram.com/" class="social__item" target="_blank"><fa :icon="['fab', 'instagram']" /></a>
                            <!-- <a href="" class="social__item"><fa :icon="['fab', 'vk']" /></a> -->
                            <a href="https://www.facebook.com/excursguide1" target="_blank" class="social__item"><fa :icon="['fab', 'facebook-f']" /></a>
                        </div>
                    </div>
                </div>
            </b-row>
        </b-container>
    </section>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>