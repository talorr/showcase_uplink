<template>
  <div>
    <HeaderCheckout/>

    <div class="header-margin container cart-block">
      <div v-if="!orderCreated" class="order-input">
        <div>
          <h4 class="order-input__row-title">Укажите Ваши контактные данные:</h4>
          <div class="order-input__row">
            <div class="order-input__container">
              <div v-for="(info, info_key) in order.user" :key="info_key" class="form-group row input-parent">
                <input type="text" :class="{'error': !validateClientInfo?.obj[info_key]}" :placeholder="titles[info_key]" :name="info_key" v-model="order.user[info_key]" required>
              </div>
              <div class="form-group"></div>
            </div>
          </div>

          <h4 class=order-input__row-title>Кому отправить букет?</h4>
          <div class="order-input__row">
            <div class="order-input__container">
              <div class="card-checkbox">
                <input id="checkout_sender" name="checkout_sender" type="checkbox" v-model="order.im_receiver">
                <label for="checkout_sender">Я сам получу заказ</label>
              </div>
              <div v-if="!order.im_receiver" class="form-group row input-parent checkout_sender-group">
                <input :class="{'error': !validateReceiverInfo?.obj['name']}" type="text" placeholder="Имя получателя*" name="receiver_name" v-model="order.receiver.name" class="form-control">
              </div>
              <div v-if="!order.im_receiver" class="form-group row input-parent checkout_sender-group">
                <input :class="{'error': !validateReceiverInfo?.obj['phone']}" type="text" placeholder="Телефон получателя*" name="receiver_phone" v-model="order.receiver.phone" class="form-control">
              </div>
            </div>
          </div>

          <div class="order-input__row">
            <h4 class=order-input__row-title>Укажите адрес доставки</h4>
            <span class="validation-text" v-if="!order.courier_delivery && !order.pickup" name="deliverytype">Необходимо выбрать способ доставки!</span>
            
            <div class="order-input__container">
              <div v-if="!order.courier_delivery" class="card-checkbox card-checkbox-pickup">
                <input type="checkbox" v-model="order.pickup" id="delivery_type-pickup" :value="1" @change="deliveryPrice($event)">
                <label for="delivery_type-pickup">Самовывоз</label>
              </div>
              <div v-if="!order.pickup" class="card-checkbox card-checkbox-courier">
                <input type="checkbox" id="delivery_type-courier" v-model="order.courier_delivery" :checked="order.courier_delivery">
                <label for="delivery_type-courier">Доставка курьером</label>
              </div>

              <div class="block-pickup" v-if="order.pickup">
                <div
                    class="card-checkbox"
                    v-for="(delivery, delivery_key) in deliveriesList"
                    :key="delivery_key"
                >
                  <input type="radio" :id="`delivery-${delivery.id}`" :value="delivery.id" v-model="order.delivery" @change="deliveryPrice($event)">
                  <label :for="`delivery-${delivery.id}`">{{ delivery.name }}</label>
                </div>
              </div>

              <div class="block-courier" v-if="order.courier_delivery">
                <div class="card-checkbox">
                  <input id="checkout_reciever_address" type="checkbox" v-model="order.checkout_reciever_address">
                  <label for="checkout_reciever_address">Уточнить адрес у получателя</label>
                </div>

                <div class="block-courier-select" :class="order.checkout_reciever_address ? 'block-courier-case' : ''">
                  <div class="form-select2 ">
                    <select name="delivery" class="delivery-select select2" v-model="order.delivery" @change="deliveryPrice($event)">
                      <option v-for="(delivery, delivery_key) in deliveriesList" :key="delivery_key" :value="delivery.id"> {{ delivery.name }} </option>
                    </select>
                  </div>

                  <div v-if="order.checkout_reciever_address" class="form-group"></div>

                  <div
                      v-for="(address, address_key) in order.address"
                      :key="address_key"
                      class="form-group row input-parent group-address"
                
                      v-show="!order.checkout_reciever_address"
                  >
                    <input
                        type="text"
                        :placeholder="titles[address_key]"
                        :name="address_key"
                        :class="{ 'error': validateOrderDeliveryInfo.obj[address_key] == false }"
                        v-model="order.address[address_key]"
                        class="form-control">
                  </div>
                </div>

                <div class="form-group row input-parent form-group-textarea">
                  <textarea
                      name="comment"
                      placeholder="Комментарий"
                      class="form-control{('comment' in list $errors) ? ' error' : ''}"
                      v-model="order.comment"
                  />
                </div>
              </div>
            </div>
          </div>

          <h4 class=order-input__row-title>Выберите дату и время доставки</h4>
          <div class="order-input__row order-input__date">
            <div class="order-input__container">
              <div class="card-checkbox">
                <input id="checkout_delivery_date" type="checkbox" v-model="order.checkout_delivery_date">
                <label for="checkout_delivery_date">Уточнить у получателя</label>
              </div>

              <div
                  v-if="!order.checkout_delivery_date"
                  class="form-group row input-parent date-main"
              >
                <VueDatePicker
                    placeholder="Дата доставки*"
                    v-model="order.delivery_date"
                    locale="ru-RU"
                    format="dd.MM.yyyy"
                    :enable-time-picker="false"
                    :min-date="new Date()"
                    :format="formatDate"
                />
              </div>

              <div class="form-group"></div>

              <div
                  v-if="!order.checkout_delivery_date && intervals.length > 0"
                  class="time-container form-group row input-parent"
                  :class="order.checkout_delivery_date ? 'delivery-date-inactive' : ''"
              >
                <select name="delivery_time" class="select2" v-model="order.delivery_time">
                  <option
                      v-for="(interval, interval_key) in intervals"
                      :key="interval_key"
                      :value="interval.value"
                      :disabled="interval.disabled"
                  >
                    {{ interval.value }}
                  </option>
                </select>
              </div>
              <div class="form-group"></div>
            </div>
          </div>

          <h4 class=order-input__row-title>Дополнительно</h4>
          <div class="order-input__row">
            <div class="order-input__container">
              <div class="card-checkbox">
                <input id="checkout_anonymous" type="checkbox" v-model="order.checkout_anonymous">
                <label for="checkout_anonymous">Отправить анонимно</label>
              </div>

              <div></div>
              <div class="card-checkbox">
                <input id="checkout_make_photo" type="checkbox" v-model="order.checkout_make_photo">
                <label for="checkout_make_photo">Сделать фото с получателем</label>
              </div>
            </div>
          </div>

          <div class="order-input__row" id="payments">
            <div class="order-input__row-title">Выберите способ оплаты</div>
            <div class="payments__rows">
              <div
                  class="card-checkbox payments__row input-parent"
                  v-for="(payment, payment_key) in payments"
                  :key="payment_key"
              >
                <label class="col-form-label payment">
                  <input type="radio" name="payment" v-model="order.payment" :value="payment.id">
                  <Image :src="$mainSite + payment.logo" :alt="payment.name" :title="payment.name" class="mw-100"/>
                  <span>{{ payment.name }}</span>
                </label>
              </div>
            </div>
          </div>

        </div>

        <div id="msCart" class="cart-product-total">
          <p class="cart-product-total-title">Стоимость</p>
          <div class="ms-footer">
            <div class="total_count">
              <div class="total_count-case">
                <div>{{ sklonenie(countProducts, 'Товар', 'Товара', 'Товаров') }} ({{ countProducts }})</div>
                <div>
                  <span class="ms2_order_cart_cost">{{ order?.cart_cost ? cartCost : 0 }}</span> ₽
                </div>
              </div>
              <div class="total_count-case">
                <div>Доставка</div>
                <div>
                  <span class="ms2_order_delivery_cost">{{ order.delivery_cost }}</span> ₽
                </div>
              </div>
              <div class="total_count-case">
                <div>Скидка</div>
                <div>
                  <span class="">{{ order?.discount_cost ? order.discount_cost : 0 }}</span> ₽
                </div>
              </div>
            </div>

            <div class="total_cost text-nowrap">
              <div class="total">
                <div class="total-cost">
                  <p>Итого</p>
                  <div>
                    <span class="ms2_order_cost ms2_total_summ">{{ order?.cost ? orderCost : 0 }}</span>
                    <span> ₽</span>
                  </div>
                </div>
                <button :disabled="disableOrderButton" class="make-order" @click="makeOrder()"> Заказать </button>
              </div>
            </div>
            <div class="total-policy">
              Нажимая кнопку заказать вы принимаете
              <router-link to="/policy">
                политику конфиденциальности
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-else  class="container success">
        <div class="success-title">Заказ № {{ justCreatedOrder?.num }} успешно оформлен</div>
        <div class="success-header">Информация о заказе</div>
          
        <div class="success-cont">
          <div class="success-case" v-for="product in order.products">  
            <img :src="getImgUrl(product.image)" alt="Сборный букет «Синева»" title="Сборный букет «Синева»">
            <div class="success-desc">
                <span>{{ product.title }}</span>
                <span> Цена: {{ product.cost }} ₽ </span>
                <span> Количество: {{product.count}} шт.</span>
            </div>
          </div>                              
        </div>
        
        <div class="success-header">Информация о доставке</div>
        <p v-show="justCreatedOrder?.address?.courier_delivery === 'on'">Способ доставки: <span>Балтийская 120</span></p>
        <p>Способ оплаты: <span>{{getCurrentPaymentName(justCreatedOrder.payment)}}</span></p>
         
        <p v-show="order.receiver.name">Имя получателя: <span>{{ order.receiver.name }}</span></p>
        <p v-show="order.receiver.phone">Телефон получателя: <span>{{order.receiver.phone}}</span></p>    
        <p>Дата доставки: <span style="color: #333">{{ justCreatedOrder?.address?.delivery_date }}</span></p>
        <p>Время доставки: <span style="color: #333">{{ justCreatedOrder?.address?.delivery_time_raw }}</span></p>
            <br>
        <div class="success-header">Контактные данные заказчика</div>
        <p>Имя заказчика: <span>{{ order?.user?.fullname }}</span></p>
        <p>Телефон заказчика: <span>{{order?.user?.mobilephone}}</span></p>
        <p>Почта заказчика: <span>{{ order?.user?.email }}</span></p>
        <br>
        
        <div class="success-header">ИТОГО: </div>
          Сумма товаров: {{ justCreatedOrder?.cart_cost }} ₽ <br>
          Итого: <strong>{{ justCreatedOrder?.cost }}</strong> ₽                
        <a href="/" class="success-href">Вернуться на главную</a>
      </div>
    </div>
    <Footer/>
  </div>


</template>

<script setup>
import Image from "@/components/Image.vue";
import { useMeta } from "vue-meta";
useMeta({
  title: "Оформление заказа",
})
import {ref, reactive, onMounted, watch, computed, getCurrentInstance,watchEffect} from 'vue';
import HeaderCheckout from "@/components/HeaderCheckout.vue";
import Footer from "@/components/Footer.vue";
const { proxy } = getCurrentInstance();
import {useCartInfo} from "@/stores/cartInfo";
import apiClient from "@/axios.js";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const cartInfo = useCartInfo();
const $mainSite = proxy.$mainSite;

const getCurrentPaymentName = (id) => {
  if(!id) return '-'
  return paymentsList.value?.find(item => id === item.id).name
}

const disableOrderButton = computed(() => {
  if(!order.courier_delivery && !order.pickup) return true
  if(order.courier_delivery && validateOrderDeliveryInfo.value.errorsCount > 0) return true
  if(validateClientInfo.value.errorsCount > 0) return true
  if(validateReceiverInfo.value.errorsCount > 0) return true
})

const titles = {
  fullname: "Ваше Имя*",
  mobilephone: "Ваш телефон*",
  email: "E-mail*",
  street: "Улица",
  building: "Дом",
  entrance: "Подъезд",
  floor: "Этаж",
  room: "Квартира",
}

const order =  reactive({
  checkout_anonymous: false,// отправить анонимно
  checkout_delivery_date: false,// Уточнить дату и время у получателя (или Уточнить у  получателя)
  checkout_make_photo: false,// сделать фото с получателем
  checkout_reciever_address: false,// уточнить адрес у получателя
  delivery_date: "", // дата доставки(можно не убирать время)
  delivery_time: "", // времядоставки
  pickup: false, // самовывоз
  im_receiver: false, // я и есть получатель
  courier_delivery: false, // доставка курьером
  comment: "",

  address: {
    street: "",// улица,
    
    building: "", // дом
    entrance: "", // подъезд
    floor: "", // этаж
    room: "", // квартира

  },

  user: { // контактные данные
    fullname: "", // ваше имя
    mobilephone: "", // ваш телефон
    email: ""// e-mail
  },

  receiver: {
    name: "",// имяполучателя
    phone: "", // телефон получателя
  },

  cart_cost: 0, // сумма товаров
  cost: 0, // сумма заказов (она же ИТОГО)
  delivery: 0,// вариант доставки
  delivery_cost: 0, // стоимость доставки
  delivery_rank: '0',// способ доставки, 0 – самовывоз, 1 – Доставка курьером
  payment: 0,// способ оплаты
});

let deliveryIntervals = ref([]);
let deliveriesList = ref([]);
let paymentsList = ref([]);
const validateOrderDeliveryInfo = computed(() => {
  let obj = {
    building: true,
    room: true,
    street: true
  }
  let errorsCount = 0
  Object.entries(order.address).map(([key, item]) => {
    if (item.length === 0 && !!obj[key]) {
      obj[key] = false;
      errorsCount++;
    }
  })
  return {obj,errorsCount}
})
const validateClientInfo = computed(() => {
  let obj = {
    fullname: true,
    mobilephone: true,
    email: true  
  }
  let errorsCount = 0
  Object.entries(order.user).map(([key, item]) => {
    if (item.length === 0) {
      obj[key] = false;
      errorsCount++;
    }

  })
  return {obj,errorsCount}
})
const validateReceiverInfo = computed(() => {
  let obj = {
    name: true,
    phone: true
  }
  let errorsCount = 0
  if(order.im_receiver) return {obj,errorsCount}
  
  Object.entries(order.receiver).map(([key, item]) => {
    if (item.length === 0) {
      obj[key] = false;
      errorsCount++;
    }
  })
  return {obj,errorsCount}
})
const payments = computed(() => {
  order.payment = 0

  let delivery = deliveriesList.value.find((item) =>{
    if (item.id === order.delivery) return item
  })

  return paymentsList.value?.filter((payment) => {
    if (delivery.payments.indexOf(payment.id) > -1) return payment
  })
});






const requestPayment = async (orderId) => {

  try {
    const payload = {
      catchUrl:
        //import.meta.env.VITE_API_BASE_URL +
        'http://localhost:3002/api/catch-yookassa-order-payment',
        //"/api/catch-yookassa-order-payment",
      orderId: orderId,
    };

    const response = await axios.post("http://localhost:3002/api/create-order-payment", payload);
      console.log(response);
    if (response.data.payment.confirmation.confirmation_url) {
      window
        .open(response.data.payment.confirmation.confirmation_url, "_blank")
        .focus();
    } else alert("Что-то пошло не так");
  } catch (error) {
    console.log();
  }
};















const intervals = computed(() => {

  let today = new Date()
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  let selectDate = new Date(order.delivery_date)
  selectDate = new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate())
  if (Number(today) === Number(selectDate)){

    let realClock = new Date().getHours();
    let intervals = []
    deliveryIntervals.value.forEach((elem) => {
      let interval = {
        value: elem
      }

      let clockStart = elem.split('-')[0].split(':')[0];
      if (Number(clockStart) < Number(realClock)) {
        interval.disabled = "disabled"
      }
      intervals.push(interval)
    })
    return intervals
  }else{
    return deliveryIntervals.value.map((elem) => {
      return {value: elem}
    })
  }

})

const countProducts = computed(() => {
  let count = 0;
  cartInfo.cart.forEach((product) => {
    count += product.quantity
  })
  return count
});

const priceProducts = computed(() => {
  let price = 0;
  cartInfo.cart.forEach((product) => {
    price += product.quantity * product.price
  })
  return price
});

const discountProducts = computed(() => {
  let discount = 0;
  cartInfo.cart.forEach((product) => {
    if (product.old_price){
      discount += product.old_price - product.price
    }
  })
  return discount
});

async function getDeliveriesList() {
  let responseDeliveries = await apiClient.get('/deliveries-list');
  deliveriesList.value = responseDeliveries.data.deliveries

  order.delivery = deliveriesList.value[0].id
  order.delivery_cost = order.pickup ? 0 : Number(deliveriesList.value[0].price)
}

async function getPaymentsList() {
  let responsePayments = await apiClient.get('/payments-list');
  paymentsList.value = responsePayments.data.payments
}

async function getIntervals() {
  let responseIntervals = await apiClient.get('/intervals');
  deliveryIntervals.value = responseIntervals.data.intervals.options.split(",")
}


function getImgUrl(url){
  if(!url) return ''
  return $mainSite + url
}
function init() {
  getDeliveriesList();
  getPaymentsList()
  getIntervals()

  order.products = cartInfo.cart
  order.cart_cost = priceProducts
  order.discount_cost = discountProducts
  order.delivery_date = new Date()

}

const initDeliverytime = (interval) => {
  order.delivery_time = interval?.value
}
function deliveryPrice(event){
  if (order.pickup){
    order.delivery_cost = 0
  }else{
    let delivery = deliveriesList.value.find((elem) =>{
      if (Number(elem.id) === Number(event.target.value)) return elem
    })
    order.delivery_cost = Number(delivery.price)
  }
}
const sklonenie = (number, txt) => {
    let cases = [2, 0, 1, 1, 1, 2];
    return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
const cartCost = computed(() => {
  const intl = new Intl.NumberFormat('ru-RU');
  return intl.format(Number(order.cart_cost))
})
const orderCost = computed(() => {
  const intl = new Intl.NumberFormat('ru-RU');
  return intl.format(Number(order.cost))
})
const deliveryDateFormat = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
} 


function extractTime(dateString) {
  const date = dateString.split('-')

  const startDate = date[0].split(':')[0]
  const endDate = date[1].split(':')[0]

  const timeArray = [
    { hours: startDate, minutes: 0 },
    { hours: endDate, minutes: 0 }
  ];

  return timeArray;
}

const orderCreated = ref(false)
async function makeOrder(){
  order.products.map((product) => {
    product.count = Number(product.quantity)
    product.cost = Number(product.price)
    product.title = product.name
    return product
  })
  let newOrder = JSON.parse(JSON.stringify(order));


  let obj = {  
    address: {
        "building": newOrder.address.building,
        "checkout_anonymous": newOrder.checkout_anonymous,
        "checkout_call": false,
        "checkout_delivery_date": newOrder.checkout_delivery_date,
        "checkout_make_photo": newOrder.checkout_make_photo,
        "checkout_reciever_address": newOrder.checkout_reciever_address,
        "checkout_text_card": '',
        "city": '',
        "comment": newOrder.comment,
        "courier_delivery": newOrder.courier_delivery ? "on" : "off",
        "delivery_date": deliveryDateFormat(newOrder.delivery_date),
        'delivery_new_date': deliveryDateFormat(newOrder.delivery_date),
        "delivery_time": extractTime(newOrder?.delivery_time),
        "delivery_time_raw": newOrder?.delivery_time,
        "email": newOrder.user.email,
        "entrance": newOrder.address.entrance,
        "floor": newOrder.address.floor,
        "index": "",
        "phone": newOrder.receiver.phone,
        "pickup_sam": newOrder.im_receiver,
        "postcard_free": false,
        "postcard_text": "",
        "receiver": '',
        "receiver_name": newOrder.receiver.name,
        "receiver_phone": newOrder.receiver.phone,
        "room": newOrder.address.room,
        "send_whatsapp": false,
        "street": newOrder.address.street
    },
    "admin_comment": "",
    "archive": 0,
    "cart_cost": newOrder.cart_cost,
    "cost": newOrder.cost,
    "cost_change": 0,
    "coupon_code": "",
    "coupon_discount": "0%",
    "coupon_value": "",
    "createdon": (new Date()).toISOString(),
    "delivery": newOrder.delivery,
    "delivery_cost": newOrder.delivery_cost,
    "delivery_date": newOrder.delivery_date,
    "delivery_rank": newOrder.delivery_rank,
    "is_cost_change_number": 0,
    "payment": newOrder.payment,
    "payment_status": 1,
    "properties": "{\"cf.from_city\":\"1\"}",
    "source": "Корзина",
    "status": 1,
    "user_id": null,
    products: newOrder.products,
    }
  newOrder.user.orderNewUser = true
  let {data: responseMakeOrder,status} = await apiClient.post('/order', {order:obj, userId: null,user: newOrder.user});

  if(status === 200){
    console.log(responseMakeOrder.orderId);
    //await requestPayment(responseMakeOrder.orderId)
    orderCreated.value = true
    justCreatedOrder.value = (await apiClient.get('/order?id=' + responseMakeOrder.orderId)).data.order;
    // Create payment
    const paymentResponse = await apiClient.post('/create-order-payment', {
      amount: newOrder.cost,
      currency: 'RUB',
      description: `Order ${responseMakeOrder.orderId}`,
    });

    if (paymentResponse.status === 200) {
      const { id, confirmation } = paymentResponse.data;
      // Redirect user to the payment page
      window.location.href = confirmation.confirmation_url;
    }
  }
  
}
const justCreatedOrder = ref(-1)
const formatDate = (date) => {
  const day = date.getDate();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

onMounted(() => {
  init();
  
  watchEffect(() => {
    let intervalInit = intervals.value?.find(interval => !interval?.disabled)
    initDeliverytime(intervalInit)
    let paymentInit = payments.value[0]
    if(!!paymentInit) order.payment = paymentInit.id

  })
});

watch(() => order, () => {
  order.cost = order.cart_cost + order.delivery_cost - order.discount_cost
}, { deep: true });



</script>
