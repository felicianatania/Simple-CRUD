<template>
  <div class="dropdown">
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="select-dropdown"
    >
      <option disabled value="">Choose Category</option>
      <option v-for="category in options" :value="category.name">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<!-- <select class="" v-model="categoryInput">
    <option>Choose Category</option>
    <option v-for="category in categoryList" v-bind:value="category.name">
      {{ category.name }}
    </option>
  </select> -->

<!-- <select class="" v-model="item.categoryName">
    <option selected>Choose Category</option>
    <option
      v-for="category in categoryList"
      :key="category.id"
      :value="category.name"
    >
      {{ category.name }}
    </option>
  </select> -->

<script>
export default {
  props: {
    value: null,
    options: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: String,
      // default: '',
      required: true,
    },
    categoryId: {
      type: String,
      required: true
    },
  },

  data() {
    return {
      categoryInput: null,
    };
  },

  mounted() {
    if (this.categoryId) {
      const selectedCategory = this.options.find(category => category.id === this.categoryId);
      this.$emit('update:modelValue', selectedCategory.name);
    }
  },

  // watch: {
  //     value: function (newValue) {
  //     this.categoryInput = newValue;
  //     },
  // },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 200px;
  margin-top: 15px;
}

.select-dropdown {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px; /* Remove default appearance */
}

.select-dropdown:focus {
  outline: none; /* Remove focus outline */
}

.select-dropdown::after {
  content: "\25BC"; /* Unicode for down arrow */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none; /* Ensure the arrow doesn't interfere with clicking */
}

/* Style the options */
.select-dropdown option {
  padding: 8px;
  background-color: #fff;
  color: #333;
}
</style>
