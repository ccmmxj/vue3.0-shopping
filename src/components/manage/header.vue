<template>

  <div class="layui-header">
    <div class="layui-logo">shopme 后台布局</div>
    <!-- 头部区域（可配合layui已有的水平导航） -->
    <ul class="layui-nav layui-layout-left">
      <!--<li class="layui-nav-item"><a href="">控制台</a></li>-->
      <!--<li class="layui-nav-item"><a href="">商品管理</a></li>-->
      <!--<li class="layui-nav-item"><a href="">用户</a></li>-->
      <!--<li class="layui-nav-item">-->
      <!--<a href="javascript:;">其它系统</a>-->
      <!--<dl class="layui-nav-child">-->
      <!--<dd><a href="">邮件管理</a></dd>-->
      <!--<dd><a href="">消息管理</a></dd>-->
      <!--<dd><a href="">授权管理</a></dd>-->
      <!--</dl>-->
      <!--</li>-->
    </ul>
    <ul class="layui-nav layui-layout-right">
      <li class="layui-nav-item">
        <a href="javascript:;">
          <!--<img src="http://t.cn/RCzsdCq" class="layui-nav-img">-->
          {{user.manageUser.empName}}
        </a>
        <dl class="layui-nav-child">
          <dd><a href="">基本资料</a></dd>
          <dd><a href="">安全设置</a></dd>
        </dl>
      </li>
      <li class="layui-nav-item"><a href="javascript:void(0)" @click="logout">退了</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      console.log(this.$store.getters.getUser)
    }
  },
  mounted () {
    if (this.$store.getters.getUser === undefined) {
      this.$router.push('/shopme/manage/logout')
    }
    console.log(this.$store)
  }
}
</script>
