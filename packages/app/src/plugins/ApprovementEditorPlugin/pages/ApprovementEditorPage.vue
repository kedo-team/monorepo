<template lang="pug">
//- q-btn(@click='saveGraph') Показать граф
.kt-content-container
  //- q-img.kt-under-construction(src='/under-construction.png' fit='fill'
  //-         width='200px'
  //-         height='200px')
  //- #container.row
  //- iframe(src="http://localhost:3000/public/dashboard/a4d532c8-c81b-4116-b5b7-297b8349c201"
  //-        frameborder="0"
  //-        width="100%"
  //-        height="600"
  //-        allowtransparency)
</template>

<style scoped lang="sass">
#container
  width: 100%
  height: 500px
  display: block

.kt-content-container
  position: relative

.kt-under-construction
  position: absolute
  right: -10px

</style>

<script setup lang="ts">
import { onMounted } from 'vue';

import cytoscape from 'cytoscape'

let cy = null;
onMounted(() => {
  return
    cy = cytoscape({
        container: document.getElementById('container'),
        elements: graph,
        layout: 'circle',
        style: [ // the stylesheet for the graph
            {
                selector: '#start, #finish',
                style: {
                    shape: 'diamond',
                    'background-color': 'gray',
                    'label': 'Старт'
                }
            },
            {
            selector: 'node[label!=""]',
            style: {
                'background-color': 'green',
                'label': 'data(title)'
            }
            },

            {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
            }
        ]

    });
    console.log(cy)
})

const graph = [ // list of graph elements to start with
    { // node a
      data: { id: 'start'}
    },
    { // node b
      data: { id: 'atolk', title: 'Антон Толкачев' }
    },
    { // node c
      data: { id: 'lera', title: 'Валерия Толкачева' }
    },
    { // node a
      data: { id: 'finish'}
    },
    { // edge ab
      data: { id: 'start-lera', source: 'start', target: 'lera' }
    },
    {
      data: {id: 'lera-atolk', source: 'lera', target: 'atolk'}
    },
    {
      data: {id: 'atolk-finish', source: 'atolk', target: 'finish'}
    }
  ]

function saveGraph() {
    console.log(cy.json())
}

</script>
