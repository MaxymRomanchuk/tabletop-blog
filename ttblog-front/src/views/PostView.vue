<script setup>
    import { Suspense } from 'vue';
    import Post from '@/components/Post.vue';
</script>

<template>
    <Suspense>
        <Post/>

        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>
