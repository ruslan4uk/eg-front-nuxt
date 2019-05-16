<template>
    <div class="col-12 col-sm-6 col-lg-3 mb-4">
        <div class="tour-item border25 block-shadow block-shadow-hover">
            <a href="">
                <!-- @if ($tour->avatar) -->
                    <img src="" alt="" class="border25 mb-3">
                <!-- @else  -->
                    <img src="/images/general/blank.png" alt="" class="border25 mb-3">
                <!-- @endif -->
            </a>
            <!-- <a href="" class="tour-item__title mb-3">{{ $tour->name }}</a> -->
            
            <div class="tour-item__footer d-flex align-items-end justify-content-between">
                <div class="tour-item__time" data-toggle="tooltip" data-placement="top" title="Длительность экскурсии">
                    <i class="fas fa-history"></i>
                    <span>4-5 часов</span>
                </div>
                <div class="tour-item__price">
                    от 
                    <!-- <span>{{ $tour->price }}</span> -->
                    <span class="rubl"><i class="fas fa-ruble-sign"></i></span> 
                    с группы
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>