<!-- AlertComponent.vue -->
<template>
    <div v-if="visible" :class="`alert alert-${type}`" role="alert">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        type: 'success'
      };
    },
    methods: {
      show(message, type = 'success') {
        this.message = message;
        this.type = type;
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 2000);
      }
    }
  };
  </script>
  
  <style>
  .alert {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050;
  }
  </style>
  