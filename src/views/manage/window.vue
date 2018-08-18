<template>
  <div>
    <blockquote class="layui-elem-quote layui-text">
      鉴于小伙伴的普遍反馈，先温馨提醒两个常见“问题”：1. <a href="/doc/base/faq.html#form" target="_blank">为什么select/checkbox/radio没显示？</a> 2. <a href="/doc/modules/form.html#render" target="_blank">动态添加的表单元素如何更新？</a>
    </blockquote>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>展示图</legend>
    </fieldset>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">标题</label>
      <div class="layui-input-block">
        <input placeholder="请输入标题" class="layui-input" v-model.lazy="title"/>
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <UploadButton :name="'img'" :url="windowUrl" :title="'上传展示图片'" @changeUrl="changeWindowUrl"></UploadButton>
        <!--<div class="layui-upload">-->
          <!--<button type="button" class="layui-btn" name="img">上传主题图片</button>-->
          <!--<div class="layui-upload-list">-->
            <!--<img class="layui-upload-img" id="img" :src="imgUrl" style="width:10%" >-->
            <!--<p id="imgText"></p>-->
            <!--<p id="imgUrl" @click="changeImgUrl" style="border: 0;margin-top: 10px;background: none;"></p>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">排序位置</label>
      <div class="layui-input-block">
        <input placeholder="请输入位置(从大到小)" class="layui-input" v-model.lazy="oid"/>
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit="" @click="submitWindow">立即提交</button>
      </div>
    </div>
    <my-alert :showAlert="showAlert" :messageAlert="messageAlert" :timeout="2000" :type="alertType"></my-alert>
  </div>
</template>
<script>
import LaySelect from '../../components/manage/LaySelect'
import MyAlert from '../../components/Alert'
import UploadButton from '../../components/manage/UploadButton'
import { eventBus } from '../../eventBus'

export default {
  components: {
    LaySelect,
    MyAlert,
    UploadButton
  },
  name: 'window',
  data () {
    return {
      type: 0,
      windowUrl: '',
      title: '',
      oid: '',
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
    }
  },
  watch: {
    windowUrl () {
      console.log('windowUrl:' + this.windowUrl)
    },
    title () {
      console.log('title:' + this.title)
    },
    oid () {
      console.log('oid:' + this.oid)
    }
  },
  methods: {
    changeWindowUrl (url) {
      this.windowUrl = url
    },
    submitWindow () {
      let message = ''
      if (this.title == null || this.title === '') {
        message += '请输入标题,'
      }
      if (this.windowUrl == null || this.windowUrl === '') {
        message += '请上传图片,'
      }
      if (this.oid == null || this.oid === '') {
        message += '请输入位置,'
      }
      if (message !== '') {
        index.alert(message)
        return false
      }
      this.$http.ajax('post', '/manage/window/saveOrUpdate;jsessionid=' + this.$store.getters.getUser.sessionId,
        {
          id: this.id,
          windowUrl: this.windowUrl,
          title: this.title,
          oid: this.oid
        },
        (data) => {
          if (data.success) {
            console.log(data.message)
            this.id = data.result.id
            this.messageAlert = data.message
            this.alertType = 'success'
            this.showAlert = true
          }
        },
        (error) => {
          console.log(error)
          this.$store.dispatch('logout')
        })
    }
  },
  mounted () {
    index.upload(this.$store.getters.getUser.sessionId)
  },
  updated () {
  },
  created () {
    this.id = this.$route.params.id
    if (this.id) {
      this.$http.ajax('post', '/manage/window/detail;jsessionid=' + this.$store.getters.getUser.sessionId, {id: this.id}, (data) => {
        console.log(data)
        if (data.success) {
          this.windowUrl = data.result.windowUrl
          this.title = data.result.title
          this.oid = data.result.oid
        }
      }, (error) => {
        console.log(error)
        this.$store.dispatch('logout')
      })
    }
  }
}
</script>
