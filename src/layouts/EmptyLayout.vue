<template>
  <div class="empty-layout">
    <slot name="router"></slot>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout'
}
</script>

<style lang="less" scoped>
.empty-layout {
  height: 100%;
}
</style>
