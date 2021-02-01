<template>
  <label class="v-checkbox" :class="{ error: error }">
    <span class="v-checkbox__custom-box" :class="size">
      <input
        type="checkbox"
        class="v-checkbox__input"
        :checked="checked"
        v-bind="$attrs"
        v-on="inputListeners"
      />
      <div v-if="checked" class="v-checkbox__icon">✓</div>
    </span>
    <span class="v-checkbox__text">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'VCheckbox',
  components: {},
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: 'small'
    },
    checked: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputListeners() {
      const vm = this
      return Object.assign({}, this.$listeners, {
        change: event => {
          vm.$emit('change', event.target.checked)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.v-checkbox {
  display: flex;
  align-items: center;
  width: 16px;
  transition: 0.2s;
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #42b983;
    color: #fff;
  }
}

.v-checkbox__input {
  position: absolute;
  z-index: -1;
  margin: 0;
  outline: none;
  opacity: 0;
}

.v-checkbox__custom-box {
  border: 1px #606060 solid;
  border-radius: 3px;
  cursor: pointer;
  fill: lightslategrey;
}

.v-checkbox__text {
  margin-left: 12px;
  cursor: pointer;
}

.small {
  width: 16px;
  min-width: 16px;
  height: 16px;
}

.error {
  color: red;
  fill: red;

  .v-checkbox__custom-box {
    border: 1px red solid;
  }
}
</style>
