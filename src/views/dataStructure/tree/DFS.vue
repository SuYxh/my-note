<template>
  <div class="wrap">
    <div class="code">
      <!-- <pre>
        {{ dfs.root }}
      </pre> -->
      <CodeDisplay :code="dfs.root" language="javascript" />
    </div>
    <div class="out">
      <el-button class="btn-margin" type="primary" @click="handleClick(1)">dfsStack</el-button>
      <el-button class="btn-margin" type="primary" @click="handleClick(2)">dfsRecursion</el-button>
      <el-button class="btn-margin" type="primary" @click="handleClick(3)">dfsLevelStack</el-button>
      <el-button class="btn-margin" type="primary" @click="handleClick(4)">dfsLevelRecursion</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import CodeDisplay from './CodeDisplay.vue';
import dfs from './dfs';


const handleClick = (type) => {
  switch (type) {
    case 1:
      dfs.dfsStack(dfs.root)
      break;
      case 2:
      dfs.dfsRecursion(dfs.root)
      break;
      case 3:
      dfs.dfsLevelStack(dfs.root)
      break;
      case 4:
      dfs.dfsLevelRecursion(dfs.root)
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