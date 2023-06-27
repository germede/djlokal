<!-- eslint-disable max-len -->
<template>
  <div class="text-danger" id="message">
  </div>
  <div class="row mt-3">
    <div class="col-md-6 border p-3 bg-light">
      Either
      <h2>sign <b>in</b></h2>
      using an existing account:
      <form @submit.prevent="signIn">
        <div class="form-floating mt-3">
          <input class="form-control" type="email" id="email" name="email" placeholder="Email Address">
          <label for="email">Email</label>
        </div>
        <div class="form-floating mt-3">
          <input class="form-control" type="password" id="password" name="password" placeholder="Password">
          <label for="password">Password</label>
        </div>
        <a href="#" @click="forgotPassword" class="mt-3">Forgot your password?</a>
        <button class="btn btn-primary btn-lg mt-3 w-100" type="submit">
          <vue-feather type="log-in" size="16"></vue-feather>
          Sign in
        </button>
      </form>
    </div>
    <div class="col-md-6 border p-3 bg-light">
      or
      <h2>sign <b>up</b></h2>
      creating a new account:
      <form @submit.prevent="signUp">
        <div class="form-floating mt-3">
          <input class="form-control" type="email" id="email2" name="email" placeholder="Email Address">
          <label for="email2">Email</label>
        </div>
        <div class="form-floating mt-3">
          <input class="form-control" type="password" id="password2" name="password" placeholder="At least 6 characters">
          <label for="password2">Password</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="terms">
          <label class="form-check-label" for="terms">I accept the <a href="/">terms and conditions</a></label>
        </div>
        <button class="btn btn-primary btn-lg mt-3 w-100" type="submit">
          <vue-feather type="edit" size="16"></vue-feather>
          Sign up
        </button>
      </form>
    </div>
  </div>
</template>
  
<script>
import { auth } from "../firebase.js";

export default {
  name: "sign-in",
  methods: {
    async signIn(e) {
      const form = e.target.elements,
        email = form.email.value,
        password = form.password.value;
      if (email && password) {
        try {
          await auth.signInWithEmailAndPassword(email, password);
          window.location.pathname = "/";
        } catch (e) {
          alert(e.message);
        }
      }
    },
    async signUp(e) {
      const form = e.target.elements,
        email = form.email.value,
        password = form.password.value;
      if (email && password) {
        try {
          const user =
            await auth.createUserWithEmailAndPassword(email, password);
          await user.user.sendEmailVerification();
          alert(`Account created ${email}, check your email for instructions.`);
          window.location.pathname = "/";
        } catch (e) {
          alert(e.message);
        }
      }
    },
    async forgotPassword() {
      const email = prompt(
        "Provide the email you want the password changed for"
      );
      if (email) {
        try {
          await auth.sendPasswordResetEmail(email);
          alert(`Check your email "${email} to choose a new password.`);
          window.location.pathname = "/";
        } catch (e) {
          alert(e.message);
        }
      }
    },
  },
};
</script>
  
<style></style>