<template>
  <div class="todo-list-container" >
    <div class="todo-wrapper" >
      <input 
        class="todo-input" 
        placeholder="请输入待办项" 
        v-model="todoText"
        @keydown.enter="addTodoList"
      />
      <ul class="todo-list" >
        <li 
          v-for="(item, index) in todoList"
          class="todo-item" 
          :class="{'todo-completed': item.is_completed, 'todo-top': item.is_top}"
        >
          <span>{{item.title}}</span>
          <div class="operator-list" >
            <CheckCircleFilled v-if="item.is_completed"/>
            <ToTopOutlined v-if="!item.is_completed" @click="topTodoList(index)" />
            <DeleteOutlined v-if="!item.is_completed" @click="deleteTodoList(index)" />
            <CheckOutlined v-if="!item.is_completed" @click="completedTodoList(index)" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Input组件
import {Input} from 'ant-design-vue';
// 图标组件 
import { DeleteOutlined, CheckOutlined, CheckCircleFilled, ToTopOutlined } from "@ant-design/icons-vue";
import { ref } from 'vue'

// 声明存储数据数组
// let todoList = ref<{
//   title: string,
//   is_completed: Boolean,
//   is_top: Boolean
// }[]>([]);
// 上边采用了ts泛型结合的写法，也可以将类型分开
interface TodoType {
  title: string,
  is_completed: boolean,
  is_top: boolean
};
let todoList = ref<TodoType[]>([]);
// 这里声明一个对数组进行排序的方法，在增删改查后对list进行排序
const todoListSort = (list: TodoType[]):TodoType[] => {
  // 置顶的列表
  let topList:TodoType[] = [];
  // 完成的列表
  let completedList:TodoType[] = [];
  // 其他列表
  let otherList:TodoType[] = [];
  list.forEach(item => {
    if(item.is_top){
      topList.push(item);
    }else{
      if(item.is_completed){
        completedList.push(item);
      }else{
        otherList.push(item);
      }
    }
  });
  return [...topList, ...otherList, ...completedList];
}

// 创建一个变量，用于输入框的绑定
const todoText = ref('');
// 这里ref看似没有使用泛型，实际上是省略了，上边的等于
// const todoText = ref<string>('');

// 然后是增加list
const addTodoList = () => {
  // 如果input内容为空则不继续执行
  if(!todoText.value) return;
  // 将input的内容添加到todoList
  todoList.value.unshift({
    title: todoText.value,
    is_completed: false,
    is_top: false
  });
  // 添加完成后，清空todoText的值
  todoText.value = '';
  // 插入后排序
  todoList.value = todoListSort(todoList.value);
}

// 删除List
const deleteTodoList = (index:number) => {
  todoList.value.splice(index, 1);
}

// 完成List
const completedTodoList = (index:number) => {
  todoList.value[index].is_completed = true;
  // 修改后排序，将完成的放后边
  todoList.value = todoListSort(todoList.value);
}

// 置顶列表list
const topTodoList = (index:number) => {
  todoList.value[index].is_top = true;
  // 置顶后排序，将完成的放前边
  todoList.value = todoListSort(todoList.value);
}


</script>

<style scoped lang="less">
*{
  padding: 0;
  margin: 0;
}
.todo-list-container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 100px;
  background: linear-gradient(rgba(93, 190, 129, 0.02), rgba(125, 185, 222, 0.02));
  display: flex;
  justify-content: center;
  .todo-wrapper {
    width: 60vw;
    .todo-input {
      width: 100%;
      height: 50px;
      border: 2px solid rgba(255, 177, 27, 0.5);
      border-radius: 5px;
      padding-left: 10px;
      font-size: 18px;
      color: #f05e1c;
      &::placeholder {
        color: #f05e1c;
        opacity: 0.4;
      }
      &:hover, &:focus {
        border-color: #ffb11b;
        box-shadow: 0 0 0 2px rgba(255, 177, 27, 0.2);
        outline: none;
      }
    }
    .todo-list {
      margin-top: 20px;
      list-style: none;
      .todo-item {
        margin-bottom: 10px;
        padding: 15px 10px;
        box-sizing: border-box;
        border-bottom: 2px solid rgba(255, 177, 27, 0.3);
        border-radius: 5px;
        font-size: 16px;
        color: #f05e1c;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all .5s;
        &:hover {
          box-shadow: 0 0 5px 8px rgba(255, 177, 27, 0.2);
          border-bottom: 2px solid transparent;
        }
        // 完成列表样式
        &.todo-completed {
          color: rgba(199,199,199,1);
          border-bottom-color: rgba(199,199,199,0.4);
          &:hover {
            box-shadow: none;
            border-bottom-color: rgba(199,199,199,0.4);
          }
        }
        // 置顶列表样式
        &.todo-top {
          box-shadow: none;
          background-color: #f05e1c;
          color: #fff;
        }

        // 操作列表
        .operator-list {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          &:first-child {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
