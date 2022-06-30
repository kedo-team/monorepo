<template lang="pug">
q-timeline.anton(layout='dense', color='grey')
  q-timeline-entry(v-for='(task, index) in data', :icon='getIconName(task.status)')
    template(#title)
      KT-UserAvatar(:data='task.assignedToUser')
    
</template>
<style scoped lang="scss">
/* clean-css ignore:start */
.q-timeline__entry--icon .q-timeline__subtitle {
  background-color: red;
}
/* clean-css ignore:end */
</style>

<script setup lang="ts">

defineProps<{
  data: any
}>()

function getIconName(status: string): string {
  let retVal = '';
  switch (status) {
    case 'PENDING' :    retVal = 'schedule'; break;
    case 'IN_PROGRESS': retVal =  'label_important'; break;
    case 'APPROVED': retVal =  'check_circle_outline'; break;
    case 'REJECTED': retVal =  'highlight_off'; break;
    default: '';
  }
  return retVal;
}

</script>