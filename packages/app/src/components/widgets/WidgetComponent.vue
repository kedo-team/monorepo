<template lang="pug">

.grid-stack-item(:id="domId", :gs-id="domId")
    .grid-stack-item-content
        slot No content defined

</template>
<style scoped lang="sass">
.grid-stack 
  background-color: $kedo-light-gray
.grid-stack-item-content
  background-color: $kedo-white

</style>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import { IK_SetWidgetDescription } from "src/components/widgets/injectionKeys";

const props = defineProps({
    isDemo: Boolean,
    domId: String
});

const emit = defineEmits<{
    (e: 'mounted', domId: string): void
}>();

onMounted(()=>{
    emit('mounted', `${props.domId}`);
})

let title = ref("a");
let description = ref("d");

function setDescription(t: string, d: string): void {
    title.value = t;
    description.value = d;
    
    console.log('вызван', t, d);
    
}

provide(IK_SetWidgetDescription, setDescription);

</script>