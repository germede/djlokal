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
import Event from "../models/Event";
import DJ from "../models/DJ";
import Venue from "../models/Venue";
import Feedback from "../models/Feedback";

export default {
  name: "nav-bar",
  props: {
    signedIn: Boolean
  },
  methods: {
    generateTestData() {

      const generate = function (collection, model) {
        fetch(`/testdata/${collection}.json`)
          .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.json();
          })
          .then(json => {
            json.forEach(e => {
              model.create(e);
              const nrOfFeedbacks = Math.floor(Math.random() * 6);
              for (let i = 0; i < nrOfFeedbacks; i++) {
                const nrOfStars = Math.floor(Math.random() * 5) + 1;
                const comment = nrOfStars === 5 ? "Fantastic" :
                  nrOfStars === 1 ? "Terrible" : "";
                Feedback.create({
                  collection: collection,
                  document: e.name,
                  stars: nrOfStars,
                  comment: comment
                });
              }
              console.log(
                `${nrOfFeedbacks} random feedbacks were created for ${e.name}`
              );
            });
            alert(`${json.length} ${collection} were successfully created`);
          })
          .catch(function (e) {
            this.dataError = true;
            alert(e);
          });
      };
      generate("djs", DJ);
      generate("venues", Venue);
      generate("events", Event);
    },
    clearAllData() {
      Event.getAll().get().then(res => res.forEach(e => e.ref.delete()));
      DJ.getAll().get().then(res => res.forEach(e => e.ref.delete()));
      Venue.getAll().get().then(res => res.forEach(e => e.ref.delete()));
      Feedback.getAll().get().then(res => res.forEach(e => e.ref.delete()));
      alert("All data was successfully deleted");
    },
  },
};
</script>
  
<style scoped></style>