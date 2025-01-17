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

function validatePassword(password) {
  if (password.length < 6) {
    alert("Password should be at least 6 characters long.");
    return false;
  }
  return true;
}                     

function handleSubmit() {
  if (password.value === password2.value) {
    if (!validatePassword(password.value)) {
      return;
    }
    store.firstName = firstName.value;
    store.lastName = lastName.value;
    store.email = email.value;
    store.password = password.value;
    router.push('/movies');
  } else {
    window.alert('Passwords do not match; Please re-enter');
  }
}

function goToHome() {
  router.push('/');
}

async function registerByEmail() {
  try {
    if (!validatePassword(password.value)) {
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
    store.user = user;

    console.log("User created:", user);

    router.push("/movies");
  } catch (error) {
    console.error("Error creating user:", error);
    alert("There was an error creating a user with email: " + error.message);
  }
}

async function registerByGoogle() {
  try {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;

    store.user = user;

    console.log("User created via Google:", user);

    router.push("/movies");
  } catch (error) {
    console.error("Error creating user with Google:", error);
    alert("There was an error creating a user with Google: " + error.message);
  }
}
</script>

<template>
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <h1>BingeBox</h1>
        <div class="button-group">
          <a href="login" class="button login">Login</a>
          <button class="button back" @click="goToHome">Back to Home</button>
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
  background-image: url('your-image-url-here.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #0d0d0d;
}

.overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  padding: 40px 20px;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 25px 40px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  z-index: 10;
}

.navbar h1 {
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
  color: #e50914;
  font-weight: 700;
  letter-spacing: 1.2px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.navbar .login,
.navbar .back {
  background-color: #e50914;
  color: #ffffff;
  padding: 10px 20px;
  text-decoration: none;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.navbar .login:hover,
.navbar .back:hover {
  background-color: #f40612;
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.form-container {
  text-align: center;
  margin-top: 20px;
}

.form-container h2 {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-container form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.input-field {
  padding: 15px 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #444;
  margin-bottom: 0;
  transition: border-color 0.3s, background-color 0.3s;
  background-color: #1c1c1c;
  color: #ffffff;
  font-size: 1rem;
  border-radius: 5px;
}

.input-field:focus {
  border-color: #e50914;
  background-color: #333;
  outline: none;
}

.register {
  background-color: #e50914;
  color: #ffffff;
  padding: 12px 30px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.register:hover {
  background-color: #f40612;
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

@media (max-width: 600px) {
  .input-field {
    width: 90%;
  }

  .navbar h1 {
    font-size: 2rem;
  }

  .form-container h2 {
    font-size: 2rem;
  }

  .register {
    font-size: 1rem;
    padding: 12px 25px;
  }
}
</style>
