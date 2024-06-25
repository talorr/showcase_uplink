<template>
  <div>
    <MainHeader/>

    <main class="products container">
      <div class="products__head">
        <h1 class="products__head-title">
          Букеты в наличии
        </h1>

        <select class="sort-select" v-model="filter.sortBy">
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

      <div class="pagination--wrap">
        <ul class="pagination">
          <li
              class="page-item"
              :class="{disabled : currentPage === 1}"
              @click="getProducts(1)"
          >
            <span class="page-link">Первая</span>
          </li>

          <li
              class="page-item"
              :class="{active : currentPage === page}"
              v-for="page in countPage"
              :key="page"
              @click="getProducts(page)"
          >
            <span class="page-link">{{ page }}</span>
          </li>

          <li
              class="page-item"
              :class="{disabled : currentPage === countPage}"
              @click="getProducts(countPage)"
          >
            <span class="page-link">Последняя</span>
          </li>
        </ul>
      </div>
    </main>

    <Footer/>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import MainHeader from "@/components/MainHeader.vue";
import ProductItem from "@/components/ProductItem.vue";
import Footer from "@/components/Footer.vue";
import apiClient from "@/axios.js";


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
  {
    name: "По наличию",
    sortby: "product.not_available",
    dir: "asc"
  }
]);
let products = ref([]);
let currentPage = ref(1);
let countPage = ref(1);
let limitPage = ref(28);

let filter = reactive({
  categoryId: 0,
  sortBy: {
    name: "По умолчанию",
    sortby: "rank",
    dir: "asc"
  },
  limit: 0,
  offset: 0,
  needComposition: 1
});

let getCountProducts = async () => {
  let response = await apiClient.get(`/products-count?limit=${limitPage.value}`);
  countPage.value = response.data.pages;
};

let getProducts = async (page) => {
  let refFilter = {...filter}

  refFilter.sortBy = JSON.stringify(refFilter.sortBy)
  refFilter.limit = limitPage.value
  refFilter.offset = (page - 1) * limitPage.value

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
