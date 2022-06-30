<template lang='pug'>
q-page
  .column
    .row.justify-center
      .col.block: BlockHero
    .row.justify-center 
      .col.block: BlockReason
    .row.justify-center 
      .col.block: BlockMainFeatures
    //- .row.justify-center 
    //-   .col.block: BlockFAQ

</template>
<style scoped lang='sass'>
.block
  max-width: 1280px

</style>

<script setup lang='ts'>
import { useMeta } from 'quasar'
import BlockHero from './components/BlockHero.vue'
import BlockReason from './components/BlockReason.vue'
import BlockMainFeatures from './components/BlockMainFeatures.vue'
import BlockFAQ from './components/FAQ/BlockFAQ.vue'
import type { MetaOptions } from 'quasar/dist/types/meta'

const metaData: MetaOptions = {
  // sets document title
  title: 'КЭДО - платформа для построения интегрированных кадровых решений',
  // optional; sets final title as 'Index Page - My Website', useful for multiple level meta
  // titleTemplate: title => `${title} - My Website`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'КЭДО, ЭКДО, автоматизация кадров' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      content: 'kedo-team - Решение КЭДО'
      // optional; similar to titleTemplate, but allows templating with other meta properties
    },
    ogImage: {
      property: 'og:image',
      content: 'https://kedo-team.ru/block-hero.png'
    },
    ogType: {
      property:'og:type',
      content: 'website'
    },
    ogDescription: {
      property: 'og:description',
      content: 'Решение для построения интегрированных систем электронных кадров'
    }
  },

  // CSS tags
  link: {
    material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
    font:     { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700' },
    ...get_favicons()
  },

  // JS tags
  script: {
    ldJson: {
      type: 'application/ld+json',
      innerHTML: `{ '@context': 'http://schema.org' }`
    },
    jivo: {
      src: '//code.jivo.ru/widget/AL5IrMvnvO',
      async: true
    },
    ya_forms: {
      src:  'https://yastatic.net/s3/frontend/forms/_/embed.js',
      defer: true
    }

  },

  // <html> attributes
  htmlAttr: {
    'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc='http://creativecommons.org/ns#'>,
    empty: undefined // generates <html empty>
  },

  // <body> attributes
  // bodyAttr: {
  //   'action-scope': 'xyz', // generates <body action-scope='xyz'>
  //   empty: undefined // generates <body empty>
  // },

  // <noscript> tags
  // noscript: {
  //   default: 'This is content for browsers with no JS (or disabled JS)'
  // }  
}

function get_favicons(): MetaOptions['link'] {
  
  const val: MetaOptions['link'] = {
    favicon: { 
      rel: 'icon',
      type: 'image/ico',
      href: '/icons/favicon.ico' }
  }
  
  new Array<number>(128, 96, 32, 16).forEach(el => {
    val[`favicon_${el}`] = {
         rel: 'icon',
         type: 'image/png',
         sizes: `${el}x${el}`,
         href: `/icons/favicon-${el}-${el}.png`
    }
  })

  return val;
  
}

useMeta(metaData)
</script>
