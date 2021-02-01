<template>
  <div class="home">
    <div class="home-title">
      Приввввввееет <span class="home-title__name">{{ userData.login }}</span> привет
    </div>
    <ul class="home-task-list">
      <TaskItem
        v-for="task of taskList"
        :key="task.id"
        :status="task.status"
        :title="task.title"
        :id="task.id"
      />
    </ul>
    <VButton title="Создать задачу" type="is-primary" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TaskItem from '@/views/home/TaskItem'
import VButton from '@/components/VButton'

export default {
  name: 'Home',
  components: { VButton, TaskItem },
  computed: {
    ...mapState(['taskList']),
    userData() {
      return JSON.parse(sessionStorage.getItem('user-data'))
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 40px;
  &-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    &__name {
      color: #42b983;
    }
  }
  &-task-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 0;
    margin: 0 0 20px 0;
  }
}
</style>
