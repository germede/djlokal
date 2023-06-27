<template>
  <nav-bar :signedIn="signedIn" @signOut="signedIn = false" />
  <main id="app">
    <div class="container mt-3">
      <router-view :signedIn="signedIn" />
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
  async mounted() {
    const urlParams = new URLSearchParams(location.search);
    const actionCode = urlParams.get("oobCode");
    // handle firebase action for email verification
    if (urlParams.get("mode") === "verifyEmail") {
      try {
        await auth.verifyPasswordResetCode(actionCode);
        await auth.applyActionCode(actionCode);
        alert("Your email address has been verified");
      } catch (e) {
        alert(e.message);
      }
    }
    // handle firebase action for password resetting
    if (urlParams.get("mode") === "resetPassword") {
      try {
        const email = await auth.verifyPasswordResetCode(actionCode);
        let password = prompt("Choose a new password", "");
        await auth.confirmPasswordReset(actionCode, password);
        alert("Your password has been updated!");
        await auth.signInWithEmailAndPassword(email, password);
      } catch (e) {
        alert(e.message);
      }
    }

    // handle authentication status
    const currentPage = window.location.pathname,
      startPage = ["/"],
      authorizedPages = startPage.concat(["/djs", "/sign-in"]);
    try {
      let _this = this;
      await auth.onAuthStateChanged(async function (user) {
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
              console.log(
                `Authenticated as ${user.email} with unverified email`
              );
            } else {
              // grant access to all operations
              _this.signedIn = true;
              console.log(
                `Authenticated as ${user.email} with verified email`
              );
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