<template>
  <div class="container mt-5 pt-5">
    <div class="banner-container">
      <img src="@/assets/banner.jpg" alt="Banner Image" class="banner-image">
    </div>
    <div class="welcomecontainer" v-if="isAuthenticated">
      <h1>환영합니다.</h1>
      <h2>{{ username }}님, 오늘도 좋은 하루 보내세요~</h2>
    </div>
    <div class="logincontainer" v-else>
      <h2>로그인</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">아이디</label>
          <input type="text" class="form-control" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" class="form-control" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary">로그인하기</button>
      </form>
      <div v-if="loginError" class="alert alert-danger mt-3">{{ loginError }}</div>
      <div class="mt-3">
        <router-link to="/register" class="btn btn-secondary">회원가입</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loginError: null,
      isAuthenticated: false
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
          localStorage.setItem('username', this.username);
          localStorage.setItem('userId', data.userId); // userId 저장
          this.isAuthenticated = true;
          alert('로그인되었습니다.');
          setTimeout(() => {
            this.$router.push({ name: 'CalendarPage' });
          }, 2000);
        } else {
          alert('아이디 비밀번호를 잘못 입력하셨습니다.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in');
      }
    },
    checkAuthentication() {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (isAuthenticated) {
        this.isAuthenticated = true;
        this.username = localStorage.getItem('username');
      }
    }
  },
  mounted() {
    this.checkAuthentication();
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
.banner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.banner-image {
  width: 500px;
  height: 300px;
  object-fit: cover;
}

.logincontainer {
    width: 30%;
    margin: auto;
}

.welcomecontainer {
    text-align: center;
}
</style>
