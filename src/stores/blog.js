import { defineStore } from "pinia";

export const useBlogStore = defineStore("blog", {
    state: () => ({
        titleInput: "",
        descInput: "",
        error: "",
        editingItemId: null,
        blogList: [],
    }),
    getters: {
        isError: (state) => state.error !== "",
    },
    actions: {
        // isError() {
        //     return this.error === "" ? false : true;
        // },
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
        },
        addToList(titleInput, descInput) {
            return fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleInput,
                body: descInput,
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
                this.updateItem(item);
            }
        },
        updateItem(item) {
            return fetch(`http://localhost:8080/api/posts/${item.id}`, {
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
                alert(body.error);
            } else {
                this.fetchBlogList();
            }
            })
            .catch((error) => {
                console.error("Error updating item:", error);
            });
        },
        deleteItem(id) {
            return fetch(`http://localhost:8080/api/posts/${id}`, {
                method: "DELETE",
            })
            // .then((res) => res.json())
            .then(() => {
                this.fetchBlogList();
            });
        },
    },
});
