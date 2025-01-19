<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from "../stores"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const loginByEmail = async () => {
  try {
    const user = (await signInWithEmailAndPassword(auth, email.value, password.value)).user;
    store.user = user;
    router.push("/movies");
  } catch (error) {
    console.log(error);
    alert("There was an error signing in with email!");
  }
};

const loginByGoogle = async () => {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/movies");
  } catch (error) {
    alert("There was an error signing in with Google!");
  }
};
</script>

<template>
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <h1>BingeBox</h1>
        <div class="button-group">
          <RouterLink to="/register" class="button register">Register</RouterLink>
          <RouterLink to="/" class="button home">Back to Home</RouterLink>
        </div>
      </div>
      <div class="form-container">
        <h2>Login to Your Account</h2>
        <form @submit.prevent="loginByEmail()">
          <input v-model="email" type="email" placeholder="Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />
          <button type="submit" class="button login">Login</button>
          <button @click="loginByGoogle()" class="button register-google">Login by Google</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-color: #141414;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgba(0, 0, 0, 0.85);
  position: absolute;
  top: 0;
  z-index: 10;
}

.navbar h1 {
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: #e50914;
}

.button-group {
  display: flex;
  gap: 10px;
}

.navbar .button {
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.navbar .register {
  background: #e50914;
}

.navbar .register:hover {
  background: #444444;
}

.navbar .home {
  background: #f40612;
}

.navbar .home:hover {
  background: #444444;
}

.form-container {
  text-align: center;
  margin-top: 50px;
  width: 100%;
  max-width: 400px;
}

.form-container h2 {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 25px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  padding: 15px;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #333;
  background-color: #1c1c1c;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #e50914;
  outline: none;
}

.button.login {
  background: #e50914;
  color: white;
  padding: 12px 30px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button.login:hover {
  background: #444444;
  transform: scale(1.05);
}

.button.register-google {
  background-color: #e50914;
  color: white;
  font-size: 1rem;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button.register-google:hover {
  background-color: #444444;
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .navbar h1 {
    font-size: 2rem;
  }

  .input-field {
    width: 100%;
  }

  .form-container h2 {
    font-size: 1.8rem;
  }

  .button {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}
</style>
