<template>
  <div>
    <p>{{test}}</p>
    <button @click="clickb">test</button>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data () {
    return {
      test: 'hello world',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    clickb () {
      this.$store.dispatch('login')
    }
  }
}
</script>
