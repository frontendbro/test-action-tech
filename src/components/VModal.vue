<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="v-modal-layout"
      :class="{
        background: isBackground
      }"
    >
      <div
        ref="modal"
        v-click-outside="{
          handler: clickAway,
          events: ['mousedown']
        }"
        class="v-modal"
        :class="{
          'full-page': isFullPage,
          'content-center': isContentCenter
        }"
        @keydown.esc="closeModal"
      >
        <VIcon name="close" class="v-modal-header__close" @click="closeModal" />
        <div class="v-modal-header">
          <h2 v-if="title" class="v-modal-title">
            {{ title }}
          </h2>
          <div v-if="description" class="v-modal-description">
            {{ description }}
          </div>
        </div>
        <div ref="body" class="v-modal-body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import VIcon from '@/components/Icon/VIcon'

export default {
  name: 'FlModal',
  components: { VIcon },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    listBreadcrumbs: {
      type: Array,
      default: () => []
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    isClickAwayClose: {
      type: Boolean,
      default: true
    },
    isBackground: {
      type: Boolean,
      default: true
    },

    isFullPage: {
      type: Boolean,
      default: false
    },

    isContentCenter: {
      type: Boolean,
      default: false
    },

    adaptiveBody: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    isOpen(value) {
      this.$nextTick(() => {
        if (this.$refs.modal && value) {
          disableBodyScroll(this.$refs.modal)
        } else {
          clearAllBodyScrollLocks()
        }
      })
    },

    adaptiveBody(value) {
      if (value) {
        this.setHeightBody()
        window.addEventListener('resize', this.setHeightBody)
      } else {
        window.removeEventListener('resize', this.setHeightBody)
        this.$refs.body.style.height = '100%'
      }
    }
  },

  methods: {
    clickAway() {
      if (this.isClickAwayClose) this.closeModal()
    },
    closeModal() {
      this.$emit('close')
    },

    setHeightBody() {
      if (this.$refs.modal && this.$refs.body) {
        this.$refs.body.style.height = this.$refs.modal.clientHeight * 0.9 - 50 + 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.v-modal-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
}

.v-modal {
  position: relative;
  box-sizing: border-box;
  width: 630px;
  max-height: 99%;
  padding: 20px;
  overflow-y: scroll;
  background: #fff;
  border-radius: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  -webkit-appearance: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.v-modal-header__close {
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 3;
  fill: #333;
  cursor: pointer;
}

.v-modal-header {
  display: flex;
  flex-direction: column;
}

.v-modal-title {
  margin-bottom: 10px;
  font-size: 24px;
  letter-spacing: -0.88px;
}

.v-modal-description {
  margin-bottom: 40px;
  color: #222222;
}

.v-modal-body {
  width: 100%;
}

.background {
  background: rgba(#000, 0.2);
}

.full-page {
  position: fixed;
  width: 100%;
  height: 100%;
  max-height: initial;
  padding: 20px;
  border-radius: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.content-center {
  display: flex;
  align-items: center;
  justify-content: center;

  .v-modal-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
