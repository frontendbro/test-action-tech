<template>
  <li class="task-item">
    <div class="task-item__title" :style="{ textDecoration: state ? 'line-through' : 'none' }">
      {{ title }}
    </div>
    <div v-if="date.length" class="task-item-date">
      <div class="task-item-date__label">Дней до завершения:</div>
      <div class="task-item-date__count" :class="{ 'task-item-date__count_red': dateFormat.diff($date(), 'day') < 0 }">
        {{ dateFormat.diff($date(), 'day') > 0 ? dateFormat.diff($date(), 'day') : 'Время вышло' }}
      </div>
    </div>
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
    },
    date: {
      type: String,
      default: ''
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
  },
  computed: {
    dateFormat() {
      return this.$date(this.date)
    }
  }
}
</script>

<style lang="less" scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  &:not(:last-child) {
    border-bottom: 1px solid #606060;
  }
  &__title {
    margin-right: 10px;
    font-weight: bold;
    flex-grow: 1;
    text-align: left;
    font-size: 20px;
  }
  &__checkbox {
    margin-right: 12px;
  }
  &-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 12px;
    &__label {
      font-size: 12px;
    }
    &__count {
      &_red {
        color: red;
      }
    }
  }
}
</style>
