<!-- eslint-disable max-len -->
<template>
  <div>
    <h1>"Best of" lists</h1>
    Discover here which events, DJs and venues have received the best feedbacks <b>on average</b>.
    <div class="row mt-3">
      <div class="col-md-4">
        <h2 class="text-center w-100">Best <b>Events</b></h2>
        <ol class="list-group list-group-numbered mt-3 mb-3">
          <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(item, index) in events"
            :key="index">
            {{ item.name }}
            <span class="badge bg-secondary rounded-pill">
              <span v-if="item.mean">{{ item.mean }}</span>
              <span v-else>No</span>
              <vue-feather type="star" size="11" stroke="yellow" fill="white"></vue-feather>
            </span>
          </li>
        </ol>
      </div>
      <div class="col-md-4">
        <h2 class="text-center w-100">Best <b>DJs</b></h2>
        <ol class="list-group list-group-numbered mt-3 mb-3">
          <li class="list-group-item d-flex justify-content-between align-items-start"
            v-for="(item, index) in sortByMean(djs)" :key="index">
            {{ item.name }}
            <span class="badge bg-secondary rounded-pill">
              <span v-if="item.mean > 0.0">{{ item.mean }}</span>
              <span v-else>No</span>
              <vue-feather type="star" size="11" stroke="yellow" fill="white"></vue-feather>
            </span>
          </li>
        </ol>
      </div>
      <div class="col-md-4">
        <h2 class="text-center w-100">Best <b>Venues</b></h2>
        <ol class="list-group list-group-numbered mt-3 mb-3">
          <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(item, index) in venues"
            :key="index">
            {{ item.name }}
            <span class="badge bg-secondary rounded-pill">
              <span v-if="item.mean">{{ item.mean }}</span>
              <span v-else>No</span>
              <vue-feather type="star" size="11" stroke="yellow" fill="white"></vue-feather>
            </span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
  
<script>
import DJ from "../models/DJ";
import Venue from "../models/Venue";
import Event from "../models/Event";
import Feedback from "../models/Feedback";

export default {
  name: "nav-bar",
  data() {
    return {
      events: [],
      djs: [],
      venues: [],
      feedbacks: [],
    };
  },
  methods: {
    sortByMean(arr) {
      return arr.sort((x, y) => y.mean - x.mean);
    }
  },
  mounted() {
    Feedback.getAll().get().then((qS) => {
      qS.docs.map((doc) => this.feedbacks.push(Feedback.fromFirestore(doc)));
    });
    let prepare = function (Model, Array, Collection, Feedbacks) {
      Model.getAll().get().then((qS) => {
        qS.docs.map((doc) => {
          let item = Model.fromFirestore(doc);
          let feedbacks = Feedbacks
            .filter(f => f.collection === Collection && f.document === item.id);
          if (feedbacks.length > 0) {
            item.mean = feedbacks
              .reduce((prev, f) => prev + f.stars, 0) / feedbacks.length;
            item.mean = item.mean.toFixed(1);
          } else item.mean = 0;
          Array.push(item);
        });
      });
    };
    prepare(Event, this.events, "events", this.feedbacks);
    prepare(DJ, this.djs, "djs", this.feedbacks);
    prepare(Venue, this.venues, "venues", this.feedbacks);
  }
};

</script>
  
<style scoped></style>