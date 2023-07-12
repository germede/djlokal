<!-- eslint-disable max-len -->
<template>
  <div v-if="currentEvent">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
      <h2 v-if="currentEvent.id">
        <vue-feather type="edit"></vue-feather>
        Edit "{{ currentEvent.name }}"
      </h2>
      <h2 v-else>
        <vue-feather type="plus-square"></vue-feather>
        Create Event
      </h2>
      <div class="btn-toolbar">
        <div class="btn-group">
          <button v-if="currentEvent.id" class="btn btn-outline-danger" @click="deleteEvent">
            <vue-feather type="trash" size="11"></vue-feather>
            Delete
          </button>
          <button class="btn btn-secondary" @click="this.$emit('refreshList')">
            <vue-feather type="delete" size="11"></vue-feather>
            Cancel
          </button>
        </div>
      </div>
    </div>
    <form @submit.prevent="updateEvent">
      <div class="form-floating mt-3">
        <input class="form-control" v-model="currentEvent.name" id="name" placeholder="Name">
        <label for="name">Name</label>
      </div>
      <div class="mt-3">
        <select class="form-select" v-model="currentEvent.genres" id="genres" size="22" multiple>
          <option disabled value="">Select one or more genres</option>
          <option v-for="(genre, index) in genres" :key="index" :value="index">{{ genre }}</option>
        </select>
      </div>
      <div class="form-floating mt-3">
        <input class="form-control" v-model="currentEvent.date" id="date" placeholder="Date" type="date">
        <label for="date">Date</label>
      </div>
      <div class="form-floating mt-3">
        <input class="form-control" v-model="currentEvent.time" id="time" placeholder="Time" type="time">
        <label for="time">Time</label>
      </div>
      <div class="form-floating mt-3">
        <select class="form-select" v-model="currentEvent.venue" id="venue">
          <option disabled value="">Select one</option>
          <option v-for="(venue) in venues" :key="venue.id" :value="venue.id">{{ venue.name }}</option>
        </select>
        <label for="venue">Venue</label>
      </div>
      <div class="mt-3">
        <select class="form-select" v-model="currentEvent.djs" id="djs" multiple>
          <option disabled value="">Select one or more DJs</option>
          <option v-for="(dj) in djs" :key="dj.id" :value="dj.id">{{ dj.name }}</option>
        </select>
      </div>
      <hr>
      <button class="btn btn-primary btn-lg w-100">
        <vue-feather type="save" size="16"></vue-feather>
        Submit
      </button>
    </form>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <div class="alert alert-secondary" role="alert">
      Please click on a Event or create a new one...
    </div>
  </div>
</template>

<script>
import Event from "../models/Event";
import GenreEL from "../models/Genre";
import Venue from "../models/Venue";
import DJ from "../models/DJ";

export default {
  name: "event-item",
  props: ["event"],
  data() {
    return {
      currentEvent: null,
      message: "",
      venues: [],
      djs: [],
    };
  },
  watch: {
    event: function (event) {
      this.currentEvent = { ...event };
      this.message = "";
    },
  },
  methods: {
    async updateEvent() {
      const data = {
        name: this.currentEvent.name,
        genres: this.currentEvent.genres,
        date: this.currentEvent.date,
        time: this.currentEvent.time,
        venue: this.currentEvent.venue,
        djs: this.currentEvent.djs,
      };
      try {
        if (!this.currentEvent.id) {
          await Event.create(data)
            .then(() => {
              console.log("The event was created successfully!");
              this.$emit("refreshList");
            });
        } else {
          await Event.update(this.currentEvent.id, data)
            .then(() => {
              this.message = "The event was updated successfully!";
            });
        }
      } catch (e) {
        this.message = e;
        console.log(e);
      }
    },

    deleteEvent() {
      Event.delete(this.currentEvent.id)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          this.message = e;
          console.error(e);
        });
    },
  },
  async mounted() {
    this.message = "";
    this.currentEvent = { ...this.event };
    this.genres = GenreEL;
    this.unsubscribeVenues = Venue
      .getAll().orderBy("name", "asc").onSnapshot(items => {
        let _items = [];
        items.forEach((item) => {
          let id = item.id;
          let data = item.data();
          _items.push({
            id: id,
            name: data.name,
          });
        });
        this.venues = _items;
      });
    this.unsubscribeDJs = DJ
      .getAll().orderBy("name", "asc").onSnapshot(items => {
        let _items = [];
        items.forEach((item) => {
          let id = item.id;
          let data = item.data();
          _items.push({
            id: id,
            name: data.name,
          });
        });
        this.djs = _items;
      });
  },
  beforeUnmount() {
    this.unsubscribeVenues();
    this.unsubscribeDJs();
  }
};
</script>

<style></style>
