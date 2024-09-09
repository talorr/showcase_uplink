<template>
  <div>
    <MainHeader />

    <section class="error-page">
      <div class="container">
        <img src="../assets/images/404.png" alt="404">
        <span>Такой страницы не существует</span>
        <router-link to="/">
          Вернуться на главную
        </router-link>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'
useHead({
  title: "Страница не найдена",
  meta: [
    {
      name: 'description',
      content: 'Страница не найдена'
    }
  ]
})
import MainHeader from "@/components/MainHeader.vue";
import Footer from "@/components/Footer.vue";

</script>
