<template>
  <div>
    <nav class="navbar navbar-expand-lg custom-navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">작심삼일</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/calendar" class="nav-link">Calendar</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/mypage" class="nav-link">My Page</router-link>
            </li>
            <li class="nav-item ms-auto" v-if="isAuthenticated">
              <a href="#" class="nav-link" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view @update-auth-status="checkAuthentication" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true'
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      this.isAuthenticated = false;
      this.$router.push({ name: 'HomePage' });
      this.$emit('update-auth-status');
      location.reload(); // 페이지 새로고침
    },
    checkAuthentication() {
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    }
  },
  watch: {
    '$route'() {
      this.checkAuthentication();
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.custom-navbar {
  background-color: #d3d3d3 !important; /* 회색 */
}

.nav-item .nav-link {
  transition: background-color 0.3s, box-shadow 0.3s;
}

.nav-item .nav-link:hover {
  background-color: #87ceeb !important; /* 하늘색 */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
