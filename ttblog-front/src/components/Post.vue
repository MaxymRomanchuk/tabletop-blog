<script setup lang="ts">
    import { reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import { VMarkdownView } from 'vue3-markdown';
    import 'vue3-markdown/dist/style.css';
    import YouTube from 'vue3-youtube';
    import CommentEditor from '@/components/CommentEditor.vue';
    import CommentsList from '@/components/CommentsList.vue';

    const route = useRoute();

    async function loadPost() {
        return fetch(`http://localhost:3000/post/${route.params.id}`)
            .then(res => res.json());
    }

    const post = reactive({
        data: await loadPost(),
        style: { 'background-image': `linear-gradient(
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25)
        )` }
    });
    
    post.style['background-image'] = getStyle();

    function getStyle() {
        return `linear-gradient(
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25)
        )${post.data.imageUrl ? `, url('${post.data.imageUrl}')` : ''}`;
    }
</script>

<template>
    
    <section class="py-5 text-center container-fluid" id="post-header" :style="post.style">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="text-shadow secondary-text fw-bolder">{{ post.data.title }}</h1>
            </div>
        </div>
    </section>
    <section class="py-5 px-lg-5 main-bg d-flex flex-column">
        <div class="col-lg-8 col-md-10 col-11 mx-auto">
            <YouTube
                class="mx-auto"
                v-if="post.data.videoUrl"
                :src="post.data.videoUrl"
                ref="youtube"
            />
            <VMarkdownView
                id="post-content"
                class="p-2 mt-4"
                :content="post.data.content"
            />
        </div>
        <CommentsList  :post="route.params.id"/>
        <CommentEditor :post="route.params.id"/>
    </section>
</template>

<style>
    #post-content {
        background-color: #fffbf5 !important;
        border: 2px solid #b2b2b2;
        border-radius: 10px 10px 10px 10px;
    }

    #post-header {
        background-size: cover;
        background-position: center;
    };
</style>
