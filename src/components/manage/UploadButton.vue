<template>
  <div class="layui-upload">
    <button type="button" class="layui-btn" :name="name"><i class="layui-icon"> </i>{{title}}</button>
    <div class="layui-upload-list">
      <img v-if="name === 'img'" class="layui-upload-img" id="img" :src="url" style="width:10%" >
      <p :id="name+'Text'"></p>
      <p :id="name+'Url'" @click="changeUrl" style="border: 0;margin-top: 10px;background: none;"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: [String],
      default () {
        return ''
      }
    },
    title: {
      type: [String],
      default () {
        return ''
      }
    },
    url: {
      type: [String],
      default () {
        return ''
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    changeUrl ($event) {
      this.$emit('changeUrl', $event.target.innerHTML)
    }
  }
}
</script>
