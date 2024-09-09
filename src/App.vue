<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} ${siteName}` : 'Цветочная онлайн-витрина' }}</template>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </metainfo>

  <RouterView />
  <!-- <ModalsContainer />  -->
  <Test />
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import { ModalsContainer } from 'vue-final-modal'
  import {useSiteInfo} from "@/stores/siteInfo";
  import { computed } from 'vue';
  import Test from './Test.vue'


  const siteInfoStore = useSiteInfo()

  const siteName = computed(() => siteInfoStore.siteInfo.sitename ? ' | ' + siteInfoStore.siteInfo.sitename : '')
</script>
