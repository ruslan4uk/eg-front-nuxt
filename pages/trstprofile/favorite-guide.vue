<template>
    <div class="trst">
        <section class="container">
            <div class="row">
                <div class="col-12 col-lg-3">
                    <LeftNavigation />
                </div>
                <div class="col-12 col-lg-9">

                </div>
            </div>
        </section>
    </div>
</template>

<script>
import LeftNavigation from '~/components/Trst/LeftNavigation'

export default {
    middleware: ['auth'],

    components: {
        LeftNavigation
    },


}
</script>

<style lang="sass" scoped>

</style>