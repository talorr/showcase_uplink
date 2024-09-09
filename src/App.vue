<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <KeepAlive>
        <Suspense>
          <component :is="Component"></component>

          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </KeepAlive>
    </template>
  </RouterView>
  <ModalsContainer /> 
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import { ModalsContainer } from 'vue-final-modal'
  import {useSiteInfo} from "@/stores/siteInfo";
  import { computed } from 'vue';


  const siteInfoStore = useSiteInfo()

  const siteName = computed(() => siteInfoStore.siteInfo.sitename ? ' | ' + siteInfoStore.siteInfo.sitename : '')
</script>
