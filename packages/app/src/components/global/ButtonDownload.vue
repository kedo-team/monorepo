<template lang="pug">
q-btn(round 
      icon='download' 
      size='sm'
      color='primary'
      @click.stop='onClick')

</template>
<script setup lang="ts">

const props = defineProps({
    data: String
})

function onClick() {
    alert(props.data);
}

</script>