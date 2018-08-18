<template>
    <div class="advert">
      <transition name="fade">
        <div v-show="showAdvert">
          <div class="close" @click="closeAdvert('showAdvert')">x</div>
          <img src="http://edu.ccmmxj.club/img/zfb2.png" width="112px"/>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'Advert',
  data () {
    return {
      showAdvert: true
    }
  },
  methods: {
    closeAdvert (name) {
      this[name] = false
    }
  }
}
</script>

<style scoped>
  .advert{
  }
  .advert img{
    position: fixed;
    bottom: 30px;
    right: 5px;
    opacity: 0.8;
  }
  .advert .close{
    z-index: 1000;
    position: fixed;
    bottom: 125px;
    right: 10px;
    opacity: 0.8;
    text-align: center;
    width:20px;
    height:20px;
    background: #555;
    color: #fff;
    border-radius:50px;
  }
  .fade-enter-active, .fade-leave-active{
    transition: all 1s ease
  }
  .fade-enter, .fade-leave-active{
    opacity: 0
  }
</style>
