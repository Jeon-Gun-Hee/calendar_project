<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">My Calendar App</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/calendar">Calendar</b-nav-item>
          <b-nav-item to="/mypage">My Page</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="isAuthenticated" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
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
    }
  },
  watch: {
    '$route'() {
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
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
</style>
