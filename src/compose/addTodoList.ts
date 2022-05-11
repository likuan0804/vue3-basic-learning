 export default function addTodo () {

  const addTodoListRealy = (todoList: any, todoText: string) => {
      // 然后是增加list
    // 如果input内容为空则不继续执行
    if(!todoText) return;
    // 将input的内容添加到todoList
    todoList.unshift({
      title: todoText,
      is_completed: false,
      is_top: false
    });
    console.log(todoList)
    // 添加完成后，清空todoText的值
    // 插入后排序

  }
  return  {
    addTodoListRealy
  }
  
 }