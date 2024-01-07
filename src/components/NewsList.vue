<template>
  <ul class="news__list" v-for="item in news">
    <li class="news__list-item">
      <a class="news__list-link d-flex flex-column" :href="item.url" target="_blank">
        <img class="news__list-item-img" v-if="item.multimedia" :src="item.multimedia[0].url" :alt="item.multimedia[0]">
        <img class="news__list-item-img" v-else src="../assets/img/newspaper.jpg" alt="newspaper">
        <div class="news__list-about d-flex flex-column">
          <div class="news__list-details">
            <h3 class="news__list-title">{{ item.title }}</h3>
            <p class="subtitle__date">Last Update: {{ formatDate(item.updated_date) }}</p>
          </div>
          <h4 class="news__list-author">{{ item.byline }}</h4>
          <p class="news__list-briefly">{{ item.abstract }}</p>
        </div>
      </a>

      <button class="news__list-section-tag" @click="$emit('get-section', item.section)">
        <span class="news__list-section-title">{{ item.section }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup>
import { formatDate } from "@/utils/dateUtil.js";

defineProps({
  news: Array
});


</script>

<style lang="scss">
$for-tags: #dcdcdc;

.news__list {

  &-item {
    padding: 0 20px;
  }

  &-link {
    max-width: 100%;
    gap: 10px;
  }

  &-item-img {
    max-width: 100%;
    height: 500px;
    object-fit: cover;
  }

  &-about {
    gap: 5px;
  }

  &-author {
    font-weight: 500;
    text-decoration: underline;
  }

  &-section-tag {
    margin-top: 15px;
    border: none;
    background: none;
  }

  &-section-title {
    background-color: $for-tags;
    padding: 5px 15px;
    border-radius: 10px;
    font-style: italic;
    cursor: pointer;
  }
}

.subtitle__date {
  font-style: italic;
}
</style>