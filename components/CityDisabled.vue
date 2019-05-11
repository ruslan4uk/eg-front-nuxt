<template>
    <div :class="'locations_' + current">
        <b-form-group class="custom-input mb-4">
            <input type="text" class="form-control" v-model="location"  placeholder="Введите город" :id="'location' + current" disabled>
            <label :for="'location' + current">Введите город</label>
            <div class="deleteCity" @click="deleteLocation(current)"><fa :icon="['fas', 'times']" /></div>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        props: ['current'],

        data() {
            return {
                location: '',
            }
        },

        mounted() {
            this.getCity(this.current)
        },

        methods: {
            deleteLocation() {
                this.$emit('delete', this.current)                
            },
            
            async getCity(value) {
                await this.$axios.get('/helpers/city/id?id=' + value).then(res => {
                    this.location = res.data.data.name + ', ' + res.data.data.city_country.name
                })
            }
        },

        watch: {
            'current': function(newVal) {
                this.getCity(newVal)
            }
        },

    }
</script>

<style scoped lang="sass">
.deleteCity 
    position: absolute
    top: 0.375rem
    right: 0.5rem
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