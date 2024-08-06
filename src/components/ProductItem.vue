<template>
  <div class="product-item">
    <div
        class="product-item-img"
        @click="showModal(product)"
        @close="closeModal"
    >
      <Image :src="imgUrl" :alt="product.name" :title="product.name" itemprop="image"/>
    </div>
    <div class="product-item-price-row">
      <p class="product-item-price">{{ getFormattedProductPrice(product.price) }} ₽</p>
      <p v-if="product.old_price" class="product-item-old-price">{{ getFormattedProductPrice(product.old_price) }} ₽</p>
      <template v-if="product.discount > 0">
        <div v-if="product.is_discount_number > 0" class="product-item-discount">{{ product.discount }}₽</div>
        <div v-else class="product-item-discount">{{ product.discount }}%</div>
      </template>
    </div>
    <div class="product-item-title">
      {{ product.name }}
    </div>
    <div class="product-item-add-to-cart">
      <div
          v-if="countProduct === 0"
          class="empty"
          @click="addToCart"
      >
        <IconCart />
        В корзину
      </div>

      <div
          v-else
          class="not_empty"
      >
        <span @click="removeToCart">-</span>
        <span>{{countProduct}}</span>
        <span @click="addToCart">+</span>
      </div>


    </div>
  </div>
</template>

<script setup>

import { computed, toRefs } from 'vue';
import IconCart from "@/components/icons/IconCart.vue";
import {useModal} from 'vue-final-modal';
import ProductModal from "@/components/ProductModal.vue";
import {useCartInfo} from "@/stores/cartInfo";
import Image from "@/components/Image.vue";
import { getImageOptimized } from '@/composables/utils';

const cartInfo = useCartInfo();

const getFormattedProductPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const productModal = useModal({
  component: ProductModal,
  attrs: {
    product: {}
  },
});

function showModal(product) {
  productModal.patchOptions({
    attrs: {
      product: product
    },
  });
  productModal.open();
}

function addToCart() {
  let product = {
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    old_price: props.product.old_price,
    image: props.product.images[0].url
  }
  cartInfo.addItem(product);
}

function removeToCart() {
  cartInfo.removeItem(props.product.id);
}


const { product } = toRefs(props);
const imgUrl = computed(() => {
  if (!product.value?.images && !product.value?.images?.length) {
    return ''
  }
  return getImageOptimized(product.value?.images[0]?.url) + '?width=278&height=278&format=webp'

});

const countProduct = computed(() => {
  let existingProduct = cartInfo.cart.find(item => item.id === props.product.id);
  if (existingProduct){
    return existingProduct.quantity
  }
  return 0
});

</script>
