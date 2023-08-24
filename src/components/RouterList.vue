<template>
  <ul>
    <li class="nav" v-for="(nav, index) in list" :key="index" @click="skip(nav)">{{ getTitle(nav) }}</li>
  </ul>
</template>
  
<script setup lang='ts'>
// @ts-ignore
import { defineProps } from 'vue';
import { useRouter, RouteRecordRaw } from 'vue-router';

defineProps({
  list: {
    type: Array<RouteRecordRaw>,
    default: () => ([])
  }
})

const router = useRouter()

const skip = (nav: RouteRecordRaw) => {
  if (nav?.meta?.path) {
    router.push(nav.meta.path)
  }
}

const getTitle = (nav) => {
  if (nav?.meta?.title) {
    return nav.meta.title
  }
  return nav.name
}

</script>
  
<style lang="scss" scoped>
  .nav {
    cursor: pointer;
  }
</style>