<script setup lang="ts">
    import axios from 'axios';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';
    import { VMarkdownEditor } from 'vue3-markdown';
    import { useCounterStore } from '@/stores/counter';

    const { t } = useI18n();
    const content = ref('');
    const route = useRoute();
    const store = useCounterStore();
    const props = defineProps({ post: String });

    async function saveComment() {
        return await axios.post(
            'http://localhost:3000/comment/new',
            {
                content: content.value,
                postId: props.post,
            },
            { params: { token: store.authToken } },
        )
        .then(() => store.increment())
        .then(() => { content.value = ''; })
        .catch(console.error);
    }
</script>

<template>
    <div v-if="store.authed()" class="col-lg-8 col-md-10 col-11 mx-auto pt-3">
        <h6>{{ t('post.commentTitle') }}</h6>
        <VMarkdownEditor
            class="form-control"
            id="content-input"
            v-model="content"
            locale="en"
        />
        <button type="button" class="btn secondary-bg mt-2" @click="saveComment">{{ t('post.commentSave') }}</button>
    </div>
</template>