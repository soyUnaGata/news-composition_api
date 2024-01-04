<template>
  <div class="wrapper">
    <header class="d-flex flex-column align-items-center">
      <h1>By New York Times</h1>
      <div class="subtitle d-flex">
        <p class="subtitle__section">Business Section |</p>
        <p class="subtitle__date">Last Update: {{ header.last_updated }}</p>
      </div>
    </header>

    <main>
      <div class="sort-filter__section">
        <!-- <select-button /> -->
        <select v-model="selectData">
          <option disabled value="">Show by</option>
          <option value="title">Name (A -> Z)</option>
          <option value="title-reverse">Name (Z -> A)</option>
          <option value="date">Date (Newest First)</option>
          <option value="date-reverse">Date (Oldest First)</option>
        </select>
      </div>
      <div class="news__wrapper">
        <news-list :news="sortedTitleReverse" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

import NewsList from "./components/NewsList.vue";
import SelectButton from "./components/SelectButton.vue";

const news = ref([]);
let header = ref({});
let selectData = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=ZhZXYAVIC3MhEys9Us9Y5icDqq46GFRF');
    news.value = response.data.results;

    const headerResponse = await axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=ZhZXYAVIC3MhEys9Us9Y5icDqq46GFRF');
    header.value = headerResponse.data;
  } catch (err) {
    console.log(err)
  }

  return {
    news
  }
});

// const model = defineModel({ default: 'default' });
const sortedTitleNews = computed(() => !selectData.value ? news.value : [...(news.value || [])].sort((item1, item2) => item1['title']?.localeCompare(item2['title'])));
const sortedTitleReverse = computed(() => !selectData.value ? news.value : [...(news.value || [])].sort((item1, item2) => item2['title']?.localeCompare(item1['title'])));
// return {
//   model,
//   sortedNews
// }



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

.news__wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
}
</style>
