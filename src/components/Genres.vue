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
</script>

<template>
  <div class="movie-gallery">
    <select v-model="selectedGenre" @change="getMovieByGenre">
      <option v-for="genre of genres" :value="genre.id" :key="genre.id">{{ genre.genreName }}</option>
    </select>
    <div v-if="response" class="movie-list">
      <div v-for="movie in response.data.results" :key="movie.id" class="movie-card"
        @click="router.push(`/movies/${movie.id}`)">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ movie.title }}</p>
        <button v-if="!store.cart.has(movie.id)"
          @click.stop="store.addToCart(movie.id, { title: movie.title, url: movie.poster_path })" class="movie-site">
          Buy
        </button>
        <button v-else @click.stop="store.removeFromCart(movie.id)" class="movie-site added"
          :disabled="store.cart.has(movie.id)">
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
}

.movie-site {
  display: block;
  width: 100%;
  text-align: center;
  padding: 10px;
  background-color: #e50914;
  color: #ffffff;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.movie-site:hover {
  background-color: #f6121d;
}

.movie-site.added {
  background-color: #555;
  cursor: not-allowed;
}

.movie-site.added:hover {
  background-color: #555;
}
</style>