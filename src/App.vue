<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content}` : `Цветочная онлайн-витрина` }}</template>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </metainfo>
  <RouterView />
  <ModalsContainer />
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import { ModalsContainer } from 'vue-final-modal'
</script>
