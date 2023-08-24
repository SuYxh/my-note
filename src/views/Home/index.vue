<template>
    <div>
      <RouterList :list="routes" />
    </div>
</template>

<script setup lang='ts'>
import { routes } from '../../router/index';
import RouterList from '../../components/RouterList.vue';
  
</script>