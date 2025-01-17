<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '../stores';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

  const isHomePage = ref(false);
  const route = useRoute();
  const store = useStore();
  const router = useRouter();

  onMounted(() => {
    if (route.path === '/') {
      isHomePage.value = true;
    }
  });
  const logout = () => {
  store.user = null;
  signOut(auth);
  router.push("/");
}
</script>

<template>
  <div class="header">
    <h1> BingeBox </h1>
  </div>
  <div class="buttons" v-if="isHomePage">
    <RouterLink to="/register" class="button">Register</RouterLink>
    <RouterLink to="/login" class="button">Login</RouterLink>
  </div>
  <div class="buttons" v-if="!isHomePage">
    <p class="welcome-message">Welcome, {{ store.user?.displayName || 'Guest' }}</p>
    <RouterLink to="/cart" class="button">Cart</RouterLink>
    <RouterLink to="/settings" class="button">Settings</RouterLink>
    <button @click="logout" class="button">Logout</button>
   </div>
</template>
<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #141414;
  font-family: Arial, sans-serif;
  color: #ffffff;
}

.header {
  background-color: #141414;
  text-align: center;
  padding: 40px 0;
}

.header h1 {
  margin: 0;
  font-size: 4rem;
  font-weight: bold;
  color: #e50914;
  text-transform: uppercase; 
}

.header p {
  margin-top: 10px;
  font-size: 1.5rem;
  color: #ffffff;
}

.buttons {
  display: flex;
  justify-content: center;
  background-color: #141414;
  padding: 20px 0;
  gap: 15px;
}

.button {
  background-color: #e50914;
  color: #ffffff;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s;
}

.button:hover {
  background-color: #f6121d;
  transform: scale(1.1);
}

.button:active {
  transform: scale(0.95);
}

</style>