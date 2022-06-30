<template lang='pug'>
.row.reverse-wrap.items-start.q-pa-md.q-px-lg
  .col-12.col-md-7.column
    .col: h1.text-h2.text-weight-bold Кадровый электронный документооборот
    .col: h2.text-h4 Платформа для построения интегрированных систем КЭДО с открытым исходным кодом
    .col.row.justify-center 
      q-btn(color='red' @click='formOpen = true') Подключиться

  .col-12.col-md-5.self-center.block-hero-image
    .row.justify-center
      q-img.hero-img.align-center.fit(src='/block-hero.png'
                alt='Персональный компьютер и телефон с открытым приложением'
                width='200%')
q-dialog(v-model='formOpen')
 .row
    iframe(src='https://forms.yandex.ru/u/62b9aeb8b326f743ea9d6db1/?iframe=1'
            frameborder='0'
            name='ya-form-62b9aeb8b326f743ea9d6db1'
            width='650')
</template>
<style lang='sass'>
@media(max-width: $breakpoint-sm-max)
  html
    font-size: 62.5%
  .cta
    align-content: center
.hero-img
  max-width:400px


</style>
<script setup lang='ts'>
import { ref } from 'vue'

const formOpen = ref(false)
</script>