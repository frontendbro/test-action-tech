<template>
  <div class="home">
    <div>Приввввввееет {{ userData.login }}</div>
    <div>Лови список твоих дел</div>
    <ul>
      <TaskItem v-for="task of taskList" :key="task.id" :status="task.status" :title="task.title" />
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TaskItem from '@/views/home/TaskItem'

export default {
  name: 'Home',
  components: { TaskItem },
  computed: {
    ...mapState(['taskList']),
    userData() {
      return JSON.parse(sessionStorage.getItem('user-data'))
    }
  }
}
</script>
