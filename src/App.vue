<template>
  <div class="wrapper">
    <header class="d-flex flex-column align-items-center">
      <h1>By New York Times</h1>
      <div class="subtitle d-flex">
        <p class="subtitle__section">Business Section |</p>
        <p class="subtitle__date">Last Update:</p>
      </div>
    </header>

    <main>
      <div class="news__wrapper">
        <news-list :news="news"/>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import NewsList from "./components/NewsList.vue";

const news = ref([]);
onMounted(async () => {
  try {
    const response  = await axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=ZhZXYAVIC3MhEys9Us9Y5icDqq46GFRF');
    news.value = response.data.results;
    console.log(news.value)
  } catch (err) {
    console.log(err)
  };

  return {
      news,
    };
})



</script>

<style lang="scss">
// #app {}

header {
  padding: 20px 0;

  h1 {
    font-weight: 800;
  }
}

.subtitle {
  gap: 5px;
  padding-top: 10px;

  &__section {
    font-weight: 500;
  }

  &__date {
    font-weight: 300;
  }
}
</style>
