import i18n from '@/i18n';
import LOCALES_LIST from '@/i18n/locales';
import { nextTick } from 'vue';

const Controller = {
    getCurrentLocale() {
        return i18n.global.locale.value;
    },

    getSupportedLocales() {
        return LOCALES_LIST;
    },

    getUserLocale() {
        const locale = window.navigator.language ||
            //@ts-ignore
            window.navigator.userLanguage ||
            import.meta.env.VITE_DEFAULT_LOCALE

        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0]
        }
    },

    getSavedLocale() {
        const persistedLocale = localStorage.getItem("user-locale")
        if(LOCALES_LIST.includes(persistedLocale as string)) {
            return persistedLocale;
        } else {
            return null;
        }
    },

    getDefaultLocale() {
        const userPersistedLocale = Controller.getSavedLocale()
        if(userPersistedLocale) {
        return userPersistedLocale
        }
        const userPreferredLocale = Controller.getUserLocale()
        if (LOCALES_LIST.includes(userPreferredLocale.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion
        }
        
        return import.meta.env.VITE_DEFAULT_LOCALE
    },

    async setLocale(newLang: string) {
        await Controller.loadLocale(newLang);
        
        i18n.global.locale.value = newLang;
        document.querySelector("html")!.setAttribute("lang", newLang);
        localStorage.setItem('user-locale', newLang);
    },

    async loadLocale(locale: string) {
        if(!i18n.global.availableLocales.includes(locale)) {
            const messages = await import(`@/i18n/locales/${locale}.json`)
            i18n.global.setLocaleMessage(locale, messages.default);
        }

        return nextTick();
    },

    async routeMiddleware(to: any, _from: any, next: any) {
        const localeParam = to.params.locale;

        if(!Controller.getSupportedLocales().includes(localeParam)) {
            return next(Controller.getDefaultLocale());
        } else {
            await Controller.setLocale(localeParam);
        }

        return next();
    },

    i18nRoute(to: any) {
        return {
            ...to,
            params: {
                locale: Controller.getCurrentLocale(),
                ...to.params,
            },
        }
    }

}

export default Controller;