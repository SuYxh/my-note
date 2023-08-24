<template>
  <div>
    <Title :text="(title as string)" />

    <RouterList :list="childrenRoutes" />
    <RouterView :isTransition="true" />
  </div>
</template>
  
<script setup lang='ts'>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { routes } from '../../router/index';
import RouterView from '../../components/RouterView.vue';
import RouterList from '../../components/RouterList.vue';
import Title from '../../components/Title.vue';

const route = useRoute()

const childrenRoutes = computed(() => {
  const curRoute = routes.filter(item => item.path === route.path)?.[0]
  return curRoute?.children
})

const title = computed(() => {
  return route.meta?.title ?? ''
})

</script>
  
<style></style>