<script setup>
</script>

<template>
     <div class="not-found-container">
        <h1>Oops! Page Not Found</h1>
<p>We couldn't find the page you're looking for. Please go back to the homepage.</p>
      <router-link to="/" class="home-button">Return Home</router-link>
    </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #141414;
  color: #ffffff;
  text-align: center;
  padding: 20px;
}

.not-found-container h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #e50914;
  margin-bottom: 20px;
}

.not-found-container p {
  font-size: 1.2rem;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 40px;
  max-width: 600px;
}

.home-button {
  background-color: #e50914;
  color: #ffffff;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
  cursor: pointer;
}

.home-button:hover {
  background-color: #f6121d;
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.home-button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .not-found-container h1 {
    font-size: 2.5rem;
  }

  .not-found-container p {
    font-size: 1.1rem;
  }

  .home-button {
    font-size: 1rem;
    padding: 12px 25px;
  }
}
</style>