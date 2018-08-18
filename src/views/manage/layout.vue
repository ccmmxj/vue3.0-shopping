<template>
  <div class="layui-layout layui-layout-admin" @click="resetSelectShow">
    <Header></Header>
    <Left></Left>
    <div class="content">
      <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
          <!--<keep-alive>-->
            <router-view></router-view>
          <!--</keep-alive>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../../components/manage/header'
import Left from '../../components/manage/left'
import {eventBus} from '../../eventBus'

export default {
  components: {
    Header,
    Left
  },
  methods: {
    resetSelectShow () {
      eventBus.$emit('resetSelectShow')
    }
  }
}
</script>
