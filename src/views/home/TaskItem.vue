<template>
  <li class="task-item">
    <div class="task-item__title">{{ title }}</div>
    <VCheckbox :checked="status" />
  </li>
</template>

<script>
import VCheckbox from '@/components/VCheckbox'

export default {
  name: 'TaskItem',
  components: { VCheckbox },
  props: {
    title: {
      type: String,
      default: '-'
    },
    status: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.task-item {
  display: flex;
  &__title {
    margin-right: 10px;
  }
}
</style>
