<template lang="pug">
q-card.my-card(flat, bordered)
    q-card-section(horizontal)
        q-card-section.q-pt-xs
            //- .text-overline Overline
            .text-h5.q-mt-sm.q-mb-xs {{ title }}
            .text-caption.text-grey {{ description }}
        q-card-section.col-5.flex.flex-center
            q-img.rounded-borders(:src="previewUrl")
            q-btn.btn(flat 
                      icon="add") Добавить
</template>

<style lang="sass" scoped>
.my-card
  max-width: 400px
.btn
  margin: 6px 0
</style>

<script setup lang="ts">
const props = defineProps({
    title: String,
    description: String,
    previewUrl: String,
    componentName: String
})

</script>
