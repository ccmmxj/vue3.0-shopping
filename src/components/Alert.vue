<template>
  <div>
    <transition name="drop">
    <div v-if="showAlert" style="top:0;position: absolute;float:left;width: 100%;height: 3%" :class="[type,'white_font']">
      <div style="margin-top: 0.2%;margin-left: 10px;">
        {{messageAlert}}
      </div>
    </div>
    </transition>
  </div>
</template>
<script>

export default {
  props: {
    type: {
      type: [String],
      default () {
        return 'info'
      }
    },
    showAlert: {
      showAlert: [Boolean],
      default () {
        return false
      }
    },
    messageAlert: {
      messageAlert: [String],
      default () {
        return ''
      }
    },
    timeout: {
      type: [Number],
      default () {
        return 1000
      }
    }
  },
  watch: {
    showAlert () {
      if (this.showAlert) {
        setTimeout(() => {
          this.showAlert = false
        }, this.timeout)
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped>
  .drop-enter-active,.drop-leave-active{
    transition: all 1s ease
  }
  .drop-enter, drop-leave-active{
    transform: translateY(-1000px);
  }
  .white_font {
    color: white;
  }
  .success {
    background: #21e7b6;
  }
  .warning {
    background: rgb(251, 255, 124);
  }
  .error {
    background: rgb(255, 255, 255);
  }
  .info {
    background: rgb(118, 159, 205);
  }
</style>
