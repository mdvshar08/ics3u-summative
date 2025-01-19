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
    <h1>BingeBox</h1>
    <div v-if="isHomePage">
      <RouterLink to="/register" class="button register">Register</RouterLink>
      <RouterLink to="/login" class="button login">Login</RouterLink>
    </div>
    <div class="top-right-buttons" v-if="!isHomePage">
      <RouterLink to="/cart" class="button">Cart</RouterLink>
      <RouterLink to="/settings" class="button">Settings</RouterLink>
      <button @click="logout" class="button">Logout</button>
    </div>
  </div>
  <div class="buttons">
    <p class="welcome-message">Welcome, {{ store.user?.displayName || 'Guest' }} !!!</p>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #141414;
  font-family: Arial, sans-serif;
  color: #ffffff;
}

.header {
  background-color: #141414;
  text-align: center;
  padding: 40px 0;
  position: relative;
}

.header h1 {
  margin: 0;
  font-size: 4rem; 
  font-weight: bold;
  color: #e50914;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.button.register,
.button.login {
  background-color: #e50914;
  color: #ffffff;
  text-decoration: none;
  padding: 16px 30px; 
  margin: 15px 10px;
  border-radius: 8px; 
  font-size: 1.2rem; 
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  display: inline-block;
}

.button.register:hover,
.button.login:hover {
  background-color: #444444;
  transform: scale(1.1);
}

.button.register:active,
.button.login:active {
  transform: scale(0.98);
}

.top-right-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
}

.top-right-buttons .button {
  background-color: #e50914;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.top-right-buttons .button:hover {
  background-color: #444444;
  transform: scale(1.05);
}

.top-right-buttons .button:active {
  transform: scale(0.95);
}

.welcome-message {
  font-size: 1.5rem;
  color: #e5e5e5;
  text-align: center;
  margin: 20px auto;
  padding: 15px 25px;
  background-color: #141414;
  border: 2px solid #333;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  display: inline-block;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.buttons, .header {
  width: 100%;
  background-color: #141414;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 3.5rem; 
  }

  .button.register,
  .button.login {
    font-size: 1rem;
    padding: 14px 20px; 
  }

  .top-right-buttons .button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  .buttons {
    gap: 10px;
  }

  .welcome-message {
    font-size: 1.2rem;
    padding: 10px 20px;
  }
}
</style>
