<!-- eslint-disable max-len -->
<template>
  <div class="row">
    <div class="col card p-3 me-2 bg-light shadow-sm">
      Either
      <h2>sign <b>in</b></h2>
      using an existing account:
      <form>
        <div class="form-floating mt-3">
          <input class="form-control" type="email" required id="email" placeholder="Email Address">
          <label for="email">Email</label>
        </div>
        <div class="form-floating mt-3">
          <input class="form-control" type="password" required id="password" placeholder="Password">
          <label for="password">Password</label>
        </div>
        <a href="/" class="mt-3">Forgot your password?</a>
        <button class="btn btn-primary btn-lg mt-3 w-100" type="submit">
          <vue-feather type="log-in" size="16"></vue-feather>
          Sign in
        </button>
      </form>
    </div>
    <div class="col card p-3 ms-2 bg-light shadow-sm">
      or
      <h2>sign <b>up</b></h2>
      creating a new account:
      <form>
        <div class="form-floating mt-3">
          <input class="form-control" type="email" required id="email" placeholder="Email Address">
          <label for="email">Email</label>
        </div>
        <div class="form-floating mt-3">
          <input class="form-control" type="password" required id="password" placeholder="Password">
          <label for="password">Password</label>
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

export default {
  name: "nav-bar",
  methods: {
  },
};
</script>
  
<style scoped></style>