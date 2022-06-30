<template lang='pug'>
h2.text-center Зачем kedo-team бизнесу
.row.justify-center.q-gutter-lg
  q-card.kt-card(v-for='card in content')
    q-item-section
      q-item-label
        .text-h4.q-pt-md.text-center {{card.title}}
      q-item-label(caption) 
        .text-h6.q-pb-md.text-center {{ card.subtitle}}
    
    q-img(:src='card.img_url'
          :alt='card.img_alt')
    q-card-section
      .text-h6 {{card.text_header}}
    q-card-section {{ card.text}}
    q-card-actions(align="right")
      q-btn(unelevated color='red') узнать больше
    
      

</template>
<style lang='sass'>
.kt-card
  width: 100%
  max-width: 380px
  border-radius: 10px
</style>

<script setup lang='ts'>
const content = [
  {
    title: 'HRD',
    subtitle: 'Директору по персоналу',
    img_url: '/block-reason-hrd.png',
    img_alt: 'Как КЭДО поможет директору по персоналу',
    text_header: 'Достижение максимальной эффективности кадровых функций',
    text: 'Избавляетесь от издержек на бумагу в кадрах, поддержку кадрового архива, сотрудники не будут тратить рабочее время на решение кадровых вопросов.'
  },
  {
    title: 'CEO',
    subtitle: 'Директору',
    img_url: '/block-reason-ceo.png',
    img_alt: 'Как КЭДО поможет Генеральному, операционному или финансовому директору',
    text_header: 'Снижение расходов на взаимодействие сотрудников и компании',
    text: 'Кратно увеличивает эффектиность кадровой службы в пересчете на сотрудника, увеличивает силу HR-бренда вашей компании в глазах сотрудников.'
  },
  {
    title: 'CTO',
    subtitle: 'Директору по ИТ',
    img_url: '/block-reason-cto.png',
    img_alt: 'Как КЭДО поможет директору по информационным технологиям',
    text_header: 'Микросервисный и микрофронтенд подход к архитектуре',
    text: 'Возможно интегрировать в любой ИТ-периметр, максимальная гибкость за счет архитектурной слабой связанности всех компонентов решения.'
  }
]
</script>