<template>

  <div class="main-block">
    <MainHeader/>

    <main class="products container">
      <div class="products__head">
        <h1 class="products__head-title">
          Букеты в наличии
        </h1>

        <select class="sort-select" v-model="filter.sortBy" @change="getProducts(currentPage)">
          <option v-for="(sort, key) in sortsList" :key="key" :value="sort"> {{ sort.name }} </option>
        </select>
      </div>

      <div class="products__body">
        <ProductItem
            v-for="(product, product_key) in products"
            :key="product_key"
            :product="product"
        />
      </div>

      <Pagination v-if="filter.limit" :offset="filter.offset" :limit="filter.limit" :pages="countPage" @openPage="getProducts"/>

      <BottomCartMobile/>
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import { useMeta } from "vue-meta";
useMeta({
  title: "Цветочная онлайн-витрина",
})
import { ref, reactive, onMounted, watch } from 'vue';
import MainHeader from "@/components/MainHeader.vue";
import ProductItem from "@/components/ProductItem.vue";
import Footer from "@/components/Footer.vue";
import apiClient from "@/axios.js";
import BottomCartMobile from "@/components/BottomCartMobile.vue";
import Pagination from "@/components/Pagination.vue";

const sortsList = ref([
  {
    name: "По умолчанию",
    sortby: "rank",
    dir: "asc"
  },
  {
    name: "Сначала новые",
    sortby: "content.createdon",
    dir: "desc"
  },
  {
    name: "По названию (А-Я, A-Z)",
    sortby: "content.pagetitle",
    dir: "asc"
  },
  {
    name: "Сначала дешевые",
    sortby: "product.price",
    dir: "asc"
  },
  {
    name: "Сначала дорогие",
    sortby: "product.price",
    dir: "desc"
  },
]);
let products = ref([]);
let currentPage = ref(0);
let countPage = ref(1);
// let limitPage = ref(28);

let filter = ref({
  categoryId: 0,
  sortBy: {
    name: "По умолчанию",
    sortby: "rank",
    dir: "asc"
  },
  selectedStatus: {
    title: 'Все товары',
    name: 'all',
    count: 0,
    condition: {
      '$content.deleted$': 0
    }
  },
  limit: 28,
  offset: 0,
  needComposition: 1
});

let getCountProducts = async () => {
  let response = await apiClient.get(`/products-count?limit=${filter.value.limit}`);
  countPage.value = response.data.pages;
};

let getProducts = async (page) => {
  let refFilter = {...filter.value}
  refFilter.sortBy = JSON.stringify(filter.value.sortBy)
  refFilter.selectedStatus = JSON.stringify(filter.value.selectedStatus)
  // refFilter.limit = filter.value.limit
  refFilter.offset = page * filter.value.limit
  refFilter.publishedOnly = 1
  
  filter.value.offset = refFilter.offset
  let response = await apiClient.get(`/products?${new URLSearchParams(refFilter)}`);
  products.value = response.data.products;
  currentPage.value = page;
};

onMounted(() => {
  getCountProducts()
  getProducts(currentPage.value);
});

watch(() => filter.sortBy, () => {
  getProducts(currentPage.value);
}, { deep: true });

</script>
