<template>
  <div>
    <blockquote class="layui-elem-quote layui-text">
      鉴于小伙伴的普遍反馈，先温馨提醒两个常见“问题”：1. <a href="/doc/base/faq.html#form" target="_blank">为什么select/checkbox/radio没显示？</a> 2. <a href="/doc/modules/form.html#render" target="_blank">动态添加的表单元素如何更新？</a>
    </blockquote>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>卡片</legend>
    </fieldset>

    <div class="layui-form-item">
      <div class="layui-input-block">
        <UploadButton :name="'img'" :url="icon" :title="'上传图片'" @changeUrl="changeImgUrl"></UploadButton>
        <!--<div class="layui-upload">-->
          <!--<button type="button" class="layui-btn" name="img">上传主题图片</button>-->
          <!--<div class="layui-upload-list">-->
            <!--<img class="layui-upload-img" id="img" :src="icon" style="width:10%" >-->
            <!--<p id="imgText"></p>-->
            <!--<p id="icon" @click="changeImgUrl" style="border: 0;margin-top: 10px;background: none;"></p>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">标题</label>
      <div class="layui-input-block">
        <input placeholder="请输入标题" class="layui-input" v-model.lazy="title"/>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">商品类型</label>
      <div class="layui-input-inline">
        <input placeholder="请输入类型" class="layui-input" v-model.lazy="type"/>
        <!--<select v-model="type">-->
        <!--<option v-for="item in codeTypes" :value="item.code" :key="item.code" >{{item.value}}</option>-->
        <!--</select>-->
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">价格</label>
      <div class="layui-input-block">
        <input placeholder="请输入价格" class="layui-input" v-model.lazy="cost"></input>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">现价</label>
      <div class="layui-input-block">
        <input placeholder="请输入现价" class="layui-input" v-model.lazy="nowCost"></input>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">描述</label>
      <div class="layui-input-block">
        <textarea placeholder="请输入描述" class="layui-textarea" v-model.lazy="description"></textarea>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">热度</label>
      <div class="layui-input-block">
        <input placeholder="请输入热度" class="layui-input" v-model.lazy="hot"></input>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">是否轮播</label>
      <div class="layui-input-inline">
        <LaySelect :options="isBanners" :value="isBanners[isBanner]" @change-type="chooseIsBanner"></LaySelect>
        <!--<select v-model="type">-->
        <!--<option v-for="item in codeTypes" :value="item.code" :key="item.code" >{{item.value}}</option>-->
        <!--</select>-->
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit="" @click="submitCode">立即提交</button>
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
  name: 'card',
  data () {
    return {
      description: '',
      type: '',
      icon: '',
      cost: '',
      nowCost: '',
      hot:0,
      isBanner:0,
      title: '',
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
      isBanners:
          [{
              code: '0',
              value: '否'
          },
          {
              code: '1',
              value: '是'
          }]
    }
  },
  watch: {
    icon () {
      console.log('icon:' + this.icon)
    },
    isBanner () {
      console.log('isBanner:' + this.isBanner)
      eventBus.$emit('setCurrentSelect', this.isBanner)
      console.log('setCurrentSelect')
    }
  },
  methods: {
    chooseIsBanner (item) {
      this.isBanner = item.code
    },
    changeImgUrl (url) {
      this.icon = url
    },
    submitCode () {
      let message = ''
      if (this.type == null || this.type === '') {
        message += '请输入类型,'
      }
      if (this.title == null || this.title === '') {
        message += '请输入标题,'
      }
      if (this.icon == null || this.icon === '') {
          message += '请上传图片,'
      }
      if (this.description == null || this.description === '') {
          message += '请输入描述,'
      }
      if (this.cost == null || this.cost === '') {
          message += '请输入价格,'
      }
      if (message !== '') {
        index.alert(message)
        return false
      }
      this.$http.ajax('post', 'shopping/manage/product/saveOrUpdate',
        {
          id: this.id,
          type: this.type,
          icon: this.icon,
          description: this.description,
          title: this.title,
          cost: this.cost,
          nowCost: this.nowCost,
          hot: this.hot,
          isBanner: this.isBanner
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
      this.$http.ajax('post', '/manage/card/detail;jsessionid=' + this.$store.getters.getUser.sessionId, {id: this.id}, (data) => {
        console.log(data)
        if (data.success) {
          this.type = data.result.type
          this.icon = data.result.icon
          this.audioUrl = data.result.audioUrl
          this.title = data.result.title
          this.content = data.result.content
        }
      }, (error) => {
        console.log(error)
        this.$store.dispatch('logout')
      })
    }
  }
}
</script>
