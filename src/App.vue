<template>
  <nav-bar />
  <main id="app">
    <div class="container mt-3">
      <router-view />
    </div>
  </main>
</template>

<script>
import NavBar from "./views/_NavBar.vue";
export default {
  name: "app",
  components: { NavBar },
};
</script>

<style>
</style>