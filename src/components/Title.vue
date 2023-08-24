<template>
  <h3 class="title">{{ text }}</h3>
</template>
  
<script setup lang='ts'>
// @ts-ignore
import { defineProps } from 'vue';

defineProps({
  text: {
    type: String,
    default: ''
  }
})

</script>
  
<style lang="scss" scoped>
.title {
  margin-left: 24px;
}
</style>