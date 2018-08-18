<template>
  <div>
    <div class="hearder">
      <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
        <legend>乐嘟嘟</legend>
      </fieldset>
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <li v-for="(item,index) in types" :key="item.code" :class="{'layui-this':index == 0}" @click="getList(item.code)">{{item.title}}</li>
        </ul>
      </div>
    </div>
    <section class = "gallery code-body">
      <div>
        <router-link class="iconDiv" :to="{path: '/shopme/web/video/detail/' + companyId + '/' + item.id}" tag="div" v-for="item in lists" :key="item.id"><img class="item" :src="item.imgUrl" :alt="item.content"></router-link>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'list',
  data () {
    return {
      types: [{
        code: '0',
        title: '有图汉字'
      },
      {
        code: '3',
        title: '拼音'
      },
      {
        code: '1',
        title: '字母'
      },
      {
        code: '2',
        title: '数字'
      },
      {
        code: '4',
        title: '象形字（一）'
      }],
      lists: []
    }
  },
  methods: {
    getList (code) {
      this.$http.ajax('post', 'card/list/' + this.companyId, {
        type: code
      }, (data) => {
        console.log(data)
        if (data.success) {
          this.lists = data.result
          console.log(this.lists)
        } else {
          index.alert(data.msg)
        }
      }, (error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.companyId = this.$route.params.companyId
    if (this.companyId) {
      this.companyId = 1
    }
    this.getList(this.types[0].code)
  },
  mounted () {
  }
}
</script>

<style scoped>
  .active{
    font-width: 1;
  }
  .item{
    max-width: 100%;
    max-height: 100%;
    height: 100% !important;
  }
  .iconDiv{
    height: 50% !important;
    width: auto;
  }
  .hearder{
    float: left; background: #fff;
    width: 100%;
  }
  .code-body {
    float: left;
  }
</style>
