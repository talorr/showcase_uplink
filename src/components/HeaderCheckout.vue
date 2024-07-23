<template>
  <header>
    <div class="container">
      <router-link :to="props.gotoMainPage ? '/' : '/cart'" class="go-back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L9 12L15 18" stroke="#B9B9B9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Вернуться {{ props.gotoMainPage ? 'на главную' : 'в корзину' }}
      </router-link>
    </div>
  </header>
</template>
<script setup>
const props = defineProps({
  gotoMainPage: false
})
</script>
