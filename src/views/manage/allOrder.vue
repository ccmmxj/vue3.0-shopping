<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>我的订单</legend>
    </fieldset>
    <div>
      <!--<router-link tag="button" :to="{path: addCard}" class="layui-btn layui-btn-warm">添加</router-link>-->
      <div class="layui-inline">
        <label class="layui-form-label">单号名称</label>
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
        <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="upStatus">派送|送达</a>
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
  name: 'allOrder',
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
        searchTitle: ''
    }
  },
  watch: {

  },
  methods: {
    reloadTable () {
      index.tableReload({
        oid: this.searchTitle,
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
              url: addr.host + 'shopping/manage/order/del',
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
              url: addr.host + 'shopping/manage/order/rec',
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
        'upStatus': (sessionid) => {
            let msg = "";
            if(obj.data.status == 2){
                msg = "开始派送么"
            } else {
                msg = "已送达么"
            }
          layer.confirm(msg, function (index) {
            $.ajax({
              method: 'post',
              url: addr.host + 'shopping/manage/order/upStatus',
              data: {
                  id: obj.data.id,
                  type: obj.data.status == 2 ? "BEGIN_SENT":"ALREADY_SENT"
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
    index.table('#productList', 'productFilter', '#page', addr.host + 'shopping/manage/order/list', this.toolFun, [[
      {title: '序号',
        align: 'left',
        width: 100,
        templet: (item) => {
          return item.LAY_INDEX
        }},
      {field: 'id', title: 'ID', width: 100, sort: true, align: 'left'},
      {field: 'oid', title: '单号', width: 180, sort: true},
      {field: 'receiver', title: '收货人', width: 180, sort: true},
      {field: 'tel',
        title: '联系方式',
        width: 180,
        sort: true},
      {field: 'mark',
        title: '备注',
        width: 180},
      {field: 'total', title: '总价',width: 90},
      {field: 'products', title: '商品',
        templet: (item) => {
          let html = "";
          item.wxOrderProducts.map(v=>{
              html += v.title + " : " + v.num + " X " + v.cost + "<br />"
          })
          return html
        }},
      {field: 'status', title: '状态', sort: true,
        templet: (item) => {
        return item.status == 0? "<font color='red'>已送</font>":item.status == 1 ?"<font color='blue'>正在派送</font>":"<font color='green'>未送</font>"
      }},
      {field: 'isDeleted', title: '是否删除', width: 180,
          templet: (item) => {
              return item.isDeleted?'是':'否'
        }},
      {fixed: 'right', width: 250, align: 'center', toolbar: '#productTool'}
    ]], this.sessionId,{})
  },
  updated () {
  }
}
</script>
<style>
  .layui-table-cell {
    height: inherit;
  }
</style>