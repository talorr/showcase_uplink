let config = {
    id: null,
    options: {
        accurateTrackBounce: true,
        clickmap: true,
        defer: false,
        ecommerce: false,
        params: [],
        userParams: {},
        trackHash: false,
        trackLinks: true,
        type: 0,
        webvisor: true,
        triggerEvent: false
    },
    router: null,
    env: process.env.NODE_ENV,
    scriptSrc: 'https://mc.yandex.ru/metrika/tag.js',
    debug: false,
    ignoreRoutes: [],
    skipSamePath: true
}

export default config
