<template>
  <button
    @click="onClick"
    :disabled="disabled"
    class="begin-btn"
    :style="backgroundColor + textColor + calculatedPadding"
  >
    {{ text }}
  </button>
</template>

<script src="./js/button.js"></script>

<style>
button {
  border-radius: 20px;
  width: 10vw;
  border: none;
  text-align: center;
  padding: 10px 20px;
  margin: 20px 0;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

button:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px;
  transform: translateY(-2px);
}
</style>
