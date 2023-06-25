<template>
  <nav-bar :signedIn="signedIn" @signOut="signedIn = false" />
  <main id="app">
    <div class="container mt-3">
      <router-view/>
    </div>
  </main>
</template>

<script>
import { auth } from "./firebase.js";

import NavBar from "./views/_NavBar.vue";
export default {
  name: "app",
  components: { NavBar },
  data() {
    return {
      signedIn: false
    };
  },
  beforeMount() {
    const currentPage = window.location.pathname,
      startPage = ["/"],
      authorizedPages = startPage.concat(["/djs","/sign-in"]);
    try {
      let _this = this;
      auth.onAuthStateChanged(async function (user) {
        if (user) {
          if (user.isAnonymous) {
            // if user is not authorized to current page, 
            // restrict access & redirect to sign up page
            if (!authorizedPages.includes(currentPage)) {
              window.location.pathname = "/sign-in";
            } else {
              _this.signedIn = false;
            }
          } else {
            if (!user.emailVerified) {
              // if user is not authorized to current page, 
              // restrict access & redirect to start page
              if (!authorizedPages.includes(currentPage)) {
                window.location.pathname = "/";
              } else {
                _this.signedIn = true;
              }
              console.log(`Authenticated as ${user.email} with unverified email`);
            } else {
              // if current page is start page,
              // grant access to the four database operations
              if (startPage.includes(currentPage)) {
                // declare variables for accessing UI elements
                // const clearDataBtn = document.getElementById("clearData"),
                //   generateDataBtns = document.querySelectorAll(".generateTestData"),
                //   disabledEls = document.querySelectorAll(".disabled");
                // // perform DOM operations to enable menu items
                // for (const el of disabledEls) el.classList.remove("disabled");
                // clearDataBtn.disabled = false;
                // for (const btn of generateDataBtns) btn.disabled = false;
              }
              _this.signedIn = true;
              console.log(`Authenticated as ${user.email} with verified email`);
            }
          }
        } else {
          // otherwise, upgrade to "anonymous"
          auth.signInAnonymously();
        }
      });
    } catch (e) {
      console.error(`Error with user authentication: ${e}`);
    }
  }
};
</script>

<style></style>