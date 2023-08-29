<template>
    <div class="tree">

      <div>
      <el-button class="btn-margin" :type="getType(1)" @click="changeIndex(1)">DFS</el-button>
      <el-button class="btn-margin" :type="getType(2)" @click="changeIndex(2)">BFS</el-button>
      </div>

      <Dfs v-if="index === 1"></Dfs>
      <BFS v-if="index === 2"></BFS>
    </div>
</template>
  
<script setup lang='ts'>
import { ref } from 'vue';
import Dfs from './DFS.vue';
import BFS from './BFS.vue';


const index = ref(1)


const changeIndex = (i) => {
  index.value = i
}

const getType = (i) => {
  return i === index.value ? 'primary' : 'info'
}

</script>
  
<style lang="scss" scoped>
  .tree {
    padding: 24px;
  }
</style>