<template>
  <div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">文本/Url</label>
      <div class="layui-input-block">
        <input placeholder="将要生成二维码的文本或链接" class="layui-input" v-model.lazy="dataTxt" />
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">颜色背景</label>
      <div class="layui-input-inline">
        <input type="text" class="layui-input" placeholder="颜色 默认#ffffff" v-model="color"/>
      </div>
      <div class="layui-input-inline">
        <input type="text" class="layui-input" placeholder="背景 默认#000000" v-model="bgcolor"/>
      </div>
    </div>

    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit="" @click="convert(dataTxt,color,bgcolor)">生成</button>
      </div>
    </div>
    <div class="layui-input-block">
      <img :src="qrcodeImg" />
    </div>
  </div>
</template>
<script>
import jrQrcode from 'jr-qrcode'
export default {
  data () {
    return {
      qrcodeImg: '',
      dataTxt: '',
      color: '',
      bgcolor: ''
    }
  },
  created () {
  },
  watch: {
    'dataTxt': 'zidong'
  },
  methods: {
    zidong () {
      this.convert(this.dataTxt, this.color, this.bgcolor)
    },
    convert (txt, color, bgcolor) {
      var imgBase64 = jrQrcode.getQrBase64(txt, {
        padding: 10,
        width: 256,
        height: 256,
        correctLevel: 2,
        background: color || '#ffffff',
        foreground: bgcolor || '#000000'
      })
      this.qrcodeImg = imgBase64
    }
  }

}
</script>
