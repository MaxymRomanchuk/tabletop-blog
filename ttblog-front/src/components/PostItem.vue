<script setup lang="ts">
    //@ts-ignore
    import { useI18n } from 'vue-i18n'
    import { useCounterStore } from '@/stores/counter';
    import { RouterLink, useRouter } from 'vue-router';
    import Translator from '@/i18n/controller';
    import axios from 'axios';
    
    const { t } = useI18n();
    const router = useRouter();
    const store = useCounterStore();

    const props = defineProps({
        id: String,
        title: String,
        content: String,
        image: String,
        video: String,
    })

    async function deletePost() {
        await axios.delete(`http://localhost:3000/post/${props.id}`, {
            params: { token: store.authToken }
        })

        store.increment();
    }
</script>

<template>
    <div class="col">
        <div class="card shadow-sm h-100">
            <div class="card-img-top" width="200" height="200">
                <RouterLink :to="Translator.i18nRoute({ path: `post/${props.id}`})">
                    <img class="bd-placeholder-img card-img-top" :src="props.image">
                </RouterLink>
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
                <p class="card-text text-black fw-bolder">{{ props.title }}</p>
                <button type="button" class="btn btn-block btn-outline-danger" @click="deletePost">{{ t('profile.deleteBtn') }}</button>
            </div>
        </div>
    </div>
</template>