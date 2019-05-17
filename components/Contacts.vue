<template>
    <b-row>
        <div class="col-auto com-vue-select">
            <VueSelect
                :option="helpers.contact_type"
                :current="comItem.type"
                @change="changeType"
                placeholder = "Выберите"
            ></VueSelect>
        </div>
        <div class="col">
            <b-form-group class="custom-input mb-0">
                <b-input v-model="comItem.text" placeholder="+ 499 999 99 99" :id="'id_' + indexes" @input="changeInput"></b-input>
                <label :for="'id_' + indexes">Введите Контакт</label>
            </b-form-group>
            <div class="delete_contact" @click="deleteContact">
                <fa :icon="['fas', 'times']" />
            </div>
        </div>
        <div class="col-12 mb-4">
            <div class="invalid-feedback d-inline" v-if="errors['user_contact.' + indexes + '.type']">
                {{ errors['user_contact.' + indexes + '.type'][0] }}
            </div>
            <div class="invalid-feedback d-inline" v-if="errors['user_contact.' + indexes + '.text']">
                {{ errors['user_contact.' + indexes + '.text'][0] }}
            </div>
        </div>
    </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueSelect from '~/components/VueSelect'

export default {
    props: ['item', 'indexes'],

    data() {
        return {
            comItem: Object.assign({}, this.item)
        }
    },

    components: { VueSelect },

    computed: {
        ...mapGetters({
            helpers: 'helpers/all/helpers',
        })
    },

    methods: {
        changeType(id) {
            this.comItem.type = id
            this.$emit('change', ...[this.comItem, this.indexes] )
        },
        changeInput() {
            this.$emit('change', ...[this.comItem, this.indexes] )
        },
        deleteContact() {
            this.$emit('delete', this.indexes)
        }
    },
    watch: {
        'item': function(newVal) {
            this.comItem = newVal      
        }
    },
}
</script>

<style scoped lang="sass">
.com-vue-select
    min-width: 10rem

.delete_contact
    position: absolute
    right: 1rem 
    top: 0
    cursor: pointer
</style>