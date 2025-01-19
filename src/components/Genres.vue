<script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "../stores";

  const props = defineProps(["genres"]);
  const router = useRouter();
  const selectedGenre = ref(28);
  const response = ref(null);
  const store = useStore();

  const getMovieByGenre = async () => {
    response.value = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${selectedGenre.value}`
    );
  };

  onMounted(getMovieByGenre);

  function addToCart(movie) {
    store.cart.set(String(movie.id), { title: movie.title || item.name, url: movie.poster_path })
    localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}
</script>

<template>
  <div class="movie-gallery">
      <select v-model="selectedGenre" @change="getMovieByGenre">
          <option v-for="genre of genres" :value="genre.id" :key="genre.id">{{ genre.genreName }}</option>
      </select>
      <div v-if="response" class="movie-list">
          <div v-for="movie in response.data.results" :key="movie.id" class="movie-card">
              <div @click="router.push(`/movies/${movie.id}`)">
                  <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster"
                      class="movie-poster" />
                  <p class="movie-title">{{ movie.title }}</p>
              </div>
              <button v-if="!store.cart.has(String(movie.id))" @click="addToCart(movie)" class="buy-button">
                  Buy
              </button>
              <button v-else class="buy-button">
                  Added
              </button>
          </div>
      </div>
  </div>
</template>

<style scoped>
.movie-gallery {
  background-color: #141414;
  color: #ffffff;
  font-family: Arial, sans-serif;
  padding: 20px;
  min-height: 100vh;
}

select {
  background-color: #333;
  color: #ffffff;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  cursor: pointer;
}

select:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(229, 9, 20, 0.8);
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.movie-card {
  background-color: #222;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
}

.movie-poster {
  width: 100%;
  display: block;
  border-bottom: 1px solid #333;
}

.movie-title {
  text-align: center;
  font-size: 14px;
  padding: 10px;
  color: #e5e5e5;
}

.buy-button {
  display: block;
  width: 80%;
  margin: 10px auto 20px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background-color: #e50914;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
}

.buy-button:hover {
  background-color: #444444;
}

.buy-button:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.buy-button.added {
  background-color: #444444;
  cursor: not-allowed;
}

.buy-button.added:hover {
  background-color: #960209;
}

@media (max-width: 768px) {
  .movie-title {
    font-size: 12px;
  }

  .buy-button {
    font-size: 12px;
    padding: 8px 16px;
  }
}
</style>
