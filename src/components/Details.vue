<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const movieDetails = ref(null);
const trailers = ref([]);

async function fetchMovieDetails(id) {
  if (!id) return;


  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`
  );
  movieDetails.value = response.data;

  const trailerResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`
  );
  trailers.value = trailerResponse.data.results;

  const boxOfficeResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/revenue?api_key=${import.meta.env.VITE_API_KEY}`
  );
  boxOffice.value = boxOfficeResponse.data.revenue;
}

onMounted(() => fetchMovieDetails(props.id));
watch(() => props.id, (newId) => fetchMovieDetails(newId));
</script>

<template>
  <div class="details-component">
    <div v-if="movieDetails">
      <div class="poster-container">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`"
          :alt="movieDetails.title"
          class="movie-poster"
        />
      </div>
      <div class="details-content">
        <h1>{{ movieDetails.title }}</h1>
        <p class="overview">{{ movieDetails.overview }}</p>
        <p>Release Date: {{ movieDetails.release_date }}</p>
        <p>Rating: {{ movieDetails.vote_average }}/10</p>
        <p>Genres:
          <span v-for="genre in movieDetails.genres" :key="genre.id">
            {{ genre.name }}
          </span>
        </p>
        <p>Runtime: {{ movieDetails.runtime }} minutes</p>
        <div v-if="trailers.length > 0">
          <h2>Trailers:</h2>
          <div class="trailer-list">
            <div v-for="trailer in trailers" :key="trailer.id" class="trailer-item">
              <iframe
                :src="`https://www.youtube.com/embed/${trailer.key}`"
                title="Trailer"
                class="trailer-video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

```vue
<style scoped>
.details-component {
  background-color: #141414;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.poster-container {
  text-align: center;
}

.movie-poster {
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.6);
}

.details-content {
  text-align: center;
  max-width: 800px;
}

.details-content h1 {
  font-size: 2.5rem;
  color: #e50914;
  font-weight: bold;
  margin-bottom: 10px;
}

.overview {
  font-size: 1.1rem;
  color: #d3d3d3;
  margin-bottom: 20px;
  line-height: 1.5;
}

.details-content p {
  margin: 10px 0;
  font-size: 1rem;
}

.details-content span {
  display: inline-block;
  margin: 0 5px;
  font-size: 0.9rem;
  color: #e50914;
}

.trailers-section {
  width: 100%;
  margin-top: 30px;
}

.trailers-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 15px;
  text-align: center;
}

.trailer-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.trailer-item {
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.6);
  background-color: #222222;
}

.trailer-video {
  width: 100%;
  height: 170px;
  border-radius: 8px;
  transition: transform 0.3s;
}

.trailer-video:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.8);
}
</style>