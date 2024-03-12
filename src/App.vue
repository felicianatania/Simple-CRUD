<template>
  <div class="container">
    <img src="../blibli.png" alt="" />
    <h1 class="title-page">Create Your Blog</h1>
    <div class="box">
      <InputField label="Title" inputId="title" v-model="titleInput" />
      <!-- <p>{{ titleInput }}</p> -->
      <InputField label="Description" inputId="desc" v-model="descInput" />
      <select class="" v-model="categoryInput">
        <option>Choose Category</option>
        <option v-for="category in categoryList" v-bind:value="category.name">
          {{ category.name }}
        </option>
      </select>
      <p v-if="isError" class="error">{{ this.error }}</p>
      <ButtonComponent
        bg-color="#00A36C"
        padding="10px 20px"
        text="Add"
        @click="handleAddToList(titleInput, descInput, categoryInput)"
      ></ButtonComponent>
    </div>
  </div>

  <div class="container">
    <select class="" v-model="sortInput">
      <option selected>Choose Category</option>
      <option
        v-for="category in categoryList"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <button @click="sortPostsByCategory(sortInput)">Sort</button>
  </div>

  <div>
    <div v-if="blogList.length === 0">
      <p>No posts to display.</p>
    </div>
    <div v-else class="card-container">
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
          <div v-if="!item.editing">{{ item.categoryId }}</div>
          <div v-else>
            <select class="" v-model="item.categoryName">
              <option selected>Choose Category</option>
              <option
                v-for="category in categoryList"
                :key="category.id"
                :value="category.name"
              >
                {{ category.name }}
              </option>
            </select>
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
            @click="deleteBlog(item.id)"
          ></ButtonComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "./components/Button.vue";
import InputField from "./components/Input.vue";
import { useBlogStore } from "./stores/blog.js";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      titleInput: "",
      descInput: "",
      categoryInput: "",
      sortInput: 0,
      selected: "Choose Category",
    };
  },
  computed: {
    ...mapState(useBlogStore, ["blogList", "error", "categoryList"]),
    isError() {
      return this.error !== "";
    },
  },
  components: {
    ButtonComponent,
    InputField,
  },
  methods: {
    ...mapActions(useBlogStore, [
      "fetchCategoryList",
      "fetchBlogList",
      "addToList",
      "toggleEdit",
      "deleteBlog",
      "sortPostsByCategory",
    ]),
    handleAddToList(titleInput, descInput, categoryInput) {
      this.addToList(titleInput, descInput, categoryInput)
        .then(() => {
          this.clearInput(); // Call the clearInputFields action after successful addition
        })
        .catch((error) => {
          console.error("Failed to add item:", error);
          // Handle the error if necessary
        });
    },
    clearInput() {
      this.titleInput = "";
      this.descInput = "";
      this.categoryInput = "";
    },
  },
  created() {
    this.fetchCategoryList();
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
  background: url(/b7.jpg) center / cover no-repeat fixed;
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
  width: 97%;
  margin-top: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  font-size: 14px;
}
</style>
