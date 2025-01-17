<script setup>
import { useStore } from '../stores';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

function goBackToMovies() {
  router.push('/movies');
}

const checkout = () => {
  store.cart.clear();
  localStorage.removeItem('cart');
  store.checkoutMessage = 'Thank you for your purchase!';
  setTimeout(() => {
    store.checkoutMessage = '';
  }, 3000);
};
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

        <button class="checkout-button" @click="checkout">Checkout</button>
        <div v-if="store.checkoutMessage" class="thank-you-message">
          {{ store.checkoutMessage }}
        </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #141414;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.cart {
  padding: 30px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  background-color: #1f1f1f;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
}

.cart h1 {
  font-size: 2.6rem;
  color: #e50914;
  margin-bottom: 25px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1.5px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
}

.item img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e50914;
}

.item h1 {
  font-size: 1.3rem;
  color: #fff;
  font-weight: 600;
  margin-left: 20px;
  flex: 1;
  text-align: left;
}

.item button {
  background: linear-gradient(90deg, #e50914, #b20710);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.item button:hover {
  background: linear-gradient(90deg, #b20710, #e50914);
  transform: scale(1.05);
}

.item button:active {
  transform: scale(0.95);
  background: #b20710;
}

.checkout-button {
  width: auto;
  padding: 12px 25px;
  background: linear-gradient(90deg, #e50914, #b20710);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  margin: 20px auto;
  display: block;
}

.checkout-button:hover {
  background: linear-gradient(90deg, #b20710, #e50914);
  transform: scale(1.05);
}

.checkout-button:active {
  transform: scale(0.97);
}

.thank-you-message {
  text-align: center;
  margin-top: 25px;
  font-size: 1.3rem;
  color: #e50914;
  font-weight: bold;
}

.button.back {
  margin-top: 30px;
  padding: 12px 25px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  width: 100%;
}

.button.back:hover {
  background-color: #444;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.button.back:active {
  transform: scale(0.95);
  background-color: #555;
}

@media (max-width: 768px) {
  .cart {
    padding: 20px;
  }

  .cart h1 {
    font-size: 2rem;
  }

  .item h1 {
    font-size: 1rem;
  }

  .checkout-button, .button.back {
    font-size: 1rem;
    padding: 10px 20px;
  }
}

</style>
