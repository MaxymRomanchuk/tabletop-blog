<script setup lang="ts">
    import axios from 'axios';
    import { ref } from 'vue';
    import { Modal } from 'bootstrap';
    import { useI18n } from 'vue-i18n';
    import { VMarkdownEditor } from 'vue3-markdown';
    import { useCounterStore } from '@/stores/counter';
    import 'vue3-markdown/dist/style.css';
    
    const { t } = useI18n();
    const store = useCounterStore();

    const title = ref('');
    const imageUrl = ref('');
    const videoUrl = ref('');
    const content = ref('');
    
    const showError = ref(false);
    const modalRef = ref(null);
    const closeModal = () => Modal.getInstance(modalRef.value)?.hide();

    async function handleSave() {
        if(!title.value || !content.value) {
            // Show errors
            showError.value = true;
            return;
        } else {
            showError.value = false;
        }

        await axios.post('http://localhost:3000/post/new', {
            title: title.value,
            imageUrl: imageUrl.value,
            videoUrl: videoUrl.value,
            content: content.value,
        }, {
            params: { token: store.authToken },
        })

        store.increment();
        closeModal();
    }

</script>

<template>

    <div ref="modalRef" class="modal fade" id="addLinkModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content main-bg">
                <div class="modal-header d-flex justify-content-between">
                    <h5 class="modal-title" id="modalTitle">{{ t('modal.title') }}</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="showError" class="alert alert-danger" role="alert">
                        Title and content must not be empty!
                    </div>
                    <form>
                        <div class="form-group">
                            <label for="title-input">{{ t('modal.titleField') }}</label>
                            <input type="text" class="form-control" id="title-input" v-model="title">
                            <label for="image-url-input">{{ t('modal.imageUrlField') }}</label>
                            <input type="url" class="form-control" id="image-url-input" v-model="imageUrl">
                            <label for="video-url-input">{{ t('modal.videoUrlField') }}</label>
                            <input type="url" class="form-control" id="video-url-input" v-model="videoUrl">
                            <label for="content-input">{{ t('modal.contentField') }}</label>
                            <VMarkdownEditor
                                class="form-control"
                                id="content-input"
                                v-model="content"
                                locale="en"
                            />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn secondary-bg" @click="handleSave">{{ t('modal.saveBtn') }}</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">{{ t('modal.cancelBtn') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>