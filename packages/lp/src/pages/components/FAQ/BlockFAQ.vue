<template lang="pug">
//- It's not the shame. I tryed my best to keep things DRY.
//- But PUG will never be support dynamic imports. 
//- https://github.com/pugjs/pug/issues/2622#issuecomment-270157667
//- So this is may ne no so elegant workaround

mixin expand(question)
  q-expansion-item(expand-separator)
    template(#header)
      q-icon(name='help_outline' size='md' color='blue')
      .text-h6.q-pl-sm= question
    q-separator
    q-card-section
      block


h2.text-center Часто задаваемые вопросы
q-list.bordered.bg-white
  +expand('На сколько законен переход на полностью электронный кадровый документооброт?')
    include:markdown-it(linkify langPrefix='highlight-') content/kedo-legality.md
  +expand('Какие виды электронной подписи поддерживает kedo-team?')
    include:markdown-it(linkify langPrefix='highlight-') content/sign-types.md
 

</template>
<script setup lang="ts">
</script>