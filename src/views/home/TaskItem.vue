<template>
  <li class="task-item">
    <div class="task-item__title" :style="{ textDecoration: state ? 'line-through' : 'none' }">{{ title }}</div>
    <VCheckbox v-model="state" @checked="handleChecked" />
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
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      checked: false,
      state: false
    }
  },
  created() {
    this.state = this.status
  },
  methods: {
    handleChecked(e) {
      console.info('e', e, this.id)
      this.checked = !e
    }
  }
}
</script>

<style lang="less" scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  width: 300px;
  padding: 4px 0;
  &:not(:last-child) {
    border-bottom: 1px solid #606060;
  }
  &__title {
    margin-right: 10px;
  }
}
</style>
