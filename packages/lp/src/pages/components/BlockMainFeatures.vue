<template lang="pug">
h2.text-center Ваши сотрудники - главная&nbsp;
  q-icon.kt-heart(name='favorite')
//- .row.justify-center 
//-   .col line
//-   .col Основые функции пользователей
//-   .col line
  
.row.justify-center.q-gutter-lg
  q-card.kt-card(v-for='(card, index) in content')
    q-card-section
      .column.q-gutter-y-md
        .col
          .row.no-wrap.kt-icons
            .col
              q-img.kt-img(:src='`/features/icon-${index+1}.png`'
                    fit='scale-down'
                    )
            .col-grow 
            .col.text-right.kt-index-icon {{ `0${index+1}` }}
        .col.text-h5 {{ card.title }}
        .col {{ card.text }}

</template>
<style lang='sass'>
.kt-card
  width: 100%
  max-width: 380px
  border-radius: 10px
.kt-img
  max-width: 80px
.kt-icons
  height:80px
.kt-index-icon
  font-size: 64px
  line-height: 1.14
  color: #efefef
.kt-heart
  color: $red-14
  animation: heartbeat 1s infinite

@keyframes heartbeat
  0%
    transform: scale( .75 )
  20%
    transform: scale( 1 )
  40%
    transform: scale( .75 )
  60%
    transform: scale( 1 )
  80%
    transform: scale( .75 )
  100%
    transform: scale( .75 )

</style>
<script setup lang="ts">
const content = [
  { 
    title: 'Работает на любом устройстве',
    text: 'Персональный компьютер,мобильный телефон и планшет, информационный киоск.',
  },
  { 
    title: 'Получение справок c ЭП',
    text:  'Сотрудники самостоятельно направляют завку на получение справок 2-НДФЛ, с места работы, для визы и пр.'
  },
  { 
    title: 'Оформление отпусков',
    text:  'Сотрудники направляют заявления на отпуск, которые автоматически уходят на согласование линейному руководителю.'
  },
  { 
    title: 'Расчетные листки и информация по расчетам',
    text:  'Расчетые листки доступны за любой период. Сотрудник всегда в курсе когда и за что ему начислили деньги.'
  },
  { 
    title: 'Ознакомление c ЛНА',
    text:  'Локальные нормативные акты доступны в kedo-team. Сотрудники ознакомливаются с ними под электронную подпись.'
  },
  { 
    title: 'Интеграция c учетными системами',
    text:  '1С:Бухгалтерия, 1С:ЗУП и любыми другими учетными системами через REST API.'
  }
]
</script>