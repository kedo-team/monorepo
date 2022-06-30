<template lang="pug">
q-slide-transition
  div(v-show="_user.isLayoutInEditMode")
    .row.justify-end
      q-btn(icon="close"
            label="Закрыть"
            flat
            @click="closeEditMode")
    .q-pa-md
      q-scroll-area.kt-scroll-area(:visible="true")
        #trash.row.no-wrap
          WidgetPreview(title="Мои документы"
                        description="Документы, требующие моей реакции"
                        previewUrl="https://picsum.photos/seed/seed1/80/60",
                        @click="addWidget(MyActionableDocumentsWidget)")
          WidgetPreview(v-for="widget in widgets_list"
                        :title="widget.name" 
                        :description="widget.description"
                        :previewUrl="widget.imgUrl"
                        @click="addWidget(widget.component)")
          
    .text-purple.row.items-center.justify-evenly
      div 
        q-icon(name='info')
        span Чтобы удалить виджет с рабочего стола перетащите его обратно в галлерею

section.grid-stack
  WidgetComponent(v-for="widget in widgets", 
                  :domId="widget.id",
                  @mounted.once="registerWidget")
    component(:is="widget.component")

</template>

<style scoped lang="sass">
#trash.row
  gap: 12px
  margin: 0 12px

  *
    width: 400px
.grid-stack 
  background-color: $kedo-light-gray
.grid-stack-item-content
  background-color: $kedo-white
.kt-scroll-area
  height: 212px

</style>

<script setup lang="ts">
import { shallowRef, onMounted , ref} from 'vue';
import { uid } from 'quasar';
import { GridStack, GridStackNode } from 'gridstack';
import WidgetPreview from '../components/widgets/WidgetPreview.vue';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/h5/gridstack-dd-native';
import { useUser } from 'src/stores/user';
import WidgetComponent from '../components/widgets/WidgetComponent.vue';
import MyActionableDocumentsWidget from '../components/widgets/MyActionableDocumentsWidget.vue';
import { getWidgetList } from '../plugins/PluginManager';

const widgets_list = getWidgetList();

// grid instance for widget-like dashboard
let _grid: GridStack;
// user store
const _user = useUser();

const visible = ref(false);

// It holds all the widgets references inside a component
const widgets = shallowRef(new Array<IWidgetContainer>(0));

// We instantiate pure javascript gridstack after vuejs component mounted to DOM
onMounted(() => {
  _initGrid();
});

// Register a widget so the underlineing grid framework to know
// that smth happen inside his stack
function registerWidget(domId: string) {
  if (_grid) {
    const el = _grid.makeWidget(`#${domId}`);
  }
}


// Adds a widget to collection and allow vue engine to rebuild DOM appropriately
function addWidget(componentName: any) {
  const new_widget = {
    id: uid(),
    component: componentName
  };

  widgets.value = [...widgets.value, new_widget];
}

// initialize the grid with options
function _initGrid(): void {
  _grid = GridStack.init({
    removable: '#trash',
    acceptWidgets: true,
    dragIn: '.newWidget',
    dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' },
  });

  // when widget removed from grid we must to destroy reference for it in widgets array
  // so the vuejs will can to collect it.
  _grid.on('removed', (event, items) => removeReferences(items as GridStackNode[]));  
}

function removeReferences(itemsToRemove: GridStackNode[]) {
  for (const item of itemsToRemove) {
    if (!item.id) throw new Error(`Can't remove widget reference. Id is not found`)
    
    // widgets.value = widgets.value.filter(w => w.id != item.id);
  }
}

function closeEditMode() {
  _user.isLayoutInEditMode = false;
}

interface IWidgetContainer {
  id: string,
  component: any
}

</script>

<script lang="ts">
// it's for the KeepAlive works properly
// https://stackoverflow.com/questions/67669820/how-to-define-component-name-in-vue3-setup-tag
export default {
  name: 'DashboardViewLayoutName'
}
</script>