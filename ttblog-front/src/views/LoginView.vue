<script setup>
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRouter } from 'vue-router';
    import { useCounterStore } from '@/stores/counter';
    import axios from 'axios';
    import Translator from '@/i18n/controller';
    
    const { t } = useI18n();
    const router = useRouter();
    const store = useCounterStore();

    const email = ref('');
    const password = ref('');
    const showError = ref(false);
    const errorContent = ref('');

    async function login() {
        const response = await axios.post('http://localhost:3000/auth/login', {
            email: email.value,
            password: password.value
        }).catch(e => {
            errorContent.value = e.message;
            showError.value = true;
        });
        
        if(!response) { return; }
        showError.value = false;

        store.login({
            email,
            id: response.data.id,
            token: response.data.token,
        });
        router.push(Translator.i18nRoute({ name: 'profile' }));
    }
</script>

<template>
    <main class="d-flex justify-content-center align-items-center main-bg">
        <div class="border-dark rounded header-bg p-5">
            <form class="form-signin" v-on:submit.prevent>
                <h1 class="h3 mb-3 font-weight-normal text-center secondary-text">{{ t('signin.title') }}</h1>
                <div v-if="showError" class="alert alert-danger" role="alert">{{ errorContent }}</div>

                <label for="inputEmail" class="sr-only secondary-text">{{ t('signin.emailField') }}</label>
                <input v-model="email" type="email" id="inputEmail" class="form-control mb-2" placeholder="my.email@mail.com" required autofocus="">
                
                <label for="inputPassword" class="sr-only secondary-text">{{ t('signin.passwordField') }}</label>
                <input v-model="password" type="password" id="inputPassword" class="form-control mb-3" placeholder="********" required>
                
                <RouterLink class="nav-link secondary-text text-center" :to="Translator.i18nRoute({ name: 'signup' })">{{ t('signup.link') }}</RouterLink>
    
                <button class="btn btn-lg secondary-bg btn-block mx-auto w-100 px-5"  @click="login">{{ t('signin.submit') }}</button>
    
            </form>
        </div>
    </main>
</template>