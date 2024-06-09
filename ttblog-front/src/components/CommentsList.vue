<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { storeToRefs } from 'pinia';
    import { reactive, watch } from 'vue';
    import { useCounterStore } from '@/stores/counter';
    import type { Comment } from '@/types/products';
    import CommentItem from '@/components/Comment.vue';

    const { t } = useI18n();
    const store = useCounterStore();
    const { count } = storeToRefs(store);

    const props = defineProps({
        post: String
    })

    // Fetch function
    async function fetchComments(): Promise<Comment[]> {
        return fetch(`http://localhost:3000/comment?post=${props.post}`)
                  .then(res => res.json()) as Promise<Comment[]>;
    }

    const comments = reactive({
        data: await fetchComments()
    });

    watch(count, async () => {
        comments.data = await fetchComments();

        console.log('Refetch finished');
    })
</script>

<template>
    <div class="col-lg-8 col-md-10 col-11 mx-auto pt-3">
        <h6 v-if="comments.data.length" >{{ t('post.commentSection') }}</h6>
        <CommentItem
            class="comment-card"
            v-for="i in comments.data"
            :content="i.content"
            :user="i.user"
            :ts="i.ts"
        />
    </div>
</template>

<style scoped>
.comment-card {
    background-color: #ECB176;
    border: 2px solid #FFF2D7;
    border-radius: 15px;
}
</style>