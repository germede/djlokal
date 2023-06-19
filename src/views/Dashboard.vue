<!-- eslint-disable max-len -->
<template>
  <h1>Welcome, {Username}</h1>
  You can select an <b>item</b> from the upper navigation bar to continue or:
  <div class="row mt-3">
    <div class="col-md-6">
      <button class="btn w-100 btn-primary" @click="generateTestData">Generate test data</button>
    </div>
    <div class="col-md-6">
      <button class="btn w-100 btn-danger" @click="clearAllData">Delete <b>all!</b> data</button>
    </div>
  </div>
</template>
  
<script>
import DJ from "../models/DJ";

export default {
  name: "nav-bar",
  methods: {
    generateTestData() {
      DJ.create({ name: "Calvin Harris", genre: "ELECTRONICA" });
      DJ.create({ name: "David Guetta", genre: "COMMERCIAL_DANCE" });
      DJ.create({ name: "Martin Garrix", genre: "PROGRESSIVE_HOUSE" });
      DJ.create({ name: "Tiësto", genre: "ELECTRO_HOUSE" });
      DJ.create({ name: "Steve Aoki", genre: "HIP_HOP" });
      DJ.create({ name: "Skrillex", genre: "DUBSTEP" });
      alert("Test data was successfully created");
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