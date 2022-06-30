<template lang="pug">
q-card(style="background-color: antiquewhite;")
  //- HEADER
  q-card-section
    .row
      .col.text-h6 Виджет из плагина
      q-icon.no-wrap.col-auto(name="fullscreen")

  //- CONTENT
  //- q-card-section
  //-   pre(v-if="result") {{ result }}
  //-   pre(v-if="error") {{ error }}

</template>

<script setup lang="ts">


// const setDescrpition = inject(IK_SetWidgetDescription);
// if (setDescrpition) {
//   console.log('try inject');
//   setDescrpition("Изнутри пишу тебе", "Не буду долго себя описывать");
// }

</script>
