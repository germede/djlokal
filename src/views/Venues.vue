<!-- eslint-disable max-len -->
<template>
  <div class="row">
    <div class="col-md-3">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h1>
          <vue-feather type="list"></vue-feather>
          Venues
        </h1>
        <div class="btn-toolbar">
          <button class="btn btn-success" @click="addItem()">
            <vue-feather type="plus" size="11"></vue-feather>
            Add
          </button>
        </div>
      </div>
      <ul class="list-group mt-3 mb-3">
        <li class="list-group-item d-flex justify-content-between align-items-start "
          :class="{ active: index == currentIndex }" v-for="(venue, index) in items" :key="index"
          @click="setActive(venue, index)">
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ venue.name }}</div>
            {{ venue.address }}
          </div>
          <span class="badge bg-secondary rounded-pill">
            <vue-feather type="users" size="11"></vue-feather>
            {{ venue.capacity }}
          </span>
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentItem">
        <venue-item :venue="currentItem" @refreshList="refreshList" />
      </div>
      <div v-else>
        <div class="alert alert-warning" role="alert">
          Please click on a Venue or create a new one...
        </div>
      </div>
    </div>
    <div class="col-md-3" v-if="currentItem">
      <feedbacks collection="venues" :document="currentItem" />
    </div>
  </div>
</template>

<script>
import Venue from "../models/Venue";
import VenueItem from "./Venue";
import Feedbacks from "./Feedbacks";

export default {
  name: "venue-list",
  components: { VenueItem, Feedbacks },
  data() {
    return {
      items: [],
      currentItem: null,
      currentIndex: -1,
      unsubscribe: null
    };
  },
  methods: {
    onDataChange(items) {
      let _items = [];
      items.forEach((item) => {
        _items.push(Venue.fromFirestore(item));
      });
      this.items = _items;
    },

    refreshList() {
      this.currentItem = null;
      this.currentIndex = -1;
    },

    addItem() {
      this.currentItem = {
        name: "",
        address: "",
        capacity: "",
        contact: "",
      };
      this.currentIndex = -1;
    },

    setActive(item, index) {
      if (this.currentIndex === index) {
        this.refreshList();
      } else {
        this.currentItem = item;
        this.currentIndex = index;
      }
    },
  },
  mounted() {
    this.unsubscribe = Venue
      .getAll().orderBy("name", "asc").onSnapshot(this.onDataChange);
  },
  beforeUnmount() {
    this.unsubscribe();
  }
};
</script>

<style></style>
