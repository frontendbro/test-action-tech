<template>
  <li class="task-item">
    <div class="task-item__title" :style="{ textDecoration: state ? 'line-through' : 'none' }">{{ title }}</div>
    <VCheckbox class="task-item__checkbox" v-model="state" @checked="handleChecked" />
    <VButton title="×" @click="deleteTask(id)" />
  </li>
</template>

<script>
import VCheckbox from '@/components/VCheckbox'
import VButton from '@/components/VButton'
import { mapActions } from 'vuex'

export default {
  name: 'TaskItem',
  components: { VButton, VCheckbox },
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
    ...mapActions(['DeleteTask']),
    handleChecked(e) {
      this.checked = !e
    },
    deleteTask(id) {
      this.DeleteTask(id)
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
    font-weight: bold;
    flex-grow: 1;
    text-align: left;
  }
  &__checkbox {
    margin-right: 12px;
  }
}
</style>
