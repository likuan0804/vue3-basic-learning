const { handleError } = require("vue")

/**
 * vue3响应式数据的本质，通过proxy代理
 * vue 2通过definePrototype来说实现数据的响应式的
 */
// let obj = {name:'lisi', age: 18}
//可数组可对象
// let state = new Proxy(obj, {
//   get(obj, key) {
//     return obj[key]
//   },
//   set(obj, key, newValue) {
//     obj[key] = newValue
//     return true
//   }
// })
// state.name = '王五'
let arr = [0, 1, 2]
let state = new Proxy(arr, {
    get(obj, key) {
      return obj[key]
    },
    set(obj, key, newValue) {
      //  [0, 1, 2] '3' 3
      //  [0, 1, 2, 3] '4' 4
      //  [0, 1, 2, 3, 4] 'length' 5
      console.log(obj, key, newValue)
      obj[key] = newValue
      return true// 本次成功执行下一次操作
    }
  })
  state.push(3, 4)
