<template lang="pug">
q-menu
  q-list 
    q-item(clickable v-close-popup
          @click.stop.prevent="$emit('globalAction', { name: 'editWidgets'})")
        q-item-section Редактировать виджеты
    q-item.row.no-wrap.q-pa-md
      .column
        .text-h6.q-mb-md Настройки
        //- q-toggle(label='Use Mobile Data')
        //- q-toggle(label='Bluetooth')
        q-btn(color='primary' label='редактировать виджеты' v-close-popup size='sm')
      q-separator.q-mx-lg(vertical inset)
      .column.items-center
        q-avatar(size='72px')
          img(src='https://cdn.quasar.dev/img/avatar4.jpg')
        .text-subtitle1.q-mt-md.q-mb-xs John Doe
        q-btn(color='primary' label='Logout' push size='sm' v-close-popup)
</template>
<script setup lang="ts">
</script>