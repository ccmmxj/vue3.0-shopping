<template>
  <div class="body">
    <div class="center">
      <router-view></router-view>
    </div>
    <Footer class="footer"></Footer>
    <Advert></Advert>
  </div>
</template>
<script>
// import '../assets/baguetteBox'
import Footer from '../components/footer'
import Advert from '../components/Advert'

export default {
  components: {
    Footer,
    Advert
  }
}
</script>
<style scoped>
  .center{
    height:95%;
    overflow-y: scroll;
  }
  .footer{
    height:5%
  }
  .body {
    height: 100%;
    width: 100%;
    position: fixed;
  }
</style>
