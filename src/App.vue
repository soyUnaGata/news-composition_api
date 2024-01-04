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
      <div class="sort-filter__section">
        <!-- <select-button /> -->
        <select v-model="selectData">
          <option disabled value="">Show by</option>
          <option v-for="option in selectOptions" :key="option.value" :value="option.key">
            {{ option.name }}
          </option>

        </select>
      </div>
      <div class="news__wrapper">
        <news-list :news="sortedNews" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { formatDate } from "./utils/dateUtil.js";

import NewsList from "./components/NewsList.vue";
import SelectButton from "./components/SelectButton.vue";

dayjs.extend(isSameOrBefore);

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

const sortedTitleNews = computed(() => !selectData.value ? news.value : [...(news.value || [])].sort((item1, item2) => item1['title']?.localeCompare(item2['title'])));
const sortedTitleReverse = computed(() => !selectData.value ? news.value : [...(news.value || [])].sort((item1, item2) => item2['title']?.localeCompare(item1['title'])));

const sortedDate = computed(() =>
  !selectData.value
    ? news.value
    : [...(news.value || [])].sort((a, b) => dayjs(a['updated_date']).isSameOrBefore(dayjs(b['updated_date'])) ? 1 : -1)
);
const sortedDateReverse = computed(() =>
  !selectData.value
    ? news.value
    : [...(news.value || [])].sort((a, b) => dayjs(a['updated_date']).isSameOrBefore(dayjs(b['updated_date'])) ? -1 : 1)
);

const selectOptions = ref([
  // { value: '', name: 'Show by' },
  { key: 'title', name: 'Name (A -> Z)', value: sortedTitleNews },
  { key: 'title-reverse', name: 'Name (Z -> A)', value: sortedTitleReverse },
  { key: 'date', name: 'Date (Newest First)', value: sortedDate },
  { key: 'date-reverse', name: 'Date (Oldest First)', value: sortedDateReverse },
])

const sortedNews = computed(() => {
  if (!selectData.value) {
    return news.value;
  }
  const selectedOption = selectOptions.value.find(option => option.key === selectData.value);
  return selectedOption ? selectedOption.value : [];
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
}
</style>
