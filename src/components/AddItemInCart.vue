<template>
  <VueFinalModal
      v-slot="{ close }"
      class="goto-cart-overlay"
      content-class="goto-cart-overlay__content"
  >

    <div class="goto-cart-overlay__close-button">
      <svg @click="close" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L19 19M19 1L1 19" stroke="#B9B9B9"></path>
      </svg>
    </div>
    <p>Товар добавлен в корзину</p>
    <div class="goto-cart-overlay__content-buttons">

      <router-link to="/cart" class="go-cart">
        Перейти к оформлению
      </router-link>
      <button @click="close" class="go-catalog">
        Продолжить покупки
      </button>
    </div>

  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import 'swiper/swiper-bundle.css';
</script>

