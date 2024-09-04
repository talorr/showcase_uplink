<template>
  <MainHeader />

  <div class="header-margin container info">
    <h1> Условия доставки </h1>
    <div>
      <!-- <p><span >Доставка цветов осуществляется в городе </span>{{ siteInfoStore.siteInfo.city }}<span >.</span></p> -->
      <p><span >Стоимость доставки:</span></p>
      <ul>
        <li v-for="delivery in deliveriesList.filter(item => item.description == '1' && item.active)" :key="delivery.id" >
          {{ delivery.name }}<span > - </span>{{ delivery.price }} <span >₽;</span>
        </li>
      </ul>
      <p><span >Если у вас остались вопросы, свяжитесь с нашими менеджерами по телефону </span>
        <a :href="'tel:' + phoneToCall">
        {{ siteInfoStore.siteInfo.phone }}
        </a>
        .
      </p>
      <template v-if="data.value">
        <h2>Дополнительная информация</h2>
        <div v-html="data.value">
        </div>
      </template>

    </div>
  </div>

  <Footer/>
</template>

<script setup>
import { useMeta } from "vue-meta";
useMeta({
  title: "Доставка",
})
import { useSiteInfo } from '@/stores/siteInfo';
const siteInfoStore = useSiteInfo();
import { ref, onMounted, computed } from 'vue';
import MainHeader from "../components/MainHeader.vue";
import Footer from "@/components/Footer.vue";
import apiClient from "../axios";

async function getDeliveriesList() {
  let responseDeliveries = await apiClient.get('/deliveries-list');
  deliveriesList.value = responseDeliveries.data.deliveries
}
const phoneToCall = computed(() => siteInfoStore.siteInfo.phone[0] == 8 ? '+7' + siteInfoStore.siteInfo.phone.slice(1) : siteInfoStore.siteInfo.phone);
let deliveriesList = ref([]);
let data = ref({});

const init = async () => {
  let response = await apiClient.get('/showcase-params');
  data.value = response.data.settings.terms;
};

onMounted(() => {
  init();
  getDeliveriesList()
});
</script>

