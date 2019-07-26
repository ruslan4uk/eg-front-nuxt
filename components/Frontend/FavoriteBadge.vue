<template>
    <div v-if="user && user.role === 'tourist'" class="favorite__badge" @click.prevent="addFavorite()" v-b-tooltip.hover title="В избранное">
        <fa :icon="['fas', 'star']" />
    </div>
</template>

<script>
export default {
    props: {
        userId: {
            type: Number,
        },
        type: {
            type: String,
        },
    },
    methods: {
        addFavorite() {
            let url = null 
            if (this.type === 'guide') url = '/profile/favorite-guide-add'
            if (this.type === 'tour') url = '/profile/favorite-tour-add'
            this.$axios.post(url, {id: this.userId}).then(res => {
                this.$bvToast.toast(res.data.message, {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })                
            }).catch(error => {
                this.$bvToast.toast('Неправильно заполнены поля формы', {
                    title: 'Ошибка!',
                    autoHideDelay: 5000,
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })
            })
        }
    },
}
</script>

<style lang="sass" scoped>

</style>