<template>
  <header>
    <div class="container">
      <div v-if="!infoIsEmpty" class="header__info">
        <div class="header__info-worktime">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1C5.02991 1 1 5.02991 1 10C1 14.9701 5.02991 19 10 19C14.9701 19 19 14.9701 19 10C19 5.02991 14.9701 1 10 1ZM10 17.4732C5.87366 17.4732 2.52679 14.1263 2.52679 10C2.52679 5.87366 5.87366 2.52679 10 2.52679C14.1263 2.52679 17.4732 5.87366 17.4732 10C17.4732 14.1263 14.1263 17.4732 10 17.4732Z" fill="black"/>
            <path d="M12.9367 11.9626L10.2208 9.96079V5.15533C10.2208 5.06989 10.1522 5 10.0684 5H9.15236C9.06856 5 9 5.06989 9 5.15533V10.5025C9 10.553 9.02286 10.5996 9.06285 10.6287L12.2129 12.9702C12.2815 13.0207 12.3767 13.0052 12.4263 12.9372L12.971 12.18C13.0204 12.1081 13.0052 12.0111 12.9367 11.9626Z" fill="black"/>
          </svg>
          <div>
            Время работы
            <span>
              {{ siteInfo?.siteInfo?.opening_hours }}
            </span>
          </div>  
        </div>

        <div class="header__info-cityname">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11C9.40666 11 8.82664 10.8241 8.33329 10.4944C7.83994 10.1648 7.45543 9.69623 7.22836 9.14805C7.0013 8.59987 6.94189 7.99667 7.05765 7.41473C7.1734 6.83279 7.45912 6.29824 7.87868 5.87868C8.29824 5.45912 8.83279 5.1734 9.41473 5.05765C9.99667 4.94189 10.5999 5.0013 11.1481 5.22836C11.6962 5.45543 12.1648 5.83994 12.4944 6.33329C12.8241 6.82664 13 7.40666 13 8C12.999 8.79536 12.6827 9.55787 12.1203 10.1203C11.5579 10.6827 10.7954 10.999 10 11ZM10 6.2C9.64399 6.2 9.29598 6.30557 8.99997 6.50336C8.70397 6.70114 8.47326 6.98226 8.33702 7.31117C8.20078 7.64008 8.16513 8.002 8.23459 8.35116C8.30404 8.70033 8.47547 9.02106 8.72721 9.27279C8.97894 9.52453 9.29967 9.69596 9.64884 9.76541C9.998 9.83487 10.3599 9.79922 10.6888 9.66298C11.0177 9.52675 11.2989 9.29604 11.4966 9.00003C11.6944 8.70402 11.8 8.35601 11.8 8C11.7995 7.52276 11.6097 7.0652 11.2723 6.72774C10.9348 6.39027 10.4772 6.20048 10 6.2Z" fill="black"/>
            <path d="M10 19L4.63164 12.6042C4.55705 12.5082 4.48323 12.4115 4.41019 12.3143C3.49318 11.094 2.99778 9.6035 3.00001 8.07143C3.00001 6.19597 3.7375 4.39732 5.05026 3.07117C6.36301 1.74502 8.14349 1 10 1C11.8565 1 13.637 1.74502 14.9497 3.07117C16.2625 4.39732 17 6.19597 17 8.07143C17.0022 9.60281 16.507 11.0926 15.5904 12.3124L15.5898 12.3143C15.5898 12.3143 15.3989 12.5676 15.3703 12.6016L10 19ZM5.42646 11.5396C5.42646 11.5396 5.57473 11.7376 5.60846 11.7801L10 17.0123L14.3973 11.773C14.4253 11.7376 14.5742 11.5384 14.5748 11.5377C15.3239 10.5407 15.7287 9.32309 15.7273 8.07143C15.7273 6.53696 15.1239 5.06534 14.0498 3.98031C12.9757 2.89528 11.519 2.28571 10 2.28571C8.48103 2.28571 7.02428 2.89528 5.95021 3.98031C4.87614 5.06534 4.27273 6.53696 4.27273 8.07143C4.2714 9.32387 4.67668 10.5422 5.42646 11.5396Z" fill="black"/>
          </svg>
          <div>
            Доставка цветов в городе
            <span>
              {{ siteInfo?.siteInfo?.city }}
            </span>
          </div>  
        </div>
      </div>
      <RouterLink :style="{width: infoIsEmpty ? 'fit-content' : isMobile ? 'fit-content' : '100%'}" class="header__logo" to="/">
        <img  class="logo" v-if="siteLogo" :src="`${siteLogo}`" alt="logo">
      </RouterLink>
      <div class="desktop-only" v-if="infoIsEmpty"></div>
      <div class="header__cart-contacts">
        <div class="mobile-only">
          Доставка цветов
        <br class="mobile-only">
        <span v-if="!infoIsEmpty" class="mobile-only">В городе {{ siteInfo?.siteInfo?.city }}</span>
        </div>

        <a class="header__contacts" :href="`tel:${phoneToCall}`">
          {{ phone }}
        </a>
        <div class="cart">
          <router-link v-if="showCart" to="/cart" class="not_empty">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.40499 21C7.90954 21 7.48554 20.8239 7.13302 20.4717C6.78049 20.1195 6.60393 19.6956 6.60333 19.2C6.60333 18.705 6.77989 18.2814 7.13302 17.9292C7.48614 17.577 7.91014 17.4006 8.40499 17.4C8.90045 17.4 9.32474 17.5764 9.67787 17.9292C10.031 18.282 10.2073 18.7056 10.2067 19.2C10.2067 19.695 10.0304 20.1189 9.67787 20.4717C9.32534 20.8245 8.90105 21.0006 8.40499 21ZM17.4133 21C16.9179 21 16.4939 20.8239 16.1413 20.4717C15.7888 20.1195 15.6123 19.6956 15.6117 19.2C15.6117 18.705 15.7882 18.2814 16.1413 17.9292C16.4945 17.577 16.9185 17.4006 17.4133 17.4C17.9088 17.4 18.3331 17.5764 18.6862 17.9292C19.0393 18.282 19.2156 18.7056 19.215 19.2C19.215 19.695 19.0387 20.1189 18.6862 20.4717C18.3337 20.8245 17.9094 21.0006 17.4133 21ZM6.7835 4.8H20.0708C20.4161 4.8 20.6788 4.9539 20.859 5.2617C21.0392 5.5695 21.0467 5.8806 20.8815 6.195L17.6836 11.955C17.5184 12.255 17.2971 12.4875 17.0197 12.6525C16.7422 12.8175 16.438 12.9 16.1071 12.9H9.39591L8.40499 14.7H19.215V16.5H8.40499C7.72937 16.5 7.2189 16.2039 6.87358 15.6117C6.52826 15.0195 6.51325 14.4306 6.82854 13.845L8.04466 11.64L4.80166 4.8H3V3H5.92771L6.7835 4.8Z" fill="white"></path>
            </svg>
            <p class="cart__info-text">В корзине</p>
            <div class="cart__info">
              <p class="cart__info-count"><span class="ms2_total_count">{{ countProduct }}</span> {{ sklonenie(countProduct, ['товар', 'товара', 'товаров']) }}</p>
              <p class="cart__info-price"><span class="ms2_total_cost">{{ priceProduct }}</span> ₽</p>
            </div>
          </router-link>
          <div v-else class="empty">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.40499 21C7.90954 21 7.48554 20.8239 7.13302 20.4717C6.78049 20.1195 6.60393 19.6956 6.60333 19.2C6.60333 18.705 6.77989 18.2814 7.13302 17.9292C7.48614 17.577 7.91014 17.4006 8.40499 17.4C8.90045 17.4 9.32474 17.5764 9.67787 17.9292C10.031 18.282 10.2073 18.7056 10.2067 19.2C10.2067 19.695 10.0304 20.1189 9.67787 20.4717C9.32534 20.8245 8.90105 21.0006 8.40499 21ZM17.4133 21C16.9179 21 16.4939 20.8239 16.1413 20.4717C15.7888 20.1195 15.6123 19.6956 15.6117 19.2C15.6117 18.705 15.7882 18.2814 16.1413 17.9292C16.4945 17.577 16.9185 17.4006 17.4133 17.4C17.9088 17.4 18.3331 17.5764 18.6862 17.9292C19.0393 18.282 19.2156 18.7056 19.215 19.2C19.215 19.695 19.0387 20.1189 18.6862 20.4717C18.3337 20.8245 17.9094 21.0006 17.4133 21ZM6.7835 4.8H20.0708C20.4161 4.8 20.6788 4.9539 20.859 5.2617C21.0392 5.5695 21.0467 5.8806 20.8815 6.195L17.6836 11.955C17.5184 12.255 17.2971 12.4875 17.0197 12.6525C16.7422 12.8175 16.438 12.9 16.1071 12.9H9.39591L8.40499 14.7H19.215V16.5H8.40499C7.72937 16.5 7.2189 16.2039 6.87358 15.6117C6.52826 15.0195 6.51325 14.4306 6.82854 13.845L8.04466 11.64L4.80166 4.8H3V3H5.92771L6.7835 4.8Z" fill="black"></path>
            </svg>
            <p class="cart__info-text">Корзина</p>
          </div>
        </div>
      </div>



    </div>
    <hr>
  </header>
</template>

<script setup>

import { computed } from 'vue';
import {useCartInfo} from "@/stores/cartInfo";
import {useSiteInfo} from "@/stores/siteInfo";
import { getImageOptimized } from '@/composables/utils';

const phone = computed(() => siteInfo.siteInfo.phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($2) $3-$4-$5'));
const phoneToCall = computed(() => siteInfo.siteInfo.phone[0] == 8 ? '+7' + siteInfo.siteInfo.phone.slice(1) : siteInfo.siteInfo.phone);
const cartInfo = useCartInfo();
const siteInfo = useSiteInfo();
const isMobile = computed(() => window.innerWidth < 550);
const siteLogo = computed(() => siteInfo.siteInfo.logo ? getImageOptimized(siteInfo.siteInfo.logo) : null);
const showCart = computed(() => cartInfo.cart.length > 0);
const infoIsEmpty = computed(() => !siteInfo?.siteInfo?.opening_hours && !siteInfo?.siteInfo?.city);
const sklonenie = (number, txt) => {
    let cases = [2, 0, 1, 1, 1, 2];
    return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

const countProduct = computed(() => {
  let count = null;
  cartInfo.cart.forEach((product) => {
    count += product.quantity
  })
  return count
});

const priceProduct = computed(() => {
  let price = null;
  cartInfo.cart.forEach((product) => {
    price += product.quantity * product.price
  })
  
  return new Intl.NumberFormat('ru-RU').format(price)
});

</script>
