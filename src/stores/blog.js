import { defineStore } from "pinia";
import BlogDataService from "../services/dataService"

export const useBlogStore = defineStore("blog", {
    state: () => ({
        titleInput: "",
        descInput: "",
        error: "",
        editingItemId: null,
        blogList: [],
        categoryList: []
    }),
    getters: {
        isError: (state) => state.error !== "",
    },
    actions: {
        // isError() {
        //     return this.error === "" ? false : true;
        // },
        fetchCategoryList() {
            this.categoryList = [];
            return fetch(`http://localhost:8080/api/categories`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((body) => {
                // console.log(body);
                this.categoryList = body.data;
            });
        },
        fetchBlogList() {
            this.blogList = [];
            return fetch(`http://localhost:8080/api/posts`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((body) => {
                console.log(body);
                this.blogList = body.data;
            });
            // BlogDataService.getAll()
            // .then(res => {
            //     console.log(res.data)
            //     this.blogList = res.data;
            //     console.log(this.blogList)
            // })
        },
        addToList(titleInput, descInput, categoryInput) {
            return fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleInput,
                body: descInput,
                categoryName: categoryInput,
            }),
        })
            .then((res) => res.json())
            .then((body) => {
            if (body.code !== 200) {
                this.error = body.error;
            } else {
                // console.log(body)
                alert(body.status);
                console.log(categoryInput)
                this.error = "";
                // this.titleInput = "";
                // this.descInput = "";
            }
            this.fetchBlogList();
            })
            .catch((error) => {
                console.error("Error updating item:", error);
                alert("Failed to add item: " + error.message);
            });
        },
        toggleEdit(item) {
            if (this.editingItemId !== null && this.editingItemId !== item.id) {
                return;
            }
            item.editing = !item.editing;
            this.editingItemId = item.editing ? item.id : null;
            if (!item.editing) {
                this.updateBlog(item);
            }
        },
        updateBlog(item) {
            return fetch(`http://localhost:8080/api/posts/${item.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: item.title,
                    body: item.body,
                    categoryName: item.categoryName,
                }),
            })
            .then((res) => res.json())
            .then((body) => {
            item.editing = !item.editing;
            if (body.code !== 200) {
                alert(body.error);
            } else {
                this.fetchBlogList();
            }
            })
            .catch((error) => {
                console.error("Error updating item:", error);
            });
        },
        deleteBlog(id) {
            return fetch(`http://localhost:8080/api/posts/${id}`, {
                method: "DELETE",
            })
            // .then((res) => res.json())
            .then(() => {
                this.fetchBlogList();
            });
            // BlogDataService.delete(id)
            // .then(response => {
            //     console.log(response.data);
            //     this.fetchBlogList();
            // })
            // .catch(e => {
            //     console.log(e);
            // });
        },
        sortPostsByCategory(id) {
            if (id === 0){
                this.fetchBlogList(); 
            } else{
                this.blogList = [];
                return fetch(`http://localhost:8080/api/posts/categories/${id}`, {
                    method: "GET",
                })
                .then((res) => res.json())
                .then((body) => {
                    console.log(body);
                    this.blogList = body.data;
                });
            }
        },
    },
});
