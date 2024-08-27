import config from './config'

export function loadScript (callback, metrikaId, scriptSrc=config.scriptSrc) {
    if (typeof document === 'undefined') {return}
    config.id = metrikaId
    if (!config.id) {throw new Error('[vue-yandex-metrika] Please enter a Yandex Metrika tracking ID')}
    
    let head = document.head || document.getElementsByTagName('head')[0]
    const script = document.createElement('script')

    script.async = true
    // script.charset = 'utf-8'
    script.src = scriptSrc

    head.appendChild(script)

    script.onload = callback
}


export function createMetrika (app) {
    if (config.env === "production") {

        // Creates Metrika
        const init = {
            id: config.id,
            ...config.options
        }
        const metrika = new Ya.Metrika2(init)
        window[`yaCounter${config.id}`] = metrika
        app.provide('$metrika', metrika)
        return app.config.globalProperties.$metrika = metrika

    } else {

        // Mock metrika
        console.warn('[vue-yandex-metrika] Tracking is disabled, because env option is not "production"')
        if (config.debug) {console.warn('[vue-yandex-metrika] DEBUG is true: you\'ll see all API calls in the console')}

        const metrika = {
            addFileExtension() {if (config.debug) {console.log('[vue-yandex-metrika] addFileExtension:', arguments)}},
            extLink() {if (config.debug) {console.log('[vue-yandex-metrika] extLink:', arguments)}},
            file() {if (config.debug) {console.log('[vue-yandex-metrika] file:', arguments)}},
            getClientID() {if (config.debug) {console.log('[vue-yandex-metrika] getClientID:', arguments)}},
            hit() {if (config.debug) {console.log('[vue-yandex-metrika] hit:', arguments)}},
            notBounce() {if (config.debug) {console.log('[vue-yandex-metrika] notBounce:', arguments)}},
            params() {if (config.debug) {console.log('[vue-yandex-metrika] params:', arguments)}},
            reachGoal() {if (config.debug) {console.log('[vue-yandex-metrika] reachGoal:', arguments)}},
            replacePhones() {if (config.debug) {console.log('[vue-yandex-metrika] replacePhones:', arguments)}},
            setUserID() {if (config.debug) {console.log('[vue-yandex-metrika] setUserID:', arguments)}},
            userParams() {if (config.debug) {console.log('[vue-yandex-metrika] userParams:', arguments)}}
        }

        app.provide('$metrika', metrika)
        return app.config.globalProperties.$metrika = metrika
    }
}


export function startTracking (metrika, router) {

    if (!router && config.env !== 'production') {return console.warn('[vue-yandex-metrika] Router is not passed, autotracking is disabled')}
    // Starts autotracking if router is passed
    if (router) {
        router.afterEach(function (to, from) {

            // check if route is in ignoreRoutes
            if (config.ignoreRoutes.indexOf(to.name) > -1) {return}

            // do not track page visit if previous and next routes URLs match
            if (config.skipSamePath && to.path == from.path) {return}

            // track page visit
            metrika.hit(to.path, {referer: from.path})
        })
    }
}
