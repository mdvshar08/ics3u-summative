<script setup>
import { useStore } from '../stores';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

function goBackToMovies() {
  router.push('/movies');
}
</script>

<template>
  <div class="cart">
    <h1>Shopping Cart</h1>
    <div class="item" v-for="([key, value]) in store.cart" :key="key">
      <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" alt="Movie Poster" />
      <h1>{{ value.title }}</h1>
      <button @click="store.cart.delete(key)">Remove</button>
    </div>
    <button class="button back" @click="goBackToMovies">Back to Movie List</button>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #0d0d0d;
  color: #f5f5f5;
  font-family: 'Poppins', sans-serif;
}

.cart {
  padding: 30px;
  text-align: center;
}

.cart h1 {
  font-size: 2.8rem;
  color: #ff3d3d;
  margin-bottom: 35px;
  text-transform: capitalize;
  font-weight: 700;
  letter-spacing: 1px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1c1c1c;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  max-width: 900px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
}

.item img {
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ff3d3d;
}

.item h1 {
  flex: 1;
  font-size: 1.4rem;
  margin-left: 20px;
  text-align: left;
  color: #f5f5f5;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.item button {
  background: linear-gradient(90deg, #e50914, #ff3d3d);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.item button:hover {
  background: linear-gradient(90deg, #ff3d3d, #e50914);
  transform: scale(1.1) rotate(-2deg);
}

.item button:active {
  transform: scale(0.95);
  background: #b20710;
}

.button.back {
  margin-top: 30px;
  padding: 15px 30px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.button.back:hover {
  background-color: #444444;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.button.back:active {
  transform: scale(0.95);
  background-color: #555555;
}
</style>
