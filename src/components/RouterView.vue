<script setup lang="ts">
// @ts-ignore
import { defineProps } from 'vue';

defineProps({
  isKeepAlive: {
    type: Boolean,
    default: false
  },
  isTransition: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
