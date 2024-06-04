//@ts-ignore
import { createI18n } from 'vue-i18n'

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    allowComposition: true,
    globalInjection: true,
    messages: {
        //@ts-ignore
        en: (await import('@/i18n/locales/en.json')).default
    },
})