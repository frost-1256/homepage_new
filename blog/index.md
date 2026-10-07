---
layout: page
title: "haru's notebook"
---

<script setup>
import { data as posts } from './.vitepress/posts.data'
import { withBase } from 'vitepress'
</script>

<div class="blog-top">
  <h1>haru's notebook</h1>
  <p>雑記など。</p>

  <p v-if="!posts.length">まだ記事がありません。</p>

  <ul v-else class="post-list">
    <li v-for="post of posts" :key="post.url" class="post-card">
      <span class="post-date">{{ post.date }}</span>
      <a :href="withBase(post.url)" class="post-title">{{ post.title }}</a>
      <div v-if="post.excerpt" v-html="post.excerpt" class="post-excerpt"></div>
    </li>
  </ul>
</div>
