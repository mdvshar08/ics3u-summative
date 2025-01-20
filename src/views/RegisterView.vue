<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from 'vue-router';
import { useStore } from '../stores';

const store = useStore();
const router = useRouter();

const password = ref('');
const password2 = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');

async function registerByEmail() {
  if (!firstName.value || !lastName.value || !email.value || !password.value || !password2.value) {
    alert("Please fill in all the fields!");
    return;
  }

  if (password.value === password2.value) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;

      store.firstName = firstName.value;
      store.lastName = lastName.value;
      store.email = email.value;
      store.password = password.value;

      await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });

      store.user = user;

      router.push("/movies");
    } catch (error) {
      console.error("Firebase Error:", error.code, error.message);
      alert(`Error: ${error.message}`);
    }
  } else {
    alert("The passwords do not match!");
  }
}

async function registerByGoogle() {
  try {
    await auth.signOut();

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account" 
    });

    const result = await signInWithPopup(auth, provider);

    store.user = result.user;

    router.push("/movies");
  } catch (error) {
    console.error("Error during Google sign-in:", error.code, error.message);
    alert("There was an error creating a user with Google!");
  }
}

</script>

<template>
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <h1>BingeBox</h1>
        <div class="button-group">
          <RouterLink to="/" class="nav-button">Home</RouterLink>
          <RouterLink to="/login" class="nav-button">Login</RouterLink>
        </div>
      </div>
      <div class="form-container">
        <h2>Create an Account</h2>
        <form @submit.prevent="registerByEmail">
          <input v-model="firstName" type="text" placeholder="First Name" class="input-field" required />
          <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" required />
          <input v-model="email" type="email" placeholder="Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />
          <input v-model="password2" type="password" placeholder="Re-enter Password" class="input-field" required />
          <button type="submit" class="button register">Register</button>
          <button type="button" @click="registerByGoogle" class="button register">Register by Google</button>
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

.nav-button {
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #e50914;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-button:hover {
  background-color: #444444;
  transform: scale(1.05);
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

.button.register {
  background: #e50914;
  color: white;
  padding: 12px 30px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button.register:hover {
  background: #444444;
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