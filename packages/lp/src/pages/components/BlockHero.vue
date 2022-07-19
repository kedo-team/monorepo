<template lang='pug'>
.row.reverse-wrap.items-start.q-pa-md.q-px-lg
  .col-12.col-md-7.column
    .col: h1.text-h2.text-weight-bold Кадровый электронный документооборот
    .col: h2.text-h4 Платформа для построения интегрированных систем КЭДО с открытым исходным кодом
    .col.row.justify-center
      #kt-script
        q-btn(color='red') Подключиться

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
import { onMounted, ref } from 'vue'

const formOpen = ref(false)

onMounted(()=>{
  const divScript = document.getElementById('kt-script')
  const scriptTag = document.createElement('script')
  scriptTag.setAttribute('data-b24-form', 'click/2/qe2iff')
  scriptTag.setAttribute('data-skip-moving', 'true')
  scriptTag.innerHTML = `(function(w,d,u){
		var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);
		var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
	})(window,document,'https://cdn-ru.bitrix24.ru/b22089788/crm/form/loader_2.js');`
  divScript?.insertBefore(scriptTag, divScript.firstChild)

})
</script>