import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import i18n from '@/i18n'
import LOCALES_LIST from '@/i18n/locales'

export const useLangStore = defineStore('language', () => {
    const locale = computed(() => {
        return i18n.global.locale.value;
    });

    function getUserLocale() {
        const locale = window.navigator.language ||
            //@ts-ignore
            window.navigator.userLanguage ||
            import.meta.env.VITE_DEFAULT_LOCALE

        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0]
        }
    };

    function getSavedLocale() {
        const persistedLocale = localStorage.getItem("user-locale")
        if(LOCALES_LIST.includes(persistedLocale as string)) {
            return persistedLocale;
        } else {
            return null;
        }
    }

    function getDefaultLocale() {
        const userPersistedLocale = getSavedLocale()
        if(userPersistedLocale) {
        return userPersistedLocale
        }
        const userPreferredLocale = getUserLocale()
        if (LOCALES_LIST.includes(userPreferredLocale.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion
        }
        
        return import.meta.env.VITE_DEFAULT_LOCALE
    }

    const locales = ref(LOCALES_LIST);

    async function setLocale(newLang: string) {
        if(LOCALES_LIST.includes(newLang)) {
            i18n.global.locale.value = newLang;
            document.querySelector("html")!.setAttribute("lang", newLang);
            localStorage.setItem('user-locale', newLang);
        } else {
            console.error("New lang:" + newLang);
            console.error('Invalid language selected! Skipping...');
        }
    }
    
    return { locale, locales, setLocale };
})