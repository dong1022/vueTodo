<template>
  <div id="app">
      <transition-group name="list" tag="ul">
        <li v-for=" (todoItem,index) in this.$store.state.todoItems" v-bind:key="todoItem.item" class="shadow">
          <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted:todoItem.completed}" v-on:click="itemCompleted(todoItem,index)"></i>
          <span v-bind:class="{textCompleted:todoItem.completed}">{{todoItem.item}}</span>
          <span class="removeBtn" v-on:click="removeItem(todoItem.item, index)">
            <i class="removeBtn fas fa-trash-alt"></i>
          </span>
        </li>
      </transition-group>
  </div>
</template>

<script>

export default {
  methods : {
    removeItem : function(key, index){
      const removeObj = {keyValue : key,indexValue : index}
      //this.$emit('removeItem',removeObj)
      this.$store.commit('removeItem',removeObj)
      //console.log("removeIndex : ",index)
      //localStorage.removeItem(key)
    },
    itemCompleted : function(key, index){
      const itemStatus = {keyValue : key,indexValue : index}
      //this.$emit('itemCompleted', completeStatus)
      this.$store.commit('completeStatus',itemStatus)
    }
  },
  props:['propsData']
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background : white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad
}
.textCompleted {
  text-decoration: line-through;
  color : #b3adad
}
.removeBtn {
  margin-left: auto;
  color:#de4343
}

/* 리스트 트렌지션 */

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>