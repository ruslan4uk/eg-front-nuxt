<template>
<section>
  <div class="main d-flex align-items-center">
      <div class="container">
          <div class="row justify-content-end">
              <div class="col-12 col-lg-6">
                  <div class="main__title mb-3">Все совершенно просто!</div>
                  <div class="main__subtitle">Выберите город и начните путешествие прямо сейчас</div>
                  <div class="main__search">
                      <MainSearch />
                  </div>
              </div>
          </div>
      </div>
  </div>

    <div class="main-prefooter mt-5">
        <div class="container">
            <div class="row flex-lg-row-reverse justify-content-between align-items-center">
                <div class="col-12 col-lg-6 mb-4">
                    <img src="~assets/images/main/main_1.jpg" alt="">
                </div>
                <div class="col-12 col-lg-6 mb-4">
                    <div class="main-prefooter__title mb-3">Вы гид?</div>
                    <p class="main-prefooter__text">Замечательно! Регистрируйтесь бесплатно на сайте, 
                    выкладывайте свои экскурсии с описанием и фотографиями, 
                    привлекая туристов со всего Мира! Не жалейте слов и фотографий, 
                    потому что яркое описание и привлекательные изображения 
                    обязательно приведут туристов именно к вам</p>
                </div>
            </div>

            <!-- 2col -->
            <div class="row justify-content-between align-items-center">
                <div class="col-12 col-lg-6 mb-4">
                    <img src="~assets/images/main/main_2.jpg" alt="">
                </div>
                <div class="col-12 col-lg-6 mb-4">
                    <div class="main-prefooter__title mb-3">Ооо! Да вы турист!</div>
                    <p class="main-prefooter__text">Собрались отправиться в отпуск? Хочется приключений? 
                    Начните свое путешествие прямо сейчас. Просто выберете 
                    интересующий вас город в поиске и отправляйтесь в тур 
                    по гидам, найдя самую интересную экскурсию, которая сделает 
                    ваш отдых еще более увлекательным</p>
                </div>
            </div>

            <!-- 3col -->
            <div class="row flex-lg-row-reverse justify-content-between align-items-center">
                <div class="col-12 col-lg-6 mb-4">
                    <img src="~assets/images/main/main_4.jpg" alt="">
                </div>
                <div class="col-12 col-lg-6 mb-4">
                    <div class="main-prefooter__title mb-3">Можно все! И даже чуточку больше</div>
                    <p class="main-prefooter__text mb-4">Размещайте не только свои интересные экскурсии! Добавьте
                        авторские туры, аренду авто, а может быть даже проведение
                        свадебной церемонии. И это еще не весь список!</p>
                </div>
            </div>

            <!-- 4col -->
            <div class="row flex-lg-row-reverse justify-content-between align-items-center mt-5">
                <div class="col-12 col-lg-6 mb-4">
                    <img src="~assets/images/main/main_3.jpg" alt="">
                </div>
                <div class="col-12 col-lg-6 mb-4">
                    <div class="main-prefooter__title mb-3">Держим курс только вперед!</div>
                    <p class="main-prefooter__text mb-4">И будьте уверены, мы не останавливаемся на достигнутом. 
                    Мы обязательно будем совершенствоваться, для того, чтобы вам 
                    было удобнее и приятнее пользоваться нашим сервисом Excursguide.</p>
                    
                    <p class="main-prefooter__text">От винта, друзья!</p>
                </div>
            </div>
        </div>
    </div>

</section>
</template>

<script>
import MainSearch from '~/components/Frontend/MainSearch'

export default {

    head() {
        return {
            title: 'Excursguide - найти экскурсию и гида - легко!',
            meta: [{ 
                hid: 'description', 
                name: 'description', 
                content: 'Собрались отправиться в отпуск? Хочется приключений? Начните свое путешествие прямо сейчас. Просто выберете интересующий вас город в поиске и отправляйтесь в тур по гидам, найдя самую интересную экскурсию, которая сделает ваш отдых еще более увлекательным'
            }],
        }
    },

    layout (context) {
      return 'revers'
    },

    components: {
        MainSearch,
    },

    created () {
        console.log(process.env.MODE == 'dev' ? 'http://localhost:8000' : 'https://api.excursguide.ru/api/v1');
        
    }
}
</script>

<style lang="sass">
.main-prefooter
    &__title
        color: #585f76
        font-size: 2rem
    &__text
        font-weight: 300
        color: #585f76
</style>