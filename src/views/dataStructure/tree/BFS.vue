<template>
  <div class="wrap">
    <div class="code">
      <CodeDisplay :code="bfs.tree" language="javascript" />
    </div>
    <div class="out">
      <el-button class="btn-margin" type="primary" @click="handleClick(1)">bfsStack</el-button>
      <el-button class="btn-margin" type="primary" @click="handleClick(2)">bfsRecursion</el-button>
      <el-button class="btn-margin" type="primary" @click="handleClick(3)">bfsRecursionLevel</el-button>
      <el-button class="btn-margin" type="primary" @click="handleClick(4)">bfsStackLevel</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import CodeDisplay from './CodeDisplay.vue';
import bfs from './bfs';


const handleClick = (type) => {
  switch (type) {
    case 1:
      bfs.bfsStack(bfs.tree)
      break;
      case 2:
      bfs.bfsRecursion([bfs.tree])
      break;
      case 3:
      bfs.bfsRecursionLevel([bfs.tree])
      break;
      case 4:
      bfs.bfsStackLevel(bfs.tree)
      break;  

    default:
      break;
  }
}


</script>

<style lang="scss" scoped>
.wrap {
  display: flex;

  & ::v-deep .el-button+.el-button {
    margin-left: 0;
  }

  .code {
    margin-right: 60px;
  }

  .out {
    display: flex;
    flex-direction: column;
    padding-top: 24px;
  }

  .btn-margin {
    margin-bottom: 40px;
  }
}
</style>