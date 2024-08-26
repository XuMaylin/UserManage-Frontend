<template>
  <div class="note-index">
    <p class="title">记事本应用</p>
    <div class="note-area">
      <div v-for="(item, index) in noteList" :key="index" class="note-card">
        <textarea class="input-area" v-model="noteList[index]" placeholder="在此输入内容" @input="setNote"></textarea>
        <button @click="deleteOneNote(index)" class="btn2">删除</button>
      </div>
    </div>
     <button @click="addNote" class="btn" style="background-color:rgb(69,185,133)">
      添加新笔记
    </button>
     <button @click="deleteAll" class="btn" style="background-color:rgb(244,69,55)">
      删除所有笔记
    </button>
  </div>
</template>

<script>
export default {
  name: 'NoteIndex',
  props: {
  },
  data() {
    return {
      noteList: [],
      text: ''
    }
  },
  methods: {
    addNote() {
      this.noteList.unshift('')
      this.setNote()
    },
    deleteOneNote(index) {
      if(confirm('是否确认删除该条记录?')) {
        this.noteList.splice(index, 1)
        this.setNote()
      }
    },
    deleteAll() {
      if(confirm('是否确认删除所有记录?')) {
        this.noteList = []
        this.setNote()
      }
    },
    setNote() {
      if(localStorage.getItem('noteList')) {
        localStorage.removeItem('noteList')
      }
      localStorage.setItem('noteList', JSON.stringify(this.noteList))
    }
  },
  mounted() {
    const list = localStorage.getItem('noteList')
    if(list) {
      this.noteList = JSON.parse(list)
    } else {
      this.noteList = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.note-index{
  width: 50vw;
  height: 84vh;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 4px 4px #b4aeae;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title{
  font-size: 36px;
  font-weight: bold;
}
.note-area{
  height: 54vh;
  width: 84%;
  overflow-y: auto;
}
.note-card{
  border: 1px solid;
  margin-bottom: 15px;
  border-radius: 8px;
  /* display: flex; */
}
.input-area{
  width: 90%;
  background-color: #f0f0f0;
  border: none;
  font-size: large;
  margin: 8px auto;
  line-height: 1.5em;
}
.btn2{
  background-color: rgb(94,105,239);
  color: white;
  border-radius: 5px;
  display: block;
  margin-bottom: 6px;
  margin-left: 5%;
  height: 30px;
}
.btn{
  margin-top: 15px;
  width: 84%;
  height: 30px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 8px;
}
</style>
