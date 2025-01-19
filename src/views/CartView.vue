<script setup>
import { useStore } from '../stores';
import { useRouter } from 'vue-router';


const store = useStore();

function removeItem(key) {
    store.cart.delete(key)
    localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
  }

  function clearCart() {
    store.cart.clear();
    localStorage.removeItem(`cart_${store.user.email}`);
    alert("Thank you for your purchase!");
  }

</script>

<template>
    <div class="cart">
      <RouterLink to="/movies" class="back-button">Back To Movies</RouterLink>
        <h2>Shopping Cart</h2>
        <div class="item" v-for="([key, value]) in store.cart" :key="key">
            <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" />
            <div class="item-details">
                <h3>{{ value.title }}</h3>
                <button @click="removeItem(key)">Remove</button>
            </div>
        </div>
        <button class="checkout-button" @click="clearCart">Checkout</button>
        <div v-if="store.checkoutMessage" class="thank-you-message">
          {{ store.checkoutMessage }}
        </div>
    </div>
</template>

<style scoped>
body {
  background-color: #141414; 
  color: #fff;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

.cart {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #1f1f1f; 
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.cart h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #e50914;
  text-align: center;
}

.back-button {
  display: inline-block;
  margin-bottom: 1rem;
  color: #fff;
  background: #e50914;
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-weight: 500;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: #444444;
}

.item {
  display: flex;
  align-items: center;
  background: #222;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 6px;
}

.item img {
  width: 120px;
  height: auto;
  border-radius: 4px;
  margin-right: 1rem;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
}

.item-details button {
  background: #e50914;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.item-details button:hover {
  background: #444444;
}

.checkout-button {
  display: block;
  width: 100%;
  background: #e50914;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  margin-top: 1.5rem;
  transition: background 0.3s ease;
}

.checkout-button:hover {
  background: #444444;
}

.thank-you-message {
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #43a047;
}

@media (max-width: 768px) {
  .item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item img {
    width: 100%;
    margin-bottom: 1rem;
  }

  .checkout-button {
    font-size: 1.2rem;
    padding: 0.8rem;
  }
}
</style>
