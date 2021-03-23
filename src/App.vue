<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div id="app">
    <h3>前端SKU实现</h3>
    <div v-for="(item, index) in specList" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="spec">
        <div v-for="(its, ins) in item.list" :key="its.name + ins" class="spec-item">
          <span
            :class="[selectSpec[item.title] === its.name ? 'active' : '', its.able ? '' : 'disabled']"
            @click="changeSpec(item.title, its.name, its.able)"
            >{{ its.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { listData, ListDataI, selectI } from './data'
import { isAble } from './utils'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    // 选择数据的对象 将已选的数据放在这个对象里面记录下来  用对象的好处在下面深拷贝处就能体验到了
    const selectSpec = reactive({} as selectI)
    listData.forEach((item) => {
      selectSpec[item.title] = ''
    })
    // 选项数据
    const specList = reactive([] as ListDataI[])
    listData.forEach((item) => {
      specList.push({
        title: item.title,
        list: item.list.map((its) => {
          return {
            name: its,
            // 判断是否可以选择
            able: isAble(item.title, its, selectSpec) // 注释的调试看逻辑代码 false
          }
        })
      })
    })

    console.log('selectSpec:', selectSpec)
    console.log('specList:', specList)

    // 点击事件
    function changeSpec(key: string, value: string, able: boolean) {
      if (!able) return
      if (selectSpec[key] === value) {
        selectSpec[key] = ''
      } else {
        selectSpec[key] = value
      }
      // forEach循环改变原数组
      specList.forEach((item) => {
        item.list.forEach((its) => {
          its.able = isAble(item.title, its.name, selectSpec)
          console.log(its.name, its.able)
        })
      })
    }
    return {
      selectSpec,
      specList,
      changeSpec
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  line-height: 40px;
}
.spec-item {
  display: inline-block;
  margin-right: 10px;
}
.spec-item span {
  border: 1px solid #eee;
  cursor: pointer;
  padding: 5px 10px;
}
.spec-item .active {
  border: 1px solid pink;
  background-color: pink;
  color: #fff;
}
.spec-item .disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
</style>
