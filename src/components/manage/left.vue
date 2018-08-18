<template>

  <div class="layui-side layui-bg-black">
    <div class="layui-side-scroll">
      <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
      <ul class="layui-nav layui-nav-tree"  lay-filter="test">
        <li :class="['layui-nav-item',{'layui-nav-itemed':menuItem.active}]" v-for="menuItem in menuList" :key="menuItem.id">
          <!--<a class="" href="javascript:;">文字上传</a>-->
          <!--<a :href="menuItem.url">{{menuItem.name}}</a>-->
          <router-link tag="a" :to="{path: menuItem.url}">{{menuItem.name}}</router-link>
          <dl class="layui-nav-child" v-if="menuItem.childManageMenu.length > 0">
            <dd v-for="childMenuItem in menuItem.childManageMenu" :key="childMenuItem.name">
              <!--<a href="javascript:;">列表一</a>-->
              <router-link tag="a" active-class="layui-this" :to="{path: childMenuItem.url}">{{childMenuItem.name}}</router-link>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeItems: []
    }
  },
  computed: {
    // menuList () {
    //   return this.$store.getters.getMenuList
    // }
    menuList () {
      console.log(this.$store.getters.getUser.manageMenuList)
      return this.$store.getters.getUser.manageMenuList
    }
  },
  mounted () {
    console.log(this.$store)
    // this.$store.dispatch('fetchMenuList')
    index.init()
  },
  updated () {
    index.init()
  }
}
</script>
