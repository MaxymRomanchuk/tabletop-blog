<script setup lang="ts">
    import { VMarkdownView } from 'vue3-markdown';

    const props = defineProps({
        content: String,
        user: String,
        ts: Number,
    })

    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
</script>

<template>
    <div>
        <div class="px-2 fw-bolder">{{ capitalizeFirstLetter(user) }}</div>
        <div>
          <VMarkdownView
            class="p-2"
            :content="props.content"
          />
        </div>
    </div>
</template>

<style scoped>
section.markdown-body {
  background-color: #ffe9be !important;
  border: 2px solid #FFF2D7;
  border-radius: 0 0 10px 10px;
}
</style>