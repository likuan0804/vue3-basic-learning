<template>
  <div> </div>


</template>


<script setup>
/**
 *1.shallowReactive，shallowRef 非递归监听
 *shallowReadonly
 *reactive, ref 递归监听
 *readonly
 
 */
import {shallowReactive, reactive} from 'vue'
  const myShallowReactive = (obj)=>{
    return new Proxy(obj, {
        get(obj, key) {
          return obj[key]
        },
        set(obj, key, newValue) {
          obj[key] = newValue
          console.log('更新')
          return true
        }
    })
  }

  const myShallowRef = (obj)=>{
    return myShallowReactive({value: obj})
  }
    const myReactive = (obj)=>{
    if (typeof obj === 'object') {
        if(obj instanceof Array) {
          obj.forEach((item, index) => {
            if (typeof item === 'object' ) {
              obj[index] = myReactive(item)
            }
          })

        } else {
          for (let key in obj) {
            let item = obj[key]
              if (typeof item === 'object' ) {
              obj[key] = myReactive(item)
            }
          }
        }
    } else  {
      throw Error('传错了')
    }
    return new Proxy(obj, {
        get(obj, key) {
          return obj[key]
        },
        set(obj, key, newValue) {
          obj[key] = newValue
          console.log('更新')
          return true
        }
    })
  }
  const myRef = (obj) => {
    retrun myReactive({value: obj})
  }
  let obj = {
    a: 'a',
    gf:{
      b:'b',
      f:{
        c:'c',
        s:{
          d:'d'
        }
      }
    }
  }
  const myState = myShallowReactive(obj)
  const state  = shallowReactive(obj)
  // const myRea = myReactive(obj)
  const rea = reactive(obj)
  // myRea.gf.f.s.d = '6'
  // console.log('myRea', myRea)

  // myState.a = '1';
  myState.gf.b = '2';
  myState.gf.f.c = '3';
  myState.gf.f.s.d = '4';
  
  
</script>
