<script>
import VIcon from '@/components/Icon/VIcon'

export default {
  name: 'VButton',
  functional: true,
  components: {},
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'is-default'
    },
    heightIcon: {
      type: Number,
      default: 16
    },
    widthIcon: {
      type: Number,
      default: 16
    },
    border: {
      type: Boolean,
      default: false
    },

    fullWidth: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    transparent: {
      type: [Boolean, Number],
      default: false
    }
  },

  render: (h, context) => {
    function defineClassForButton() {
      let mainClass = `v-button ${context.props.type} ${context.props.size}`
      if (context.props.border) mainClass += ' border'
      if (context.props.icon) mainClass += ' with-icon'
      if (context.props.fullWidth) mainClass += ' fill-width'
      if (context.props.disabled) mainClass += ' disabled'
      if (context.props.transparent) mainClass += ' transparent'
      if (!context.props.title) mainClass += ' not-title'
      return mainClass
    }

    function defineClassForIcon() {
      return 'v-button__icon'
    }

    if (context.data.staticClass) context.data.staticClass += ` ${defineClassForButton()}`
    else context.data.staticClass = defineClassForButton()

    return h(context.props.tag, context.data, [
      context.props.icon &&
        h(VIcon, {
          class: defineClassForIcon(),
          props: {
            name: context.props.icon,
            width: context.props.widthIcon,
            color: 'initial',
            height: context.props.heightIcon
          }
        }),
      context.props.title &&
        h('span', {
          class: 'v-button__title',
          domProps: {
            innerHTML: context.props.title
          }
        })
    ])
  }
}
</script>

<style lang="less" scoped>
.v-button {
  padding: 10px 12px;
  font-size: 16px;
  background: transparent;
  border: 0;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0 2px 5px 0 rgba(#000, 0.05);
  }
}

.is-default {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f14848;
  color: #fff;
  padding: 0;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  line-height: 1;
}

.is-primary {
  color: #fff;
  background: lightslategrey;
  fill: #fff;

  &:hover {
    color: #fff;
    box-shadow: 0 7px 20px 0 rgba(#000, 0.1);
  }
}

.v-button__title {
  text-align: center;
}

.with-icon .v-button__title {
  margin-left: 10px;
}

.border {
  border: solid 1px #e5e5e5;
}

.small {
  font-size: 16px;
}

.medium {
  font-size: 20px;
}

.disabled {
  background: #606060;
  pointer-events: none;
}

.not-title {
  align-self: flex-end;
  padding: 6px 15px;
  fill: #2c3e50;
}

.fill-width {
  width: 100%;
}

.transparent {
  &:hover {
    box-shadow: initial;
  }
}
</style>
