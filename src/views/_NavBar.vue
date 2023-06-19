<!-- eslint-disable max-len -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top py-lg-0 bg-dark shadow">
    <div class="container">
      <div class="btn-group d-block">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-bar">
          <vue-feather type="menu"></vue-feather>
        </button>
      </div>
      <router-link to="/" class="navbar-brand">
        djl<vue-feather type="disc" size="1rem"></vue-feather>kal
      </router-link>
      <div class="collapse navbar-collapse" data-bs-parent="body" id="nav-bar">
        <ul class="navbar-nav mx-auto mb-2 mb-sm-0 mt-md-1" style="overflow: auto;">
          <li class="nav-link">
            <router-link to="/calendar" class="nav-link">
              <vue-feather type="calendar" class="d-lg-block mx-auto"></vue-feather>
              Calendar
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/events" class="nav-link">
              <vue-feather type="music" class="d-lg-block mx-auto"></vue-feather>
              Events
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/djs" class="nav-link">
              <vue-feather type="users" class="d-lg-block mx-auto"></vue-feather>
              DJs
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/venues" class="nav-link">
              <vue-feather type="map-pin" class="d-lg-block mx-auto"></vue-feather>
              Venues
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/best-of" class="nav-link">
              <vue-feather type="star" class="d-lg-block mx-auto"></vue-feather>
              Best of
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-sm-0 mt-md-1" style="overflow: auto;">
          <li>
            <router-link to="/settings" class="nav-link text-secondary">
              <vue-feather type="settings" animation="spin"></vue-feather>
              Settings
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  
<script>
export default {
  name: "nav-bar"
};
</script>
  
<style scoped>
.nav-link.router-link-active {
  color: var(--bs-primary) !important;
}

.nav-link>i {
  margin-right: 4px;
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
}

.nav-link>a {
  padding: 0;
}

.navbar-brand:not(:hover)>i,
.nav-link:not(:hover):not(.router-link-active)>i {
  animation: none;
}

.navbar-brand.router-link-active {
  color: var(--bs-primary) !important;
}
.navbar-brand > i {
  -webkit-animation: rotateY 1s infinite linear;
  animation: rotateY 1s infinite linear;
}
@-webkit-keyframes rotateY {
  to { -webkit-transform: rotateY(360deg); }
}
@keyframes rotateY {
  to { transform: rotateY(360deg); }
}
</style>