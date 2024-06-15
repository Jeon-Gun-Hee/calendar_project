<template>
  <div class="container mt-5 pt-5">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <div v-if="loginError" class="alert alert-danger mt-3">{{ loginError }}</div>
    <div class="mt-3">
      <router-link to="/register" class="btn btn-secondary">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loginError: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('isAuthenticated', 'true');
          this.$router.push({ name: 'CalendarPage' });
        } else {
          this.loginError = 'Invalid username or password';
        }
      } catch (error) {
        console.error('Error logging in:', error);
        this.loginError = 'An error occurred while logging in';
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
