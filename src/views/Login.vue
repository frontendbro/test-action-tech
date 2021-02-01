<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form__title">Авторизация</div>
      <VInput class="login-form__input" v-model="valLogin" label="Login:" />
      <VInput class="login-form__input" v-model="valPass" label="Pass:" />
      <VButton full-width type="is-primary" title="Отправить" @click="sendLoginInfo" />
    </div>
  </div>
</template>

<script>
import VInput from '@/components/VInput'
import VButton from '@/components/VButton'

export default {
  name: 'Login',
  components: { VButton, VInput },
  data() {
    return {
      valLogin: '',
      valPass: ''
    }
  },

  methods: {
    sendLoginInfo() {
      if (this.valLogin.length && this.valPass.length) {
        const parsed = JSON.stringify({ login: this.valLogin, pass: this.valPass })
        sessionStorage.setItem('user-data', parsed)
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #42b983;
  &-form {
    width: 300px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.09);
    padding: 20px;
    &__title {
      font-size: 20px;
      line-height: 1;
      margin-bottom: 20px;
    }
    &__input {
      margin-bottom: 20px;
    }
  }
}
</style>
