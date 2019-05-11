<template>
    <div class="tags">
        {{ comSelected }}
        <div class="tags__label" v-if="label">{{label}}</div>
        <div class="tags__active" v-for="(active,index) in selected" :key="index">
            {{activeSelect(active)}}
            <div class="tags__delete" @click="deleteSelect(active)"><fa :icon="['fas', 'times']" /></div>
        </div>

        <div :class="'select position-relative' + [err ? ' is-invalid' : '']" v-if="options.length > selected.length" v-click-outside="hide">
            <div class="select__name" @click="suggest = !suggest">{{placeholder || 'Выберите'}}</div>
            <div class="select__list" v-if="suggest">
                <div class="select__item" v-for="(item, index) in emptyOptions" :key="index" @click="changeSelect(item.id)">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
    name: 'Tags',
    props: ['placeholder', 'options', 'selected', 'label', 'err'],
    data() {
        return {
            comSelected: '',
            suggest: false,
        }
    },
    methods: {
        activeSelect(id) {
            return this.options.find(x => x.id === id).name
        },
        hide() {
            this.suggest = false
        },
        changeSelect(id) {
            this.$emit('change', id)
            this.hide()
        },
        deleteSelect(id) {
            this.$emit('delete', id)
        }
    },
    computed: {
        emptyOptions() {
            return this.options.filter(x =>  !this.selected.includes(x.id))
        }
    },
    
    directives: {
        ClickOutside
    }
}
</script>

<style scoped lang="sass">
.tags 
    display: flex
    flex-wrap: wrap
    &__label
        flex: 0 0 100%
        color: #405089
        font-weight: 500
        font-size: 0.75rem
        margin-bottom: 0.5rem
    &__active
        font-size: 0.75rem
        padding: 0.25rem 2.5rem 0.25rem 0.5rem
        border: 1px solid #ccc
        border-radius: 4px
        margin-right: 0.5rem
        margin-bottom: 0.5rem
        position: relative 
        font-weight: 500
        color: #75797e
    &__delete 
        position: absolute
        right: 0.375rem
        top: 0.25rem
        cursor: pointer
.select 
    &__name
        font-size: 0.75rem
        font-weight: 500 
        padding: 0.25rem 2.5rem 0.25rem 0
        border-bottom: 1px solid #e7e7e8
        cursor: pointer
        color: #405089
        &:after
            content: ' '
            position: absolute
            border-style: solid
            border-width: 0 5px 5px 5px
            border-color: transparent transparent #405089 transparent
            right: 0
            top: 0.625rem
            width: 0.625rem
            height: 0.5rem
            transform: rotate(180deg)
    &__list
        font-size: 0.75rem
        position: absolute
        z-index: 2
        background-color: #ffffff
        border-radius: 4px
        width: 100%
        box-shadow: 0 0 4px 2px rgba(0,0,0,.1)
    &__item
        padding: 0.5rem
        cursor: pointer 
        &:hover
            background-color: #eeeeee
    
    &.is-invalid &__name
        border-bottom: 1px solid #dc3545
        color: #dc3545
</style>