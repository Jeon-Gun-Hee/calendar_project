<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a class="navbar-brand" href="#">My Calendar</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/calendar">Calendar</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/mypage">My Page</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
body {
  padding-top: 56px;
}
.mt-5 {
  margin-top: 70px;
}
</style>
