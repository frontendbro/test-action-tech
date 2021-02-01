<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fl-modal-layout"
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
        class="fl-modal"
        :class="{
          'full-page' : isFullPage,
          'content-center' : isContentCenter,
          'margin-header': !listBreadcrumbs.length
        }"
        @keydown.esc="closeModal"
      >
        <fl-icon name="close" class="fl-modal-header__close" @click="closeModal" />
        <div class="fl-modal-header">
          <fl-breadcrumbs
            v-if="listBreadcrumbs.length"
            :list-breadcrumbs="listBreadcrumbs"
          />
          <h2 v-if="title" class="fl-modal-title">
            {{ title }}
          </h2>
          <div v-if="description" class="fl-modal-description">
            {{ description }}
          </div>
        </div>
        <div ref="body" class="fl-modal-body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import FlIcon from '../icon/FlIcon'
import FlBreadcrumbs from '../FlBreadcrumbs'

export default {
  name: 'FlModal',
  components: { FlBreadcrumbs, FlIcon },
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
      default: () => ([])
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
    isOpen (value) {
      this.$nextTick(() => {
        if (this.$refs.modal && value) {
          disableBodyScroll(this.$refs.modal)
        } else {
          clearAllBodyScrollLocks()
        }
      })
    },

    adaptiveBody (value) {
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
    clickAway () {
      if (this.isClickAwayClose) this.closeModal()
    },
    closeModal () {
      this.$emit('close')
    },

    setHeightBody () {
      if (this.$refs.modal && this.$refs.body) {
        this.$refs.body.style.height = this.$refs.modal.clientHeight * 0.9 - 50 + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fl-modal-layout {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;

  @include flex-center;
}

.fl-modal {
  position: relative;
  box-sizing: border-box;
  width: 630px;
  max-height: 99%;
  padding: 50px 40px 40px;
  overflow-y: scroll;
  background: $light-01;
  border-radius: $border-radius;

  @include hidden-scrollbar;
}

.fl-modal-header__close {
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 3;
  cursor: pointer;
}

.fl-modal-header {
  @include flex-column;
}

.margin-header {
  padding-top: 70px;
}

.fl-modal-title {
  margin-bottom: 10px;
  font-size: 44px;
  letter-spacing: -0.88px;
}

.fl-modal-description {
  margin-bottom: 40px;
  color: $black-02;
}

.fl-modal-body {
  width: 100%;
  height: 100%;
}

.background {
  background: rgba($black-01, 0.2);
}

.full-page {
  position: fixed;
  width: 100%;
  height: 100%;
  max-height: initial;
  padding: 20px;
  border-radius: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.content-center {
  @include flex-center;

  .fl-modal-body {
    @include flex-center;
  }
}

@include media-max-md {
  .fl-modal-title {
    margin-top: 10px;
    font-size: 26px;
  }

  .fl-modal-description {
    margin-bottom: 10px;
    font-size: 14px;
  }
}
</style>
