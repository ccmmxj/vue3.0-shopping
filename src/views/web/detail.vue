<template>
  <div style="width:100%;">
    <!--<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">-->
      <!--<legend>详情</legend>-->
    <!--</fieldset>-->
    <div style="display: flex;justify-content: center;">
      <img :src="code.imgUrl" style="width: 80% ;height: 80%" />
      <audio loop="" :src="audioUrl" id="audio" autoplay="" preload="auto">该浏览器不支持audio属性</audio>
    </div>
  </div>
</template>

<script>
import addr from '../../base/addr'

export default {
  name: 'detail',
  data () {
    return {
      code: {},
      audioUrl: ''
    }
  },
  methods: {
    getCode () {
      this.$http.ajax('post', '/card/detail/' + this.companyId + '/' + this.id, {}, (data) => {
        console.log(data)
        if (data.success) {
          this.code = data.result
          if (this.code.audioUrl) {
            this.audioUrl = this.code.audioUrl
          } else {
            this.audioUrl = addr.audioUrl(this.code.content, this.code.type === 1 ? 'en' : 'ch')
          }
        }
      }, (error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.id = this.$route.params.id
    this.companyId = this.$route.params.companyId
    this.getCode()
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
