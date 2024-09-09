<template>
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
