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
          WidgetPreview(v-for="widget in widgets_list"
                        :title="widget.name"
                        :description="widget.description"
                        :previewUrl="widget.imgUrl"
                        @click="addWidget(widget.component)")

    .text-purple.row.items-center.justify-evenly
      div
        q-icon(name='info')
        span Чтобы удалить виджет с рабочего стола перетащите его обратно в галлерею
.row(v-if='!_user.isLayoutInEditMode').justify-end
  q-btn(@click='_user.isLayoutInEditMode = true'
  flat) редактировать
section.grid-stack
  WidgetComponent(v-for="widget in widgets",
                  :domId="widget.id",
                  :w='widget.w'
                  :h='widget.h'
                  :x='widget.x'
                  :y='widget.y'
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
import { shallowRef, onMounted , ref, defineAsyncComponent} from 'vue'
import { uid } from 'quasar'
import { GridStack, GridStackNode } from 'gridstack'
import WidgetPreview from 'src/components/widgets/WidgetPreview.vue'
import 'gridstack/dist/gridstack.min.css'
import 'gridstack/dist/h5/gridstack-dd-native'
import { useUser } from 'src/stores/user'
import WidgetComponent from 'src/components/widgets/WidgetComponent.vue'
import { getWidgetList } from 'src/plugins/PluginManager'
import type { IWidgetDefinition } from 'src/plugins/PluginManager'

const widgets_list = ref<IWidgetDefinition[]>([])
widgets_list.value = await getWidgetList();

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
  addSampleComponents();
});

// Register a widget so the underlineing grid framework to know
// that smth happen inside his stack
function registerWidget(domId: string) {
  if (_grid) {
    const el = _grid.makeWidget(`#${domId}`);
  }
}


// Adds a widget to collection and allow vue engine to rebuild DOM appropriately
function addWidget(componentName: any, w?:number, h?:number, x?:number, y?:number) {
  console.log('adding widget with component: ', componentName)
  const new_widget: IWidgetContainer = {
    id: uid(),
    component: defineAsyncComponent(()=>
      componentName()
    ),
    w,
    h,
    x,
    y
  }

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
  console.log(_grid)

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
  component: any,
  w: number,
  h: number,
  x: number,
  y: number
}

function addSampleComponents() {
  savedLayout.forEach(el => {
    const widget = widgets_list.value.find(w => w.name == el.name)
    addWidget(widget.component, el.w, el.h, el.x, el.y)
  })
}

const savedLayout = [{
  name: 'Быстрый навигатор',
  w: 3,
  h: 6,
  x: 0,
  y: 0
},
{
  name: 'Перечень актуальных ЛНА',
  w: 12,
  h: 5,
  x: 0,
  y: 6
},
{
  name: 'Мои документы',
  w: 9,
  h: 6,
  x: 3,
  y: 0
}
]

</script>

<script lang="ts">
// it's for the KeepAlive works properly
// https://stackoverflow.com/questions/67669820/how-to-define-component-name-in-vue3-setup-tag
export default {
  name: 'DashboardViewLayoutName'
}
</script>