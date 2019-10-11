<template>
    <b-row>
        <b-col md="8">
            <b-row>
                <b-col cols="6" md="4" class="mb-4" v-for="(item, index) in items" :key="index">
                    <div class="license__item license__item--background" :style="'background-image: url(' + baseImgPath + item.image_crop + ');'">
                        <div class="license__delete" @click="deleteItem(item.id)">
                            <fa :icon="['fas', 'times-circle']"></fa>
                        </div>
                    </div>
                </b-col>

                <b-col cols="6" md="4" class="mb-4" v-if="items.length < 6">
                    <input type="file" name="" id="license" class="license__checkbox" ref="image" multiple
                        @change="changeItem">
                    <label for="license" class="license__item license__item--after"></label>
                </b-col>
            </b-row>
        </b-col>

        <b-col md="4">
            <div class="license__helper">
                Можно загрузить картинку в формате 
                png, jpg и gif. Размеры не меньше 
                200 × 200 точек, объём файла 
                не больше 7 МБ.
            </div>
        </b-col>

    </b-row>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
    props: ['items', 'url', 'urldelete'],

    methods: {
        async changeItem() {
            this.images = this.$refs.image.files;
            let formData = new FormData
            for( var i = 0; i < this.images.length; i++ ){
                let file = this.images[i];
                formData.append('files[' + i + ']', file);
            }
            // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]); 
            // }

            await this.$axios.$post(this.url, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
                this.$emit('change', res.data)
            })
        },

        async deleteItem(id) {
            await this.$axios.post(this.urldelete, {id: id}).then(res => {
                this.$emit('change', res.data.data)
            })
        },
    },

}
</script>

<style scoped lang="sass">
.license 
    &__helper
        font-size: 0.875rem
        font-weight: 400
        color: #999
    &__checkbox
        position: absolute
        left: -9999px
    &__item
        display: block
        height: 11rem
        border: 2px dashed #405089
        border-radius: 25px
        position: relative
        &:hover:before
            content: ' '
            position: absolute
            top: 0
            left: 0
            background-color: rgba(255,255,255,.75) 
            width: 100%
            height: 100%
            border-radius: 25px
        &--background
            background-size: cover
            background-repeat: no-repeat
            background-position: center center
        &--after
            margin-bottom: 0
            top: 0
            cursor: pointer
            &:after 
                position: absolute
                top: 50%
                content: 'Загрузить изображение'
                text-align: center
                max-width: 100% 
                color: #405089
                font-size: 0.75rem
                font-weight: 500
                padding: 0 1rem
    &__delete
        position: absolute 
        top: calc(50% - 1.5rem)
        right: calc(50% - 1.5rem)
        display: none
        font-size: 2.5rem
        color: #ff7555
        z-index: 2
        cursor: pointer
    &__item:hover &__delete 
        display: block
</style>