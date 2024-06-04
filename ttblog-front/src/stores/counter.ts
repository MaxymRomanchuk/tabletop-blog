import { ref } from 'vue'
import { defineStore } from 'pinia'

type reference = {
  value: string;
}

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const authEmail = ref(localStorage.getItem('email') || '');
  const authId = ref(localStorage.getItem('id') || '');
  const authToken = ref(localStorage.getItem('token') || '');


  function increment() {
    count.value++
  }

  function login({ email, id, token }: { email: reference, id: string, token: string }) {
    authEmail.value = email.value;
    authId.value = id;
    authToken.value = token;

    localStorage.setItem('email', email.value);
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
  }

  function logout() {
    authEmail.value = '';
    authId.value = '';
    authToken.value = '';
    localStorage.setItem('email', '');
    localStorage.setItem('id', '');
    localStorage.setItem('token', '');
  }

  function authed() {
    return Boolean(authEmail.value);
  }

  return { count, authToken, authId, increment, authed, login, logout }
})
