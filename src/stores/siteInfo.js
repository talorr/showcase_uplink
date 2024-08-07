import { defineStore } from 'pinia';
import apiClient from '../axios.js';

export const useSiteInfo = defineStore('siteInfo', {
    state: () => ({
        siteInfo: {}
    }),
    actions: {
        async getSiteSettings() {
            let response = await apiClient.get('/site-settings');
            response.data.settings.forEach((setting) => {
                setting.values.forEach((elem) => {
                    this.siteInfo[elem.key] = elem.value
                })
            })

            return response.data.tariff_expired
        }
    }
});
