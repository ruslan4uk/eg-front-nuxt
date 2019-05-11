<template>
    <div class="locations">
        <b-form-group class="custom-input mt-4">
            <input type="text" class="form-control" v-model="location" placeholder="Введите город" :id="'location' + index">
            <label :for="'location' + index">Введите город</label>
            <div class="location__suggest">
                <div class="location__suggest-items shadow-block" v-if="city.length > 0 && suggest">
                    <div class="location__suggest-item" v-for="(item, index) in city" :key="index" @click="changeCity(item.id)">
                        {{ item.name }}, {{ item.city_country.name }}
                    </div>
                </div>
                <div class="location__suggest-item shadow-block" v-if="city.length === 0 && suggest">Не найдено</div>
            </div>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        props: ['index', 'current'],

        data() {
            return {
                location: '',
                city: {},
                suggest: false,
            }
        },

        methods: {
            getCity(value) {
                this.$axios.get('/helpers/city?q=' + value).then(res => {
                    this.city = res.data.data
                })
            },
            changeCity(id) {
                this.location = ''
                this.$emit('change', id)
                this.city = {}
                this.suggest = false
            }
        },

        watch: {
            'location': function(newVal) {
                if(newVal.length > 0)
                    this.suggest = true
                    this.getCity(newVal)
            }
        },

    }
</script>

<style scoped lang="sass">
.location__suggest
    position: absolute
    z-index: 3
    background: #ffffff
    width: 100%
    max-height: 10rem
    overflow-y: scroll
    &-items 
        padding: 0.5rem 0
        border: 1px solid #eee
    &-item
        color: #405089
        font-size: 0.75rem
        font-weight: 500
        padding: 0.25rem 1rem
        cursor: pointer
        transition: all ease 0.2s
        &:hover
            background: #fafafa
</style>