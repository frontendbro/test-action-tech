<template>
  <div class="home">
    <div class="home-title">
      Привет <span class="home-title__name">{{ userData.login }}</span>!
    </div>
    <ul class="home-task-list" v-if="taskList.length">
      <TaskItem
        v-for="task of taskList"
        :key="task.id"
        :status="task.status"
        :title="task.title"
        :id="task.id"
      />
    </ul>
    <div v-else class="home-task-list_empty">Список задач пуст</div>
    <VButton title="Создать задачу" type="is-primary" @click="isOpen = true" />

    <VModal :is-open="isOpen" class="new-task-modal" title="Новая задача" @close="isOpen = false">
      <template #body>
        <div class="new-task-modal-body">
          <VInput class="new-task-modal__input" label="Название" v-model="newTaskTitle" />
          <VButton
            class="new-task-modal__btn"
            title="Создать"
            type="is-primary"
            @click="createTask"
          />
        </div>
      </template>
    </VModal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TaskItem from '@/views/home/TaskItem'
import VButton from '@/components/VButton'
import VModal from '@/components/VModal'
import VInput from '@/components/VInput'

export default {
  name: 'Home',
  components: { VInput, VButton, TaskItem, VModal },
  data() {
    return {
      newTaskTitle: '',
      isOpen: false
    }
  },
  computed: {
    ...mapState(['taskList']),
    userData() {
      return JSON.parse(sessionStorage.getItem('user-data'))
    }
  },
  methods: {
    ...mapActions(['CreateTask']),
    createTask() {
      this.CreateTask(this.newTaskTitle)
      this.isOpen = false
      this.newTaskTitle = ''
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
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
    list-style: none;
    &_empty {
      margin-bottom: 20px;
      font-weight: bold;
    }
  }
}
.new-task-modal {
  &-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__input {
    margin-bottom: 20px;
  }
  &__btn {
    display: block;
    align-self: center;
  }
}
</style>
