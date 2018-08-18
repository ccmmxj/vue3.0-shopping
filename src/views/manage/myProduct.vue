<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>我的商品</legend>
    </fieldset>
    <div>
      <router-link tag="button" :to="{path: addCard}" class="layui-btn layui-btn-warm">添加</router-link>
      <div class="layui-inline">
        <label class="layui-form-label">商品名称</label>
        <div class="layui-input-inline">
          <input name="title" v-model.lazy="searchTitle" class="layui-input">
        </div>
      </div>
      <button class="layui-btn" @click="reloadTable">搜索</button>
      <table id="productList" lay-filter="productFilter"></table>
      <div id="page"></div>
      <script type="text/html" id="productTool">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
        <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="rec">恢复</a>
      </script>
    </div>
  </div>
</template>
<script>
import LaySelect from '../../components/manage/LaySelect'
import MyAlert from '../../components/Alert'
import UploadButton from '../../components/manage/UploadButton'
import addr from '../../base/addr'
import jrQrcode from 'jr-qrcode'

export default {
  components: {
    LaySelect,
    MyAlert,
    UploadButton
  },
  name: 'myProduct',
  data () {
    return {
      addCard: '/shopme/manage/main/product',
      type: 'chinese',
      imgUrl: '',
      audioUrl: '',
      content: '',
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
      searchTitle: '',
      codeTypes:
        [{
          code: 'chinese',
          value: '文字'
        },
        {
          code: 'english',
          value: '字母'
        }]
    }
  },
  watch: {
    type () {
      console.log(this.type)
    },
    imgUrl () {
      console.log(this.imgUrl)
    },
    content () {
      console.log(this.content)
    }
  },
  methods: {
    reloadTable () {
      index.tableReload({
        title: this.searchTitle,
      }, '#productList')
    },
    chooseType (item) {
      this.type = item.code
    },
    toolFun (layer, obj, tableLay) {
      return {
        'edit': (sessionid) => {
          // layer.msg('编辑操作')
          this.$router.push('product/' + obj.data.id)
        },
        'del': (sessionid) => {
          layer.confirm('真的删除行么', function (index) {
            $.ajax({
              method: 'post',
              url: addr.host + 'shopping/manage/product/del',
              data: {
                id: obj.data.id
              },
              xhrFields: {
                  withCredentials: true
              },
              dataType: 'json',
              success: (data) => {
                if (data.success) {
                  layer.msg(data.message)
                  obj.del()
                  layer.close(index)
                  tableLay.reload()
                }
              },
              error: (error) => {
                console.log(error)
              }})
          })
        },
        'rec': (sessionid) => {
          layer.confirm('真的恢复删除么', function (index) {
            $.ajax({
              method: 'post',
              url: addr.host + 'shopping/manage/product/rec',
              data: {
                  id: obj.data.id
              },
              xhrFields: {
                  withCredentials: true
              },
              dataType: 'json',
              success: (data) => {
                  if (data.success) {
                      layer.msg(data.message)
                      obj.del()
                      layer.close(index)
                      tableLay.reload()
                  }
              },
              error: (error) => {
                  console.log(error)
              }})
          })
        }
      }
      // var data = obj.data
      //   ,layEvent = obj.event
      // if(layEvent === 'detail'){
      //   layer.msg('查看操作')
      // } else if(layEvent === 'del') {
      //   layer.confirm('真的删除行么', function(index) {
      //     obj.del()
      //     layer.close(index)
      //     tableLay.reload()
      //   })
      // } else if(layEvent === 'edit') {
      //   layer.msg('编辑操作');
      // }
    },
    changeImgUrl (url) {
      this.imgUrl = url
    },
    changeAudioUrl (url) {
      this.audioUrl = url
    },
    submitCode () {
      let message = ''
      if (this.type == null || this.type === '') {
        message += '请选择类型,'
      }
      if (this.content == null || this.content === '') {
        message += '请输入内容,'
      }
      if (this.imgUrl == null || this.imgUrl === '') {
        message += '请上传图片,'
      }
      if (message !== '') {
        alert(message)
        return
      }
      this.$http.ajax('post', '/manage/addCode',
        {
          type: this.type,
          imgUrl: this.imgUrl,
          content: this.content
        },
        (data) => {
          if (data.success) {
            console.log(data.message)
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
    this.sessionId = this.$store.getters.getUser.sessionId
    index.table('#productList', 'productFilter', '#page', addr.host + 'shopping/manage/product/list', this.toolFun, [[
      {title: '序号',
        fixed: 'left',
        width: 100,
        templet: (item) => {
          return item.LAY_INDEX
        }},
      {field: 'id', title: 'ID', width: 100, sort: true, fixed: 'left'},
      {field: 'title', title: '商品名称', width: 180, sort: true},
      {field: 'type',
        title: '类型',
        width: 90,
        sort: true},
      {field: 'icon',
        title: '图片',
        width: 180,
        templet: (item) => {
          return '<img src = "' + item.icon + '" width="25px" height="25px" />' + item.icon
        }},
      {field: 'description', title: '描述'},
      {field: 'cost', title: '价格', width: 90, sort: true},
      {field: 'nowCost', title: '现价(不填只显示价格)', width: 180, sort: true},
      {field: 'hot', title: '热度', width: 90,sort: true},
      {field: 'isBanner', title: '是否显示在轮播', width: 180,
          templet: (item) => {
              return item.isBanner?'是':'否'
          }},
      {field: 'isDeleted', title: '是否删除', width: 90,
          templet: (item) => {
              return item.isDeleted?'是':'否'
        }},
      {fixed: 'right', width: 165, align: 'center', toolbar: '#productTool'}
    ]], this.sessionId,{})
  },
  updated () {
  }
}
</script>
