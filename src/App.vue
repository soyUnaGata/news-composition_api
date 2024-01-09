<template>
  <div class="wrapper">
    <header class="d-flex flex-column align-items-center">
      <h1>By New York Times</h1>
      <div class="subtitle d-flex">
        <p class="subtitle__section">Business Section |</p>
        <p class="subtitle__date">Last Update: {{ formatDate(header.last_updated) }}</p>
      </div>
    </header>

    <main>
      <div class="filters d-flex justify-content-end">
        <div v-if="selected" class="clear__all__filters">
          <button class="clear__all__filters-btn" @click="selected = ''">Reset All Filters</button>
        </div>

        <div class="sort-filter__section d-flex justify-content-end">
          <select class="sort-filter__select" v-model="selected">
            <option class="sort-filter__option" disabled value="">Show by</option>
            <option v-for="option in selectOptions" :value="option.key">
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="news__wrapper">
        <news-list :news="sortedNews" @get-section="(val) => section = val" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import { formatDate } from "./utils/dateUtil.js";

import NewsList from "./components/NewsList.vue";

const news = ref([]);
const header = ref({});
const selected = ref('');
const section = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=ZhZXYAVIC3MhEys9Us9Y5icDqq46GFRF');
    header.value = data;
    news.value = data.results;
  } catch (err) {
    console.log(err, 'err')
  }
  return {
    news,
    header
  }
});

const selectOptions = ref([
  { key: 'title', name: 'Name (A -> Z)', fn: (item1, item2) => item1['title']?.localeCompare(item2['title']) },
  { key: 'title-reverse', name: 'Name (Z -> A)', fn: (item1, item2) => item2['title']?.localeCompare(item1['title']) },
  { key: 'date', name: 'Date (Newest First)', fn: (a, b) => dayjs(a['updated_date']).isSameOrBefore(dayjs(b['updated_date'])) ? 1 : -1 },
  { key: 'date-reverse', name: 'Date (Oldest First)', fn: (a, b) => dayjs(a['updated_date']).isSameOrBefore(dayjs(b['updated_date'])) ? -1 : 1 },
])

const filtered = computed(() => section.value ? news.value.filter(news => news.section === section.value) : news.value);

const sortedNews = computed(() => {
  if (!selected.value) {
    return news.value;
  }
  const selectedType = selectOptions.value.find(option => option.key === selected.value);
  return selectedType && selectedType.fn ? [...filtered.value].sort(selectedType.fn) : news.value;
});

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
  margin-top: 15px;
}

.filters {
  gap: 10px;
}

.sort-filter {
  &__section {
    padding-right: 20px;
  }

  &__select {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    background-color: #f5f5f5;
    color: #333;
    outline: none;
  }
}

.clear__all__filters-btn {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;

  background-color: #f9c3c3;
  border: 1px solid #e88e8e;
  border-radius: 5px;
  color: #333;
}
</style>
