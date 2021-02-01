<template>
  <div class="home">
    <div class="home-title">
      Привет <span class="home-title__name">{{ userData.login }}</span
      >!
    </div>
    <ul class="home-task-list" v-if="taskList.length">
      <TaskItem
        v-for="task of taskList"
        :key="task.id"
        :status="task.status"
        :title="task.title"
        :id="task.id"
        :date="task.date"
      />
    </ul>
    <div v-else class="home-task-list_empty">Список задач пуст</div>
    <VButton title="Создать задачу" type="is-primary" @click="isOpen = true" />

    <VModal :is-open="isOpen" class="new-task-modal" title="Новая задача" @close="isOpen = false">
      <template #body>
        <div class="new-task-modal-body">
          <VInput class="new-task-modal__input" label="Название" v-model="newTaskTitle" />
          <div class="new-task-modal-date">
            <label class="new-task-modal-date__label">Дата окончания</label>
            <input class="new-task-modal-date__input" type="date" v-model="newTaskDate" />
          </div>
          <VButton
            class="new-task-modal__btn"
            title="Создать"
            type="is-primary"
            @click="createTask"
            :disabled="!newTaskTitle.length"
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
      newTaskDate: '',
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
      this.CreateTask({ title: this.newTaskTitle, date: this.newTaskDate })
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
    width: 500px;
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
  &-date {
    margin-bottom: 20px;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    background: #f7f7f7;
    border: 1px transparent solid;
    border-radius: 8px;
    transition: 0.2s;
    &__label {
      color: #606060;
      font-size: 12px;
    }
    &__input {
      outline: none;
    }
  }
}
</style>
