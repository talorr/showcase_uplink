import { defineStore } from 'pinia';
import axios from 'axios';

export const useSiteInfo = defineStore('siteInfo', {
    state: () => ({
        siteInfo: {},
        yookassaConnected: false,
    }),
    actions: {
        async getSiteSettings() {
            let response = await axios.get('/site-settings');
            response.data.settings.forEach((setting) => {
                setting.values.forEach((elem) => {
                    this.siteInfo[elem.key] = elem.value
                })
            })

            this.yookassaConnected = response.data.yookassaConnected
            this.siteInfo.tariff_expired = response.data.tariff_expired
            return this.siteInfo
        }
    }
});
