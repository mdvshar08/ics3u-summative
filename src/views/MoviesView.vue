<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Genres from '../components/Genres.vue'

const genresList = [
  {
    id: 28,
    genreName: "Action"
  },
  {
    id: 878,
    genreName: "Sci-Fi"
  },
  {
    id: 27,
    genreName: "Horror"
  },
  {
    id: 35,
    genreName: "Comedy"
  },
  {
    id: 53,
    genreName: "Thriller"
  },
]
</script>

<template>
<div>
    <Header />
    <Genres :genres="genresList" />
    <Footer />
  </div>
  </template>

<style scoped>

</style>