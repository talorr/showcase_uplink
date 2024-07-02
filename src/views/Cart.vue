<template>
  <div>
    <HeaderCart/>

    <div class="header-margin container block-height">
      <h3 class="cart-title">
        Ваш заказ
      </h3>

      <div v-if="products.length === 0" class="alert alert-warning">
        Ваша корзина пуста
      </div>

      <div v-else class="cart-block">
        <div class="cart-product">
          <hr>
          <div class="cart-product-wrap"
               v-for="(product, product_key) in products"
               :key="product_key"
          >
            <div class="cart-product-row">
              <div class="cart-product-info">
                <div>
                  <Image
                      v-if="product.image"
                      :src="getImgUrl(product.image)"
                      class="cart-product-img"
                      :alt="product.name"
                      :title="product.name"
                  />

                  <Image
                      v-else
                      src="../assets/images/NoItemFound.png"
                      class="cart-product-img"
                      :alt="product.name"
                      :title="product.name"
                  />
                </div>

                <div class="title">
                  {{ product.name }}

                  <div class="cart-product-count">
                    <div class="quantity">
                      <span @click="removeFromCart(product.id)" class="sub cart-product-count-minus">-</span>
                      <input type="text" step="1" class="cart-product-count-value" :value="product.quantity" name="count" />
                      <span @click="addToCart(product)" class="add cart-product-count-plus">+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="cart-product-right-block">
              <span @click="removeItemInCart(product.id)" class="btn">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 23.75C7.5 25.125 8.625 26.25 10 26.25H20C21.375 26.25 22.5 25.125 22.5 23.75V8.75H7.5V23.75ZM23.75 5H19.375L18.125 3.75H11.875L10.625 5H6.25V7.5H23.75V5Z" fill="#212121"/>
                </svg>
              </span>

                <div class="cart-product-price ms-price">
                  <span v-if="product.old_price" class="old-price text-nowrap">{{ getFormattedProductPrice(product.old_price) }} ₽</span>
                  <span class="new-price text-nowrap">{{ getFormattedProductPrice(product.price) }} ₽</span>
                </div>
              </div>
            </div>

            <hr>
          </div>
        </div>



        <div class="cart-product-total">
          <p class="cart-product-total-title">Стоимость</p>

          <div class="ms-footer">
            <div class="total_count">
              <div class="total_count-case">
                <div>
                  Товаров (
                  <span class="ms2_total_count">
                    {{ countProduct }}
                  </span>
                  )
                </div>
                <div>
                  <span class="ms2_total_cost">
                    {{ priceProduct }}
                  </span>
                  ₽
                </div>
              </div>
            </div>

            <div class="total_cost text-nowrap">
              <div class="total">
                <div class="total-cost">
                  <p>Итого</p>
                  <div>
                    <span class="ms2_total_cost ms2_total_summ">{{ priceProduct }}</span>
                    <span>₽</span>
                  </div>
                </div>
                <div class="total-discount">
                  <div class="total-discount-plain">{{ discountPercent }} %</div>
                  <div class="total-discount-summ">
                      <span class="ms2_total_discount">{{ discountCost }}</span>
                      <span> ₽</span>
                  </div>
                </div>
                <router-link to="/checkout" class="make-order make-order-click">
                  Оформить
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script setup>
import Image from "@/components/Image.vue";
import { useMeta } from "vue-meta";
useMeta({
  title: "Корзина",
})
import {ref, reactive, onMounted, watch, computed, getCurrentInstance} from 'vue';
import HeaderCart from "@/components/HeaderCart.vue";
import Footer from "@/components/Footer.vue";
const { proxy } = getCurrentInstance();
import {useCartInfo} from "@/stores/cartInfo";

const cartInfo = useCartInfo();
// const $store = proxy.$store;
const $mainSite = proxy.$mainSite;

const getFormattedProductPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

const products = computed(() => {
  return cartInfo.cart
});

const countProduct = computed(() => {
  let count = null;
  cartInfo.cart.forEach((product) => {
    count += product.quantity
  })
  return count
});

const discountPercent = computed(() => {
  let discount = 0;
  cartInfo.cart.forEach((product) => {
    if(product.old_price < product.price){
      return
    }
    discount += (product.old_price - product.price) / product.old_price * 100
  })
  return Math.round(discount)
})
const discountCost = computed(() => {
  let discount = 0;
  cartInfo.cart.forEach((product) => {
    if(product.old_price < product.price){
      return
    }
    discount +=  (product.quantity *(product.old_price - product.price))  
  })
  return discount
})
const priceProduct = computed(() => {
  let price = null;
  cartInfo.cart.forEach((product) => {
    price += product.quantity * product.price
  })
  return new Intl.NumberFormat('ru-RU').format(price)
});


function getImgUrl(url){
  if(!url) return ''
  return $mainSite + url
}

function addToCart(product) {
  cartInfo.addItem(product);
}

function removeFromCart(productId) {
  cartInfo.removeItem(productId);
}

function removeItemInCart(productId) {
  cartInfo.removeItemInCart(productId);
}



</script>
