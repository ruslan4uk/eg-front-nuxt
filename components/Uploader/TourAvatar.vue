<template>
    <div>
        <div class="tour__av text-center pr-4">
            <div class="tour__avatar mb-2">
                <div class="tour__avatar-spinner">
                    <b-spinner variant="primary" type="grow" label="Spinning" v-if="spinner"></b-spinner>
                </div>
                <img src="~assets/images/general/avatar-blank.jpg" alt="" v-if="!img" class="border25"> 
                <img :src="baseImgPath + img" alt="" v-if="img" class="border25">                 
            </div>
        
            <!-- <a href="" class="profile__avatar-upload">Добавить фото</a> -->
            <label for="profile-avatar" class="profile__avatar-upload">Добавить обложку экскурсии</label>
            <input type="file" @change="changeAvatar" name="avatar" ref="avatar" id="profile-avatar" class="profile__avatar-uploader">
        </div>
    </div>
</template>

<script>
export default {
    props: ['url', 'img'],

    data() {
        return {
            timestamp: Date.now(),
            spinner: false
        }
    },
    
    methods: {
        changeAvatar() {
            this.spinner = true,

            this.image = this.$refs.avatar.files[0];   
            let formData = new FormData
            formData.append('file', this.image)
            this.$axios.post(this.url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(response => {
                    this.$emit('change', response.data.data + '?t=' + this.timestamp)
                    this.spinner = false
                })
        },
        getAvatar(avatar) {
            return this.baseImgPath + avatar + '?t=' + this.timestamp
        }
    },

    watch: {
        'img': function() {
            this.timestamp = Date.now()
        }
    },

}
</script>

<style scoped lang="sass">
.tour__av
    max-width: 15rem

.tour__avatar
    position: relative
    &-spinner
        position: absolute
        transform: translate(-50%, -50%)
        top: 50%
        left: 50%
</style>