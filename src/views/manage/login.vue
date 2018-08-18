<template>
  <div class="bg-login">
    <div class="login-header container">
      <div class="login-title text-center">
        <h1>用户登录</h1>
      </div>
    </div>
    <div class="middle-box loginscreen bg-white container">
      <div class="login-top"></div>

      <div class="layui-form-item">
        <label class="layui-form-label">用户名</label>
        <div class="layui-input-block">
          <input type="text" v-model.lazy="username" name="username" placeholder="请输入用户名" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">密码</label>
        <div class="layui-input-block">
          <input type="password" name="password" placeholder="请输入密码" v-model.lazy="password" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <button @click="clickb" class="layui-btn" style="width:140px;margin-left:140px;">登陆</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  watch: {
    username () {
      console.log(this.username)
    },
    password () {
      console.log(this.password)
    }
  },
  methods: {
    clickb () {
      this.$store.dispatch('login', {'username': this.username, 'password': this.password})
    }
  }
  // verifyUsername (value, item) {
  //   //value：表单的值、item：表单的DOM对象
  //   if( !new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$" ).test(value)) {
  //     return '用户名不能有特殊字符'
  //   }
  //   if( /(^\_)|(\__)|(\_+$)/.test(value) ) {
  //     return '用户名首尾不能出现下划线"_"'
  //   }
  //   if(/^\d+\d+\d$/.test(value) ) {
  //     return '用户名不能全为数字'
  //   }
  // },
  // //我们既支持上述函数式的方式，也支持下述数组的形式
  // //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  // verifyPass(value, item) {
  //   if( /^[\S]{6,12}$/.test(value) ) {
  //     return '密码必须6到12位，且不能出现空格'
  //   }
  // }
}
</script>
<style scoped >
  body{
    /*background: url("~@/assets/images/login-bg.jpg") no-repeat center fixed;*/
    background-size: cover;
  }
  .layui-form-item{
    margin-left:150px;
    margin-top:50px;
  }
  .layui-form-btn{
    margin-left:300px;
    margin-top:50px;
  }
  .layui-input{
    width:40%;
  }
  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .bg-white{
    background-color: #ffffff;
    /*opacity: 0.9;*/
  }
  .middle-box{
    max-width: 800px;
    z-index: 100;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  .loginscreen .middle-box{
    width: 1300px;
  }
  .login-top{
    background-color: #06675e;
    height: 7px;
    width:700px;
  }
  .login-title{
    height:120px;
    padding-top:80px;
    padding-left: 840px;
    padding-bottom: 10px;
    font-weight:bold;
  }
  .login-header{
    height:165px;
  }
  .login-logo{
    margin-top:40px;
  }
  .login-logo-zh,
  .login-logo-en{
    font-weight:bold;
    color:#3b3127;
  }
  .login-logo-zh{
    font-size:45px;
    font-family:"宋体";
  }
  .login-logo-en{
    font-size:21px;
    font-family:"Helvetica";
  }
  .middle-box{
  .el-input {
    display: inline-block;
  }
  .el-button {
    display: inline-block;
    width:100%;
  }
  .el-input__inner {
    text-align: center;
  }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 2px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
</style>
