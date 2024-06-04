<script setup>
    //@ts-ignore
    import { useI18n } from 'vue-i18n'
    import { Suspense } from 'vue';

    import PostList from '@/components/PostList.vue';
    import AddLinkModal from '@/components/AddLinkModal.vue';
    
    const { t } = useI18n();
</script>

<template>
    <main class="d-flex flex-column">
        <AddLinkModal/>

        <section class="py-5 text-center container-fluid main-bg">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="">{{ t('profile.title') }}</h1>
                    <p class="">{{ t('profile.description') }}</p>
                    <button type="button" class="btn secondary-bg" data-bs-toggle="modal" data-bs-target="#addLinkModal">{{ t('profile.createBtn') }}</button>
                </div>
            </div>
        </section>

        <div class="py-5 custom-bg flex-fill">
            <div class="container-fluid">

                <Suspense>
                    <PostList :use-profile="true"/>

                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </div>
        </div>
  </main>
</template>

<style scoped>
.custom-bg {
    background-color: #f8e3cd;
}
</style>