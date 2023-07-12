<!-- eslint-disable max-len -->
<template>
  <div v-if="currentVenue">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
      <h2 v-if="currentVenue.id">
        <vue-feather type="edit"></vue-feather>
        Edit "{{ currentVenue.name }}"
      </h2>
      <h2 v-else>
        <vue-feather type="plus-square"></vue-feather>
        Create Venue
      </h2>
      <div class="btn-toolbar">
        <div class="btn-group">
          <button v-if="currentVenue.id" class="btn btn-outline-danger" @click="deleteVenue">
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
    <form @submit.prevent="updateVenue">
      <div class="form-floating mt-3">
        <input class="form-control" v-model="currentVenue.name" id="name" placeholder="Name">
        <label for="name">Name</label>
      </div>
      <div class="form-floating mt-3">
        <input class="form-control" v-model="currentVenue.address" id="address" placeholder="Address">
        <label for="address">Address</label>
      </div>
      <div class="form-floating mt-3">
        <input class="form-control" v-model="currentVenue.capacity" id="capacity" placeholder="Capacity" type="number">
        <label for="capacity">Capacity</label>
      </div>
      <div class="form-floating mt-3">
        <input class="form-control" v-model="currentVenue.contact" id="contact" placeholder="Contact" type="email">
        <label for="contact">Contact</label>
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
      Please click on a Venue or create a new one...
    </div>
  </div>
</template>

<script>
import Venue from "../models/Venue";

export default {
  name: "venue-item",
  props: ["venue"],
  data() {
    return {
      currentVenue: null,
      message: "",
    };
  },
  watch: {
    venue: function (venue) {
      this.currentVenue = { ...venue };
      this.message = "";
    },
  },
  methods: {
    async updateVenue() {
      const data = {
        name: this.currentVenue.name,
        address: this.currentVenue.address,
        capacity: this.currentVenue.capacity,
        contact: this.currentVenue.contact,
      };
      try {
        if (!this.currentVenue.id) {
          await Venue.create(data)
            .then(() => {
              console.log("The venue was created successfully!");
              this.$emit("refreshList");
            });
        } else {
          await Venue.update(this.currentVenue.id, data)
            .then(() => {
              this.message = "The venue was updated successfully!";
            });
        }
      } catch (e) {
        this.message = e;
        console.log(e);
      }
    },

    deleteVenue() {
      Venue.delete(this.currentVenue.id)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          this.message = e;
          console.error(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentVenue = { ...this.venue };
  },
};
</script>

<style></style>
