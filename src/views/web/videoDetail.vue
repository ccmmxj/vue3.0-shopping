<template>
  <div style="width:100%;">
    <!--<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">-->
      <!--<legend>详情</legend>-->
    <!--</fieldset>-->
    <div class="title"><a :href="'/shopme/web/card/detail/' + this.companyId + '/' + this.id">切换到图片版</a>
      <div style="width:80%;margin:auto">
        <video :src="videoUrl" controls="controls" class="video" autoplay>该浏览器不支持video属性</video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      code: {},
      videoUrl: ''
    }
  },
  methods: {
    getCode () {
      this.$http.ajax('post', '/card/detail/' + this.companyId + '/' + this.id, {}, (data) => {
        console.log(data)
        if (data.success) {
          this.code = data.result
          if (this.code.videoUrl) {
            this.videoUrl = this.code.videoUrl
          }
        }
      }, (error) => {
        console.log(error)
      })
    },
    toCard () {
      this.$router.push('/shopme/web/video/detail/' + this.companyId + '/' + this.id)
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
.video {
  order: 0;
  width: 100%;
}
.title{
  height: 50px;
  width: 100%;
  position: fixed;
  text-align: right;
  right: 10px;
  top: 20px;
  z-index:1000
}
</style>
