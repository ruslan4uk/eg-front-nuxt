<template>
    <div>
        <div class="profile__user d-flex align-items-center">
            <div class="profile__avatar mr-3">
                <div class="profile__avatar-spinner">
                    <b-spinner variant="primary" type="grow" label="Spinning" v-if="spinner"></b-spinner>
                </div>
                <img src="~assets/images/general/avatar-blank.jpg" alt="" v-if="!user.avatar"> 
                <img :src="baseImgPath + user.avatar" alt="" v-if="user.avatar">                 
            </div>
            <div class="profile__username">{{ user.name }}</div>
        </div>
        <!-- <a href="" class="profile__avatar-upload">Добавить фото</a> -->
        <label for="profile-avatar" class="profile__avatar-upload">Добавить фото</label>
        <input type="file" @change="changeAvatar" name="avatar" ref="avatar" id="profile-avatar" class="profile__avatar-uploader">
    </div>
</template>

<script>
export default {
    props: ['url'],

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
        'user.avatar': function() {
            this.timestamp = Date.now()
        }
    },

}
</script>

<style scoped lang="sass">
.profile__avatar
    position: relative
    &-spinner
        position: absolute
        transform: translate(-50%, -50%)
        top: 50%
        left: 50%
</style>