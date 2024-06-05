<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { reactive, watch } from 'vue';
    import { useCounterStore } from '@/stores/counter';
    import type { Post } from '@/types/products';
    import PostItem from '@/components/PostItem.vue';

    const store = useCounterStore();
    const { count } = storeToRefs(store);

    const props = defineProps({
        useProfile: Boolean,
    })

    // Fetch function
    async function fetchCardsData(): Promise<Post[]> {
        console.log('Refetch started');
        console.log('Fetch', store.authToken);
        return fetch(
            'http://localhost:3000/post' + (props.useProfile ? `?user=${store.authId}` : ''), 
        ).then(res => res.json()) as Promise<Post[]>;
    }

    const postList = reactive({
        data: await fetchCardsData()
    });

    watch(count, async () => {
        postList.data = await fetchCardsData();

        console.log('Refetch finished');
    })
</script>

<template>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        <div class="mx-auto text-center" v-if="postList.data.length === 0">No posts yet...</div>
        <PostItem v-for="i in postList.data" :use-profile="useProfile" :id="i.id" :title="i.title" :content="i.content" :image="i.imageUrl" :video="i.videoUrl" />
    </div>
</template>
