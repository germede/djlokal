<!-- eslint-disable max-len -->
<template>
  <h1>Welcome</h1>
  You can select an <b>item</b> from the upper navigation bar to continue or, if authenticated:
  <div class="row mt-3">
    <div class="col-md-6">
      <button class="btn w-100 btn-primary" :disabled="!signedIn" @click="generateTestData">Generate test data</button>
    </div>
    <div class="col-md-6">
      <button class="btn w-100 btn-danger" :disabled="!signedIn" @click="clearAllData">Delete <b>all!</b> data</button>
    </div>
  </div>
</template>
  
<script>
import DJ from "../models/DJ";

export default {
  name: "nav-bar",
  props: {
    signedIn: Boolean
  },
  methods: {
    generateTestData() {
      fetch("/testdata.json")
        .then(response => {
          if (!response.ok) throw new Error("HTTP error " + response.status);
          return response.json();
        })
        .then(json => {
          json.forEach(dj => {
            DJ.create(dj);
          });
          alert(`${json.length} DJ's were successfully created`);
        })
        .catch(function (e) {
          this.dataError = true;
          alert(e);
        });
    },
    clearAllData() {
      DJ.getAll().get().then(res => {
        res.forEach(element => { element.ref.delete(); });
      });
      alert("All data was successfully deleted");
    },
  },
};
</script>
  
<style scoped></style>