import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
    fetch(){
        const arr = [];
        if(localStorage.length>0){
            for(let i=0; i < localStorage.length; i++){
              if(localStorage.key(i)!=='loglevel:webpack-dev-server'){
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
              }
            }
        }
        return arr
    }
}

export const store = new Vuex.Store({
    //
    state: {
        todoItems : storage.fetch()
    },
    getters: {
        storedTodoItems(state){
            return state.todoItems
        }
    },
    mutations: {
        todoItem : function(state, todoItem){
            const todoObj = { completed : false, item : todoItem}
            localStorage.setItem(todoItem, JSON.stringify(todoObj))
            state.todoItems.push(todoObj)
        },
        removeItem : function(state, removeItem){
            localStorage.removeItem(removeItem.todoItem.item)
            state.todoItems.splice(removeItem.index, 1)
        },
        completeStatus : function(state, itemstat){
            const chgCompleted = itemstat.todoItem.completed = !itemstat.todoItem.completed
            const updateItem = {
              completed : chgCompleted,
              item : itemstat.todoItem.item
            }
            localStorage.removeItem(itemstat.todoItem.item)
            localStorage.setItem(itemstat.todoItem.item, JSON.stringify(updateItem))
        },
        clearItem : function(state){
            localStorage.clear();
            state.todoItems = []
        }
    }
})