<script setup lang="ts">
    import { reactive } from 'vue';
    //@ts-ignore
    import { useI18n } from 'vue-i18n'
    import { RouterLink, useRouter } from 'vue-router';
    import Translator from '@/i18n/controller';
    import { useCounterStore } from '@/stores/counter';

    const { t } = useI18n();
    const router = useRouter();
    const store = useCounterStore();

    const navButtons = reactive([
        {
            name: 'header.home',
            url: 'home'
        },
    ])

    async function onChange (target: { value: string }) {
        await Translator.setLocale(target.value);

        try {
            await router.replace({ params: { locale: target.value } })
            store.increment();
        } catch(e) {
            console.error(e);
            router.push("/");
        }
    }

    function logout() {
        store.logout();
        router.push(Translator.i18nRoute({ name: 'home' }))
    }

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar header-bg sticky-top">
        <div class="container">
            <RouterLink class="navbar-brand secondary-text" :to="Translator.i18nRoute({ name: 'home' })">{{ t('title') }}</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item my-auto" v-for="i in navButtons">
                        <RouterLink class="nav-link secondary-text" :to="Translator.i18nRoute({ name: i.url })">{{ t(i.name) }}</RouterLink>
                    </li>
                    <li v-if="store.authed()" class="nav-item m-1">
                        <button type="button" class="btn p-0 my-0 w-100 secondary-bg">
                            <RouterLink 
                                class="nav-link text-dark"
                                :to="Translator.i18nRoute({ name: 'profile' })">
                                    {{ t('header.profile') }}
                            </RouterLink>
                        </button>
                    </li>
                    <li v-if="store.authed()" class="nav-item m-1">
                        <button type="button" class="btn my-0 primary-bg py-2 px-3 w-100" @click="logout">
                            {{ t('header.logout') }}
                        </button>
                    </li>
                    <li v-else class="nav-item m-1">
                        <button type="button" class="btn p-0 my-0 primary-bg w-100">
                            <RouterLink 
                                class="nav-link" 
                                :to="Translator.i18nRoute({ name: 'login' })">
                                    {{ t('header.signin') }}
                            </RouterLink>
                        </button>
                    </li>
                    <li class="nav-item m-1">
                        <select class="form-select bg-light py-2 w-100" :value="Translator.getCurrentLocale()" @change="onChange($event.target as any)">
                            <option v-for="i in Translator.getSupportedLocales()" :value="i">{{ i.toUpperCase() }}</option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
