<script setup>
  import { useRoute, useRouter } from "vue-router";
  import Header from "../components/Header.vue";
  import Details from "../components/Details.vue";
  import Footer from "../components/Footer.vue";

  const route = useRoute();
  const router = useRouter();
  const movieId = route.params.id;

  if (!movieId) {
    router.push("/");
  }
</script>

<template>
  <Header />
  <div class="details-view">
    <button @click="router.push('/movies')">Back to Movies</button>
    <Details :id="movieId" />
  </div>
  <Footer />
</template>

<style scoped>
.details-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #0d0d0d;
}

button {
  background-color: #e50914;
  color: white;
  font-size: 1rem;
  padding: 14px 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}

button:hover {
  background-color: #444444;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.7);
}

button:focus {
  outline: 2px solid #f40612;
  box-shadow: 0 0 0 4px rgba(229, 9, 20, 0.5);
}

button:active {
  background-color: #d90413;
  transform: scale(0.96);
}

button:disabled {
  background-color: #444444;
  color: #bbbbbb;
  cursor: not-allowed;
}
</style>
