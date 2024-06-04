<script setup lang="ts">
    //@ts-ignore
    import { useI18n } from 'vue-i18n';
    import { Suspense } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useCounterStore } from '@/stores/counter';

    import Controller from '@/i18n/controller';
    import PostList from '@/components/PostList.vue';

    const { t } = useI18n();
    const store = useCounterStore();

</script>

<template>
    <div class="container-fluid d-flex py-5 mx-auto flex-column align-items-center" id="homeContainer">

        <div class="container my-lg-5" id="homeText">
            <h1 class="text-center text-shadow secondary-text fw-bolder">{{ t('home.title') }}</h1>
            <h3 class="text-center text-shadow text-light fw-bold ">{{ t('home.subtitle') }}</h3>
            <p>
                <RouterLink v-if="store.authed()" class="btn btn-lg btn-secondary fw-bold" :to="Controller.i18nRoute({ name: 'profile' })">
                    {{ t('home.btn') }}
                </RouterLink>

                <RouterLink v-else class="btn btn-lg btn-secondary fw-bold" :to="Controller.i18nRoute({ name: 'login' })">
                    {{ t('home.btn') }}
                </RouterLink>
            </p>
        </div>

    </div>
    
    <div class="custom-bg py-5 container-fluid">
        <Suspense>
            <PostList :use-profile="false"/>

            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </div>

    <footer class="mt-auto text-center">
        {{ t('home.footer') }}
    </footer>
</template>

<style>
    html, body, #app {
        height: 100%;
    }

    #homeContainer {
        background-image:  
            linear-gradient(
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25)
            ),
            url(@/assets/laptop-worker.jpg);
        background-size: cover;
        background-position: center;
    }

    .text-shadow {
        text-shadow: 0 0 15px black;
    }

    #homeText {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>