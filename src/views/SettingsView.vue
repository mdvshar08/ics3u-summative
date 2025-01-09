<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "../stores";

const store = useStore();
const firstName = ref(store.firstName);
const lastName = ref(store.lastName);
const email = ref(store.email);

const router = useRouter();

function handleSave() {
  store.firstName = firstName.value;
  store.lastName = lastName.value;

  alert("Your changes have been saved!");
  router.push("/movies");
}

function goBackToMovies() {
  router.push("/movies");
}
</script>

<template>
  <div class="blockflix-theme">
    <div class="settings-view">
      <h1>User Settings</h1>
      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input v-model="firstName" id="firstName" type="text" placeholder="Enter first name" class="input-field" />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input v-model="lastName" id="lastName" type="text" placeholder="Enter last name" class="input-field" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input :value="email" id="email" type="email" class="input-field" disabled />
        </div>
        <button type="submit" class="button save">Save Changes</button>
        <button type="button" class="button back" @click="goBackToMovies">Back to Movie List</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.blockflix-theme {
  background-color: #141414;
  color: #ffffff;
  font-family: 'Poppins', Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.settings-view {
  max-width: 720px;
  width: 100%;
  background-color: #1e1e1e;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
  border: 3px solid #e50914;
}

h1 {
  text-align: center;
  color: #e50914;
  margin-bottom: 25px;
  font-weight: 900;
  font-size: 2.8rem;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.form-group {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #e5e5e5;
  font-weight: 600;
}

.input-field {
  width: 100%;
  padding: 14px;
  border: 2px solid #444444;
  border-radius: 8px;
  font-size: 1rem;
  color: #ffffff;
  background-color: #2a2a2a;
  transition: all 0.3s ease;
}

.input-field:focus {
  background-color: #121212;
  border: 2px solid #e50914;
  box-shadow: 0 0 12px rgba(255, 9, 20, 0.8);
}

.input-field:disabled {
  background-color: #3c3c3c;
  color: #888888;
  cursor: not-allowed;
}

.button.save {
  width: 100%;
  padding: 16px;
  background: linear-gradient(90deg, #e50914, #b20710);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.button.save:hover {
  background: linear-gradient(90deg, #b20710, #e50914);
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 9, 20, 0.7);
}

.button.save:active {
  transform: scale(0.97);
}

.button.back {
  margin-top: 10px;
  width: 100%;
  padding: 14px;
  background: #333333;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.button.back:hover {
  background-color: #444444;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .settings-view {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
    letter-spacing: 1.5px;
  }

  .button.save,
  .button.back {
    font-size: 1rem;
    padding: 12px;
  }
}

</style>
