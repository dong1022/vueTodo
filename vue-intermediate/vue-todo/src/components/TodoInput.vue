<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>

    <Modal v-if="showModal" @close="showModal = false">
    <!--
      you can use custom content here to overwrite
      default content
    -->
    <h3 slot="header">
      경고(Warning)
      <i class="fas fa-times closeModalBtn" @click="closeModal"></i>
    </h3>
    <div slot="body">입력한 값이 없습니다 값을 입력 후 저장버튼을 클릭하세요</div>
    <div slot="footer">copy Right</div>
  </Modal>
  </div>
</template>

<script>
import Modal from './common/Modal.vue'

export default {
  data: function() {
    return {
      newTodoItem: '',
      showModal : false
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== '') {
        this.$store.commit('todoItem',this.newTodoItem)
        //this.$emit('todoItem', this.newTodoItem)
        this.clearInput();
      }else{
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoItem = '';
    },
    closeModal(){
      this.showModal = false
    }
  },
  components : {
    Modal : Modal
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn{
  color : #42b983;
}
</style>