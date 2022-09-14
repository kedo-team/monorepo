<template lang="pug">
//- q-btn(@click='saveGraph') Показать граф
.kt-content-container
  //- q-img.kt-under-construction(src='/under-construction.png' fit='fill'
  //-         width='200px'
  //-         height='200px')
  //- #container.row
  iframe(src="http://localhost:3000/public/dashboard/a4d532c8-c81b-4116-b5b7-297b8349c201"
         frameborder="0"
         width="100%"
         height="600"
         allowtransparency)
</template>

<style scoped lang="sass">

</style>

<script setup lang="ts">

</script>
