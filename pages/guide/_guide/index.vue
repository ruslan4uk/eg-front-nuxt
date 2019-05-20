
<template>
<div>
    <section class="guide-blue-line"></section>
    <section class="guide pt-5">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-3 pr-lg-4 mb-4 text-center text-md-left">
                    <div class="guide__avatar mb-3">
                        <img :src="baseImgPath + guide.avatar" alt="" class="border25" v-if="guide.avatar">
                        <img src="~/assets/images/general/avatar-blank.jpg" alt="" class="border25" v-if="!guide.avatar">
                    </div>
                    <div class="guide__name mb-3">{{ guide.name }}</div>
                                        
                    <div class="mb-3">
                        <div class="subtitle mb-1">Владение языками</div>
                        <div class="guide__small pb-1" 
                            v-for="(language, index) in guide.user_language" :key="index">
                            <span :class="'mr-1 flag-icon flag-icon-' + language.iso_code + ' flag-icon-squared'"></span>
                            <span class="pb-1">{{ language.name }}</span></div>
                    </div> 
                    
                    
                                           
                    <div class="mb-3">
                        <div class="subtitle mb-1">Услуги</div>
                        <div class="guide__small"
                            v-for="(service, index) in guide.user_service" :key="index">{{ service.name }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="subtitle mb-1">Города проживания</div>
                        <div class="guide__small"
                            v-for="(location, index) in guide.user_city" :key="index">
                            <div class="mb-2">
                                <i class="fas fa-map-marker-alt"></i>
                                <fa :icon="['fas', 'map-marker-alt']" />
                                {{ location.name }}, {{ location.city_country }}
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="subtitle mb-1">Контакты</div>
                        <div class="guide__small"
                            v-for="(contact, index) in guide.user_contact_type" :key="index">
                            <div class="mb-1">
                                <span v-b-tooltip.hover :title="contact.contact_type[0].name">
                                    {{ contact.text }}
                                </span>                                    
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Right coll  -->
                <div class="col-12 col-lg-9">
                    
                    <div class="card block-shadow border25 mb-3">
                        <div class="card-body">

                            <div class="alert alert-info" v-if="guide.active === 0">
                                Внимание! Профиль находится на модерации! Эта страница доступна только вам!
                            </div>

                            <div class="guide__about mb-4">
                                <div class="title mb-2">Обо мне</div>
                                <div class="guide__small textarea-pre-wrap">{{ guide.about }}</div>
                            </div>
                            
                            <div class="guide__tours">
                                <div class="title mb-3">Экскурсии</div>
                                <div class="row">
                                
                                    <div class="col-12 col-sm-6 col-lg-4 mb-4" v-for="(tour, index) in guide.tour" :key="index">
                                        <div class="border25">
                                            <nuxt-link :to="'/guide/' + guide.id + '/tour/' + tour.id" class="border25 mb-3">
                                                <img src="~/assets/images/general/blank.png" alt="" class="border25 mb-3" v-if="!tour.avatar" />
                                                <img :src="baseImgPath + tour.avatar" alt="" class="border25 mb-3" v-if="tour.avatar" />
                                            </nuxt-link>

                                            <nuxt-link :to="'/guide/' + guide.id + '/tour/' + tour.id" class="subtitle d-block mb-2">
                                                {{ tour.name }}
                                            </nuxt-link>
                                            
                                            <div class="d-block">
                                                <div class="tour-item__time mb-2" data-toggle="tooltip" data-placement="top" title="Длительность экскурсии">
                                                    <i class="fas fa-history"></i>
                                                    <span>{{ tour.tour_timing[0].name }}</span>
                                                </div>
                                                <div class="tour-item__price">
                                                    от <span>{{ tour.price }}</span>
                                                    <fa :icon="['fas', tour.tour_currency[0].iso_code]" /> 
                                                    {{ tour.tour_price_type[0].name }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12" v-if="!guide.tour">
                                        <div class="alert alert-info">
                                            У гида еще нет экскурсий
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- {{-- Comment --}} -->
                    <div class="card block-shadow border25 mb-3">
                        <div class="card-body">
                            <div class="title mb-3">Комментарии</div>

                            <div class="guide__comments">
                                <!-- @if (count($comments) > 0) -->
                                    <!-- @foreach ($comments as $comment) -->
                                        <div class="row mb-4 pb-4 guide__comments-item">
                                            <div class="col-4 col-md-2">
                                                <!-- @if ($comment->userData->avatar) -->
                                                    <!-- <a href="{{ route('guideIndex', $comment->userData->user_id) }}"> -->
                                                        <!-- <img src="{{ asset($comment->userData->avatar) }}" alt="" class="border25 mb-3 mb-md-0"> -->
                                                    <!-- </a> -->
                                                <!-- @else  -->
                                                    <a href="">
                                                        <img src="https://via.placeholder.com/400" alt="" class="border25 mb-3 mb-md-0">
                                                    </a>
                                                <!-- @endif -->
                                            </div>
                                            <div class="col-12 col-md-10">
                                                <!-- <a href="{{ route('guideIndex', $comment->userData->user_id) }}">
                                                    <div class="title">{{$comment->user->name}}</div>
                                                </a>
                                                <div class="guide__small">
                                                    {{$comment->text}}
                                                </div> -->
                                            </div>
                                        </div>
                                    <!-- @endforeach -->
                                <!-- @else  -->
                                    <div class="alert alert-info mb-3">
                                        Гида пока никто не прокоментировал, сделайте это первыми
                                    </div>
                                <!-- @endif -->
                            </div>
                            
                            <div class="guide__comment">
                                <!-- <form action="{{ route('addComment', $guide->id) }}" method="POST"> -->
                                    <!-- @csrf -->
                                    <div class="form-group">
                                        <!-- <textarea name="comment" id="" rows="5" class="form-control border25 {{$errors->has('comment') ? ' is-invalid' : ''}}">{{ old('comment') }}</textarea> -->
                                    </div>
                                    <!-- @if ($errors->has('comment')) -->
                                        <span class="invalid-feedback invalid-feedback--normal mb-2 d-block" role="alert">
                                            <!-- <strong>{{ $errors->first('comment') }}</strong> -->
                                        </span>
                                    <!-- @endif -->
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-sm btn-blue">Отправить</button>
                                    </div>
                                <!-- </form> -->
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>
</div>
</template>

<script>
export default {
    layout (context) {
      return 'guide'
    },

    async asyncData({route, store, params, query, redirect, error}) {
        
        return store.$axios.get(`guide/${params.guide}`, {params: { preview: query.preview }})
            .then((res) => {
                return { guide: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Post not found' })
        })
        
    },
}
</script>

<style scoped>

</style>