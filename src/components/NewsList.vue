<template>
  <ul class="news__list" v-for="item in news">
    <li class="news__list-item">
      <a class="news__list-link" :href="item.url" target="_blank">
        <img class="news__list-item-img" :src="item.multimedia[0].url" alt="">
        <div class="news__list-about">
          <div class="news__list-details">
            <h3 class="news__list-title">{{ item.title }}</h3>
            <p class="subtitle__date">Last Update: {{ item.updated_date }}</p>
          </div>
          <h4 class="news__list-author">{{ item.byline }}</h4>
          <p class="news__list-briefly">{{ item.abstract }}</p>
        </div>
        <h4 class="news__list-section">
          <ul class="news__list-section-item">
            <li class="news__list-section-tag">{{ item.section }}</li>
          </ul>
        </h4>
      </a>
    </li>
  </ul>
</template>

<script setup>
  defineProps({
    news: Array
  })
</script>

<style lang="scss">
  .news__list {

    &-item-img{
      width: 500px;
    }
  }
</style>