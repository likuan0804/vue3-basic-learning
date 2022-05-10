<template>
  <div class="menu">
    <div style="color:green">
      <a-button @click="jumpFather" >跳转到ToDoList</a-button>
    </div>
    <Son ref="son"/>
    <button @click="change">增加子元素的count</button>
    <div style="color:red">
      <a-button @click="check">Open Modal</a-button>
      <teleport to='body'>
        <div v-show="visible" class="modal">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      </teleport>
    </div>
  </div>
    
</template>

<script setup>
import { ref, getCurrentInstance, reactive, readonly, isProxy, watchEffect, toRaw, isReactive, shallowReactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {Button as AButton, Modal as AModal } from 'ant-design-vue'
import Son from './son.vue'
console.log(getCurrentInstance())

  const router = useRouter()
  const value = ref<Number>(30);
  const visible = ref(false)
  const jumpFather = () => {
    router.go(-1)
  }
  const son = ref(null)
  const check = () => {
    visible.value = !visible.value
  }
  const change = () => {
    son.value.increment()
    //子元素暴露出来的increament
  }


//响应性基础API

//reactive
        const count = ref(1)
        const obj = reactive({ count })
        console.log(obj)
        
        // ref 会被解包
        console.log('reative中传入ref的值，自动解包',obj.count === count.value) // true

        // 它会更新 `obj.count`
        count.value++
        console.log(count.value) // 2
        console.log(obj.count) // 2

        // 它也会更新 `count` ref
        obj.count++
        console.log(obj.count) // 3
        console.log(count.value) // 3

// readonly
        const original = reactive({ count: 0 })

        const copy = readonly(original)

      //立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
        watchEffect(() => {
          // 用于响应性追踪
          console.log('跟踪', copy.count)
        })

        // 变更 original 会触发依赖于副本的侦听器
        original.count++
        // 变更副本将失败并导致警告
        copy.count++ // 警告!

// isProxy
  //检查对象是否是由 reactive 或 readonly 创建的 proxy
    console.log('isproxy', isProxy(original))
    console.log('isproxy', isProxy(copy))
    
// isReactive检查是否是reactive创建的代理，isReadonly，

// toRaw 

    const foo = {}
    const reactiveFoo = reactive(foo)
    const refFoo = ref(foo)

    console.log('toRaw',toRaw(reactiveFoo) === foo) // true
    console.log('toRaw',toRaw(refFoo) === foo) // false


//markRaw标记不能被响应式化

// shallowReactive 创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (暴露原始值)。
    const state = shallowReactive({
      foo: 1,
      nested: {
        bar: 2
      }
    })

    // 改变 state 本身的性质是响应式的
    state.foo++
    console.log('shallowReactive  obj' ,isReactive(state)) // true
    console.log('shallowReactive  obj.a' ,isReactive(state.foo)) // false
    console.log('shallowReactive  obj.a == 1' ,state.foo) // 2
    console.log('shallowReactive  obj.a.b' ,isReactive(state.nested)) // false
    
    
    // ...但是不转换嵌套对象
    state.nested.bar++ // 非响应式
</script>

<style scoped lang="scss">

</style>

