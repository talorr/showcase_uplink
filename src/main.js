import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVfm } from 'vue-final-modal'
import { loadScript, createMetrika, startTracking } from './yandex-metrika/helpers'
import App from './App.vue';
import { useSiteInfo } from './stores/siteInfo';
import router from './router'

import 'vue-final-modal/style.css'
import "./assets/style/main.scss";
import '@vuepic/vue-datepicker/dist/main.css'
import { createMetaManager } from 'vue-meta'
const app = createApp(App);

const pinia = createPinia();
const vfm = createVfm()

app.use(createMetaManager()) 
app.use(pinia);
app.use(router)
app.use(vfm)

useSiteInfo().getSiteSettings().then((siteInfo) => {
  if (siteInfo.metrika) {
    loadScript(() => {
      const metrika = createMetrika(app) 
      startTracking(metrika, router) 
    }, siteInfo.metrika)
  }
  if (!siteInfo.tariff_expired) app.mount('#app');
})
