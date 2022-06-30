<template lang="pug">
q-btn(@click='saveGraph') Показать граф
#container.row
</template>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 500px;
  display: block;
}
</style>

<script setup lang="ts">
import { onMounted } from 'vue';

import cytoscape from 'cytoscape'

let cy = null;
onMounted(() => {
    cy = cytoscape({
        container: document.getElementById('container'),
        elements: graph,
        style: [ // the stylesheet for the graph
            {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
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
      data: { id: 'start',}
    },
    { // node b
      data: { id: 'b' }
    },
    { // node c
      data: { id: 'c' }
    },
    { // node a
      data: { id: 'finish',}
    },
    { // edge ab
      data: { id: 'start-b', source: 'start', target: 'b' }
    },
    {
      data: {id: 'start-c', source: 'start', target: 'c'}
    },
    {
      data: {id: 'b-finish', source: 'b', target: 'finish'}
    },
    {
      data: {id: 'c-finish', source: 'c', target: 'finish'}
    }
  ]

function saveGraph() {
    console.log(cy.json())
}

</script>
