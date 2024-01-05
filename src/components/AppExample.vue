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
                <select v-model="sorttype">
                    <option disabled value="">Show by</option>
                    <option v-for="option in sorts" :value="option.key">
                        {{ option.name }}
                    </option>

                </select>
            </div>
            <div class="news__wrapper">
                <news-list :news="sorted" @get-section="(val) => section = val" />
            </div>
        </main>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { formatDate } from "./utils/dateUtil.js";

import NewsList from "./components/NewsList.vue";
import SelectButton from "./components/SelectButton.vue";

dayjs.extend(isSameOrBefore);

const news = ref([]);
let header = ref({});
let sorttype = ref('');
let section = ref('')

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

const sorts = ref([
    // { value: '', name: 'Show by' },
    { key: 'title', name: 'Name (A -> Z)', value: (item1, item2) => item1['title']?.localeCompare(item2['title']) },
    { key: 'title-reverse', name: 'Name (Z -> A)', value: (item1, item2) => item2['title']?.localeCompare(item1['title']) },
    { key: 'date', name: 'Date (Newest First)', value: (a, b) => dayjs(a['updated_date']).isSameOrBefore(dayjs(b['updated_date'])) ? 1 : -1 },
    { key: 'date-reverse', name: 'Date (Oldest First)', value: (a, b) => dayjs(a['updated_date']).isSameOrBefore(dayjs(b['updated_date'])) ? -1 : 1 },
])

const sort = computed(() => sorttype.value ? sorts.value.find(s => s.key == sorttype.value) : null)
const sorted = computed(() => sort && sort.value ? [...filtered.value].sort(sort.value.value) : filtered.value);
const filtered = computed(() => section.value ? (news.value || []).filter(news => news.section === section.value) : (news.value || []));
