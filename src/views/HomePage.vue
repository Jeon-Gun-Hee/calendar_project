<template>
  <div class="container mt-5 pt-5 d-flex justify-content-center align-items-start">
    <div class="form-container">
      <form @submit.prevent="login" class="text-center">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" v-model="username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="submit" class="btn btn-primary">Login</button>
          <button type="button" class="btn btn-secondary" @click="goToRegister">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    goToRegister() {
      this.$router.push({ name: 'Register' });
    },
    login() {
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Login successful!');
          } else {
            alert('Incorrect username or password.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
}
</script>

<style>
body {
  padding-top: 56px;
}
.container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: calc(100vh - 56px);
  padding-top: 20px; /* 메뉴바와의 간격 조정 */
}
.form-container {
  position: relative;
  top: 0; /* 메뉴바와의 간격을 없애고 싶으면 이 값을 조정하세요 */
}
.form-group label {
  display: block;
  text-align: center;
}
form {
  width: 300px;
}
.btn-group {
  display: flex;
  justify-content: center;
}
</style>
