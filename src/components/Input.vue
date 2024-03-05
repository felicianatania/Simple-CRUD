<template>
  <div class="input-card">
    <label for="inputId" class="input-label">{{ label }}</label>
    <input
      :id="inputId"
      class="input-field"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script src="./js/input.js"></script>

<style>
input {
  border: none;
  font-size: 16px;
  height: 26px;
  color: #ffffff;
  background: 0;
  padding: 0;
  border-bottom: 1px solid white;
  color: white;
  width: 40vw;
}

.input-label {
  display: block;
  margin-bottom: 10px;
  margin-top: 20px;
  color: #333;
  color: white;
  font-weight: 500;
}
/* 
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
} */

.input-field:focus {
  outline: none;
  border-bottom-color: #2f3337;
  box-shadow: 0 0 1px rgba(37, 39, 42, 0.5);
}
</style>
