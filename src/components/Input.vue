<template>
  <div class="input">
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
.input-container {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  margin-bottom: 10px;
  margin-top: 20px;
  color: #333;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
