<template>
<MainHeader />

<div class="header-margin container info">
    <h1> Возврат и обмен </h1>
    <span>
        Цветы являются срезанным от источника жизни товаром. К отношениям между Клиентом и Продавцом применяется 
        право Российской Федерации.В соответствии с Законом Российской Федерации «О защите прав потребителей» 
        от 07.02.1992 № 2300-1 (в ред. от 25.10.2007 г.) и Постановлением Правительства Российской Федерации 
        от 19.01.1998 № 55 (в ред. 27.03.2007 г.) срезанные цветы и горшечные растения обмену и возврату не 
        подлежат (указаны в Перечне непродовольственных товаров надлежащего качества, не подлежащих возврату или обмену).
        <br><br>

        Покупатель имеет право отказаться от получения товара в момент доставки или в момент выдачи заказа 
        в салоне при самовывозе, если товар оказался ненадлежащего качества (на основании п.3 ст. 497 ГК РФ,
        статья 21 Закона "О защите прав потребителей"). Проверяйте, пожалуйста, купленную продукцию сразу
          на кассе или во время доставки в присутствии курьера.
        <br><br>

        В случае, если клиент оформил заказ, требующий предоплаты (эксклюзивный цветок, индивидуальный заказ
        на плантацию, большой объём, шары и т.д.), но решил по какой-либо причине отказаться от заказа, то
        расходы, которые компания {{ orgName }} к тому моменту успела уже понести или отменить
        их невозможно, оплачиваются самим заказчиком.
        <br><br>

        В случае, если заказчику был продан товар ненадлежащего качества, то получить возврат денежных средств 
        можно возвратным платежом, учитывая способ, которым товар был оплачен клиентом изначально или обмен на 
        другой товар по эквивалентной стоимости можно в одном из салонов компании {{ orgName }}
        после обращения с претензией любым удобным способом (звонок по телефону, письмо, отправленное по адресу 
        {{ siteEmail }}), с предоставлением фотографии, подтверждающей факт ненадлежащего качества товара.
        <br><br>

        В случае если в момент доставки заказчика или получателя не оказалось на месте, то заказ возвращается в салон, 
        далее на усмотрение заказчика доставка должна быть оплачена повторно, либо заказчик может забрать заказ 
        самостоятельно из салона цветов {{ siteName }}, 
        но в этом случае, обращаем Ваше внимание, что срок жизни цветочной продукции ограничен, компания будет хранить 
        Ваш заказ с выполнением всех требований к хранению, а по истечению срока жизни заказа он будет утилизирован. 
        Возврат не производится на продукцию надлежащего качества, которая была обработана, оформлена, доставлена, 
        но не передана заказчику/получателю по вине заказчика/получателя.
        <br><br>

        Свежесрезанные цветы – товар скоропортящийся, поэтому все вопросы и претензии по качеству принимаются 
        только в течение 24 часов с момента осуществления покупки или получения заказа.
        <br><br>

        Приведенные примеры работ на сайте {{ siteUrl }} являются лишь возможными вариантами изготовления цветочных композиций. 
        Каждая изготавливаемая флористом цветочная композиция является уникальной и может отличаться внешним видом, размером 
        и оттенками цвета. Также возможны замены по ассортименту и составу цветов в зависимости от сезонности, наличия цветов 
        и прочих факторов, такие замены оговариваются с заказчиком. Итоговый вид композиции может незначительно отличаться от 
        иллюстрации на сайте. При этом каждая цветочная композиция составляется из свежих цветов, и флористы предпринимают 
        все усилия для того, чтобы цвет, форма цветочной работы как можно более полно соответствовали представленному изображению на сайте. 
    </span>
</div>

<Footer />
</template>

<script setup>
import {
    useMeta
} from "vue-meta";
useMeta({
    title: "Возврат и обмен",
})
import {
    ref,
    onMounted,
    computed
} from 'vue';
import MainHeader from "../components/MainHeader.vue";
import Footer from "@/components/Footer.vue";
import { useSiteInfo } from '@/stores/siteInfo';
const siteInfoStore = useSiteInfo();


const siteUrl = computed(()=> {
  if(window.location.origin.includes('https')) return window.location.origin.replace('https://', '');
  if(window.location.origin.includes('http')) return window.location.origin.replace('http://', '');
});

const siteName = computed(() => siteInfoStore.siteInfo.sitename);
const siteEmail = computed(() => siteInfoStore.siteInfo.email);
const orgName = computed(() => siteInfoStore.siteInfo.organization_name);
// let data = ref({});

// const init = async () => {
//     let response = await apiClient.get('/showcase-params');
//     data.value = response.data.settings.return_and_exchange;
// };

onMounted(() => {
    // init();
});
</script>
