<template>
  <div
    class="v-input"
    :class="{
      'v-input_error': isError,
      'v-input_disabled': disabled
    }"
    @click="focusInput"
  >
    <label class="v-input__label">{{ label }}</label>
    <input
      ref="input"
      v-model="valueInput"
      v-bind="$attrs"
      class="v-input__field"
      @keyup.enter="$emit('press', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    isError: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },

  computed: {
    valueInput: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    focusInput() {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="less" scoped>
.v-input {
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
  &__field {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
  }
  &__label {
    color: #606060;
    font-size: 12px;
  }
  &_error {
    border: 1px #f14848 solid;
    .v-input {
      color: #f14848;
    }
    .v-input__label {
      color: #f14848;
    }
  }
  &_disabled {
    background: rgba(#606060, 0.1);
    pointer-events: none;
    .v-input {
      color: #606060;
    }
  }
}
</style>
