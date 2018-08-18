<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>我的轮播图</legend>
    </fieldset>
    <div>
      <router-link tag="button" :to="{path: addLunbo}" class="layui-btn layui-btn-warm">添加</router-link>
      <div class="layui-inline">
        <label class="layui-form-label">标题</label>
        <div class="layui-input-inline">
          <input name="title" v-model.lazy="searchTitle" class="layui-input">
        </div>
      </div>
      <button class="layui-btn" @click="reloadTable">搜索</button>
      <table id="lunboList" lay-filter="lunboFilter"></table>
      <div id="page"></div>
      <script type="text/html" id="lunboTool">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
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
  name: 'myCard',
  data () {
    return {
      addLunbo: '/shopme/manage/main/lunbo',
    }
  },
  watch: {
  },
  methods: {
    reloadTable () {
      index.tableReload({
        title: this.searchTitle,
      }, '#lunboList')
    },
    initTable () {
      this.sessionId = this.$store.getters.getUser.sessionId
      index.table('#lunboList', 'lunboFilter', '#page', addr.host + 'manage/lunbo/list;jsessionid=' + this.sessionId, this.toolFun, [[
        {title: '序号',
          fixed: 'left',
          width: 100,
          templet: (item) => {
            return item.LAY_INDEX
          }},
        {field: 'id', title: 'ID', width: 100, sort: true, fixed: 'left'},
        {field: 'title', title: '标题', width: 180, sort: true},
        {field: 'oid', title: '位置', width: 180, sort: true},
        {field: 'lunboUrl',
          title: '轮播图链接',
          templet: (item) => {
            return '<img src = "' + item.lunboUrl + '" width="25px" height="25px" />' + item.lunboUrl
          }},
        {field: 'gmtModified',
          title: '修改时间',
          width: 180,
          sort: true,
          templet: (item) => {
            return item.gmtModified != null ? new Date(item.gmtModified).format('yyyy-MM-dd hh:mm:ss') : ''
          }},
        {field: 'gmtCreated',
          title: '创建时间',
          width: 180,
          sort: true,
          templet: (item) => {
            return item.gmtCreated != null ? new Date(item.gmtCreated).format('yyyy-MM-dd hh:mm:ss') : ''
          }},
        {fixed: 'right', width: 165, align: 'center', toolbar: '#lunboTool'}
      ]], this.sessionId)
    },
    toolFun (layer, obj, tableLay) {
      return {
        'edit': (sessionid) => {
          // layer.msg('编辑操作')
          this.$router.push('lunbo/' + obj.data.id)
        },
        'del': (sessionid) => {
          layer.confirm('真的删除行么', function (index) {
            $.ajax({
              method: 'post',
              url: addr.host + 'manage/lunbo/del;jsessionid=' + sessionid,
              data: {
                id: obj.data.id
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
    }
  },
  mounted () {
    this.initTable()
  },
  updated () {
  }
}
</script>
