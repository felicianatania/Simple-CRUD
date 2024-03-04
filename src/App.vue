<template>
  <div class="container">
    <img src="../public/blibli.png" alt="" />
    <h1 class="title-page">Create Your Blog</h1>
    <div class="box">
      <InputField label="Title" inputId="title" v-model="titleInput" />
      <!-- <p>{{ titleInput }}</p> -->
      <InputField label="Description" inputId="desc" v-model="descInput" />
      <ButtonComponent
        bg-color="#00A36C"
        padding="10px 20px"
        text="Add"
        @click="addToList()"
      ></ButtonComponent>
    </div>
  </div>
  <div class="card-container">
    <div v-for="(item, index) in toDoList" :key="index" class="card">
      <div class="card-body">
        <h2 v-if="!item.editing">{{ item.title }}</h2>
        <div v-else>
          <input type="text" v-model="item.title" class="edit-input" />
        </div>
        <div v-if="!item.editing">{{ item.desc }}</div>
        <div v-else>
          <input type="text" v-model="item.desc" class="edit-input" />
        </div>
      </div>
      <!-- <div>{{ index + 1 }}</div> -->
      <div class="action">
        <ButtonComponent
          padding="10px 20px"
          text="Edit"
          @click="toggleEdit(item)"
        ></ButtonComponent>
        <ButtonComponent
          bg-color="#FF6961"
          padding="10px 20px"
          text="Delete"
          @click="deleteItem(item.id)"
        ></ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "./components/Button.vue";
import InputField from "./components/Input.vue";

export default {
  data() {
    return {
      titleInput: "",
      descInput: "",
      toDoList: [],
    };
  },
  computed: {},
  components: {
    ButtonComponent,
    InputField,
  },
  methods: {
    addToList() {
      // console.log("Title Input:", this.titleInput);
      // console.log("Desc Input:", this.descInput);
      fetch("api/todo", {
        method: "POST",
        body: {
          title: this.titleInput,
          desc: this.descInput,
        },
      })
        .then((res) => res.json())
        .then((body) => {
          alert(body.status);
          this.fetchToDoList();
          this.titleInput = "";
          this.descInput = "";
        });
    },
    toggleEdit(item) {
      item.editing = !item.editing;
      const itemToEdit = this.toDoList.find((item) => item.id === id);
      if (!itemToEdit) {
        alert("Item not found.");
        return;
      }

      this.newItem.title = itemToEdit.title;
      this.newItem.desc = itemToEdit.desc;

      this.updateItem(id, {
        title: this.newItem.title,
        desc: this.newItem.desc,
      });
    },
    updateItem(id, updatedData) {
      fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.status);
          this.fetchToDoList();
        });
    },
    deleteItem(id) {
      fetch(`/api/todo/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.status);
          this.fetchToDoList();
        });
    },
    fetchToDoList() {
      this.toDoList = [];
      fetch(`/api/todo`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((body) => {
          console.log(body);
          this.toDoList = body.data; //this refers ke yg ada di data, bisa computed dll.
        });
    },
  },
  created() {
    this.fetchToDoList();
    console.log("print");
  },
};
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
}

.container > img{
  width: 10vw;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  width: 50vw;
}

.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
  width: 25vw;
  margin: 10px;
  background-image: linear-gradient(-70deg, #b1b2cb, transparent 50%);
  padding: 15px;
  /* background: rgba(255, 255, 255, 0.25); */
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.card:hover {
  transform: scale(1.05) rotate(1deg);
  transition-duration: 1s;
}

.card:nth-child(2n) {
  background-image: linear-gradient(-250deg, #97cee8, transparent 50%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.action {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.edit-input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  font-size: 14px;
}
</style>
