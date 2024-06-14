<template>
  <div class="container mt-5 pt-5">
    <div v-if="alertMessage" :class="['alert', alertClass, 'mt-3']" role="alert">
      {{ alertMessage }}
    </div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="registerData.username">
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="registerData.name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="register-email" v-model="registerData.email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="register-password" v-model="registerData.password">
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      registerData: {
        username: '',
        name: '',
        email: '',
        password: ''
      },
      alertMessage: '',
      alertClass: ''
    }
  },
  methods: {
    register() {
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.registerData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.alertClass = 'alert-primary';
            this.alertMessage = '회원가입이 완료되었습니다.';
            setTimeout(() => {
              this.$router.push({ name: 'HomePage' });
            }, 2000);
          } else {
            this.alertClass = 'alert-danger';
            this.alertMessage = '이미 등록된 회원입니다.';
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
.alert {
  margin-top: 10px;
}
</style>
