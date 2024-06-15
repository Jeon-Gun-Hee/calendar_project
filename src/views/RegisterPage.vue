<template>
  <div class="container mt-5 pt-5">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="registerData.username" required>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="registerData.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="registerData.email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="registerData.password" required>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <div v-if="registerError" class="alert alert-danger mt-3">{{ registerError }}</div>
    <div v-if="registerSuccess" class="alert alert-success mt-3">{{ registerSuccess }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerData: {
        username: '',
        name: '',
        email: '',
        password: ''
      },
      registerError: null,
      registerSuccess: null
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.registerData)
        });
        const data = await response.json();
        if (data.success) {
          this.registerSuccess = '회원가입이 완료되었습니다.';
          this.registerError = null;
          setTimeout(() => {
            this.$router.push({ name: 'HomePage' });
          }, 2000);
        } else {
          this.registerError = data.message;
          this.registerSuccess = null;
        }
      } catch (error) {
        console.error('Error registering:', error);
        this.registerError = 'An error occurred while registering';
      }
    }
  }
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  padding-top: 56px;
}
</style>
