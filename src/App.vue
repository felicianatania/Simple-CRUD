<template>
  <div class="container">
    <img src="../blibli.png" alt="" />
    <h1 class="title-page">Create Your Blog</h1>
    <div class="box">
      <InputField label="Title" inputId="title" v-model="titleInput" />
      <!-- <p>{{ titleInput }}</p> -->
      <InputField label="Description" inputId="desc" v-model="descInput" />
      <p v-if="isError" class="error">{{ this.error }}</p>
      <ButtonComponent
        bg-color="#00A36C"
        padding="10px 20px"
        text="Add"
        @click="addToList()"
      ></ButtonComponent>
    </div>
  </div>
  <div class="card-container">
    <!-- <div v-for="(item, index) in blogList.posts" :key="index" class="card"> -->
    <div v-for="item in blogList" :key="item.id" class="card">
      <div class="card-body">
        <h2 v-if="!item.editing">{{ item.title }}</h2>
        <div v-else>
          <input type="text" v-model="item.title" class="edit-input" />
        </div>
        <div v-if="!item.editing">{{ item.body }}</div>
        <div v-else>
          <input type="text" v-model="item.body" class="edit-input" />
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
      error: "",
      blogList: [],
    };
  },
  computed: {
    isError() {
      return this.error === "" ? false : true;
    },
  },
  components: {
    ButtonComponent,
    InputField,
  },
  methods: {
    fetchBlogList() {
      this.blogList = [];
      fetch(`http://localhost:8080/api/posts`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((body) => {
          console.log(body);
          this.blogList = body.data;
          // console.log("loh:" + this.blogList.length)
        });
    },
    addToList() {
      fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.titleInput,
          body: this.descInput,
        }),
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.code !== 200) {
            this.error = body.error;
          } else {
            // console.log(body)
            alert(body.status);
            this.error = "";
            this.titleInput = "";
            this.descInput = "";
          }
          this.fetchBlogList();
        })
        .catch((error) => {
          console.error("Error updating item:", error);
          alert("Failed to add item: " + error.message);
        });
    },
    toggleEdit(item) {
      item.editing = !item.editing;
      if (!item.editing) {
        this.updateItem(item);
      }
    },
    updateItem(item) {
      fetch(`http://localhost:8080/api/posts/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          body: item.body,
        }),
      })
        .then((res) => res.json())
        .then((body) => {
          item.editing = !item.editing;
          if (body.code !== 200) {
            alert(body.error)
          } else{
            this.fetchBlogList();
          }
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    },
    deleteItem(id) {
      fetch(`http://localhost:8080/api/posts/${id}`, {
        method: "DELETE",
      })
        // .then((res) => res.json())
        .then(() => {
          this.fetchBlogList();
        });
    },
  },
  created() {
    this.fetchBlogList();
  },
};
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  padding: 0;
  /* background-color: #f5f5f5; */
  background-color: rgb(22, 20, 20);
  color: #e8e2e2;
  background:
    url(/b7.jpg)
    center / cover no-repeat fixed;
  backdrop-filter: blur(3px);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
}

.container > img {
  width: 10vw;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  width: 50vw;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.25);
  padding: 20px 30px 30px 30px;
  overflow: hidden;
}

.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.error {
  color: red;
}

.card {
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
  width: 25vw;
  margin: 10px;
  /* background-image: linear-gradient(-70deg, #b1b2cb, transparent 50%); */
  background: linear-gradient(71deg, #080509, #241e29, #080509);
  padding: 15px;
  /* background: rgba(255, 255, 255, 0.25); */
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(35px);
  /* border: 1px solid rgba(255, 255, 255, 0.4); */
  border: 2px solid transparent;
}

.card:hover {
  transform: scale(1.05);
  transition-duration: 1s;
}

.card:nth-child(2n) {
  background-image: linear-gradient(-250deg, #97cee8, transparent 50%);
  background: linear-gradient(71deg, #080509, #0a1925, #080509);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  /* border: 1px solid rgba(255, 255, 255, 0.4); */
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  border: 2px solid transparent;
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
