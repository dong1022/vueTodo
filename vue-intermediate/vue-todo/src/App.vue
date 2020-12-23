<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-input v-on:todoItem="addTodoItem"></todo-input>
    <todo-list v-bind:propsData="todoItems" v-on:removeItem="removeTodo" v-on:itemCompleted='itemStatus'></todo-list>
    <todo-footer v-on:clearItem="deleteAll"></todo-footer>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data (){
    return{
      todoItems : []
    }
  },
  created : function(){
    if(localStorage.getItem.length>0){
      for(let i=0; i < localStorage.length; i++){
        if(localStorage.key(i)!=='loglevel:webpack-dev-server'){
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
      }
    }
  },
  methods : {
    addTodoItem : function(oneitem){
        //console.log(oneitem)
        const todoObj = { completed : false, item : oneitem}
        localStorage.setItem(oneitem, JSON.stringify(todoObj))
        this.todoItems.push(todoObj)
        console.log(this.todoItems)
    },
    removeTodo : function(obj){
      console.log("removeObj : ", obj)
      localStorage.removeItem(obj.keyValue)
      this.todoItems.splice(obj.indexValue, 1)
    },
    itemStatus : function(obj){
      const chgCompleted = obj.keyValue.completed = !obj.keyValue.completed
      const updateItem = {
        completed : chgCompleted,
        item : obj.keyValue.item
      }
      localStorage.removeItem(obj.keyValue)
      localStorage.setItem(obj.keyValue.item, JSON.stringify(updateItem))
    },
    deleteAll : function(){
      localStorage.clear()
      this.todoItems = []
    }
  },
  components : {
    'todo-header' : TodoHeader,
    'todo-input' : TodoInput,
    'todo-list' : TodoList,
    'todo-footer' : TodoFooter
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
}
</style>
