import { createSSRApp } from 'vue';
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

export async function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia();
  const vfm = createVfm()
  const meta = createMetaManager(true)

  app.use(pinia);
  app.use(router)
  app.use(meta) 
  app.use(vfm)
  try {
    const siteStore = useSiteInfo()
    const siteInfo = await siteStore.getSiteSettings()
    if (typeof window !== 'undefined' && siteInfo?.metrika) {
      loadScript(() => {
        const metrika = createMetrika(app);
        startTracking(metrika, router);
      }, siteInfo.metrika);
    }
  } catch (error) {
    console.log(error) 
  }
  return { app, router, meta }
}