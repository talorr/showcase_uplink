import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVfm } from 'vue-final-modal'

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

useSiteInfo().getSiteSettings().then((tariff_expired) => {
  console.log(tariff_expired)
  app.mount('#app');
})
