<template>
    <img 
      :src="src" 
      @error="onImageError($event)"
      alt="description" 
    />
</template>

<script setup>

  const onImageError = (event) => {
    event.target.src = 'https://knowledge-base.uplinkweb.ru/files/showcase-empty.png';
  }
const props = defineProps({
  src: {
    type: String,
    required: true
  },
})


</script>

<style scoped>
</style>
