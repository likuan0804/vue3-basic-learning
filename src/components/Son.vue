<script >
import { h, ref } from 'vue'
export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value
    // 因为返回渲染函数，可以通过expose传值给父组件
    expose({
      increment
    })
    return () => h('div', count.value)
  }
}
//  加了script lang='ts' setup
// import {ref} from 'vue';
// let refData = ref('寒蝉鸣泣之时')
// defineExpose({
//   refData,
// })

</script>
