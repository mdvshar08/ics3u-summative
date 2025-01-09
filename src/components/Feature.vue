<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const movies = ref([]);

onMounted(async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`);
  movies.value = getRandomMovies(response.data.results, 3);
});

const getRandomMovies = (moviesArray, count) => {
  const shuffled = [...moviesArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getMovieDetails = (id) => {
  console.log(`Movie ID: ${id}`);
};
</script>

<template>
  <div class="movie-gallery">
    <h1>Now Playing</h1>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="getMovieDetails(movie.id)">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ movie.title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');

body {
  margin: 0;
  padding: 0;
}

.movie-gallery {
  padding: 20px;
  color: white;
  background-color: #141414;
  font-family: Arial, sans-serif;
}

.movie-gallery h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 3rem;
  color: #e50914;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto Condensed', sans-serif;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.movie-card {
  background-color: #222;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.movie-card:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.7);
}

.movie-poster {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.movie-title {
  padding: 15px 10px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #e50914;
  border-radius: 0 0 10px 10px;
  text-transform: uppercase;
}

.features-section {
  margin-top: 0;
}

header,
nav,
.movie-gallery {
  margin-bottom: 0;
}

* {
  box-sizing: border-box;
}
</style>

