<script setup>
import { ref } from 'vue';
import { useStore } from '../stores';
import { useRouter } from 'vue-router';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth } from '../firebase';
import Header from '@/components/Header.vue';

const store = useStore();
const router = useRouter();

const user = store.user;
const firstName = ref(user?.displayName?.split(' ')[0] || '');
const lastName = ref(user?.displayName?.split(' ')[1] || '');
const password = ref('');
const email = ref(user?.email || '');

const handleSubmit = async () => {
  let logedInWithPassword = false;
  auth.currentUser.providerData.forEach((provider) => {
    if (provider.providerId === 'password') {
      logedInWithPassword = true;
    }
  });

  if (logedInWithPassword) {
    try {
      await updateProfile(auth.currentUser, { displayName: `${firstName.value} ${lastName.value}` });
      await updatePassword(auth.currentUser, password.value);
      alert('Your profile has been updated!');
      router.push('/movies');
    } catch (error) {
      alert('There was an error updating your profile. Please try again.');
    }
  } else {
    alert('Profile changes are not allowed for Google sign-in users.');
  }
};
</script>

<template>
  <Header />
  <div class="blockflix-theme">
    <div class="settings-view">
      <h1>User Settings</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input
            v-model="firstName"
            type="text"
            id="firstName"
            class="input-field"
            placeholder="Enter first name"
            required
          />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input
            v-model="lastName"
            type="text"
            id="lastName"
            class="input-field"
            placeholder="Enter last name"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">New Password:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="input-field"
            placeholder="Enter a new password"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            :value="email"
            type="email"
            id="email"
            class="input-field"
            disabled
          />
        </div>
        <button type="submit" class="button save">Save Changes</button>
        <RouterLink to="/movies" class="button back">Back to Movies</RouterLink>
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
  text-align: center;
}

h1 {
  color: #e50914;
  margin-bottom: 25px;
  font-weight: 900;
  font-size: 2.4rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.1rem;
  color: #e5e5e5;
}

.input-field {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #444444;
  border-radius: 6px;
  background-color: #2a2a2a;
  color: #ffffff;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  background-color: #121212;
  border-color: #e50914;
}

.input-field:disabled {
  background-color: #3c3c3c;
  color: #888888;
  cursor: not-allowed;
}

.button.save {
  width: 100%;
  padding: 14px;
  background: #e50914;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 15px;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.button.save:hover {
  transform: scale(1.05);
  background-color: #b20710;
}

.button.save:active {
  transform: scale(0.97);
}

.button.back {
  margin-top: 15px;
  display: block;
  width: 100%;
  padding: 12px;
  background: #333333;
  color: #ffffff;
  text-align: center;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button.back:hover {
  background-color: #444444;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .settings-view {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .button.save,
  .button.back {
    font-size: 1rem;
    padding: 10px;
  }
}
</style>
