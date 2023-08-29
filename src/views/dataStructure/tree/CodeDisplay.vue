<template>
  <pre class="code-container">
    <code :class="language">{{ code }}</code>
  </pre>
</template>

<script>
export default {
  name: 'CodeDisplay',
  props: {
    code: {
      type: [String, Object],
      required: true,
    },
    language: {
      type: String,
      default: 'plaintext',
    },
  },
};
</script>

<style scoped>
.code-container {
  background-color: #f6f8fa;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
}

.plaintext {
  white-space: pre-wrap;
}

/* 添加其他语言的样式 */

</style>
