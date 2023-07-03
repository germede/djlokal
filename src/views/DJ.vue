<!-- eslint-disable max-len -->
<template>
  <div v-if="currentDJ">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
      <h2 v-if="currentDJ.id">
        <vue-feather type="edit"></vue-feather>
        Edit "{{ currentDJ.name }}"
      </h2>
      <h2 v-else>
        <vue-feather type="plus-square"></vue-feather>
        Create DJ
      </h2>
      <div class="btn-toolbar">
        <div class="btn-group">
          <button v-if="currentDJ.id" class="btn btn-outline-danger" @click="deleteDJ">
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
    <form @submit.prevent="updateDJ">
      <div class="form-floating mt-3">
        <input class="form-control" v-model="currentDJ.name" id="name" placeholder="Name">
        <label for="name">Name</label>
      </div>
      <div class="form-floating mt-3">
        <select class="form-select" v-model="currentDJ.genre" id="genre">
          <option disabled value="">Select one</option>
          <option v-for="(genre, index) in genres" :key="index" :value="index">{{ genre }}</option>
        </select>
        <label for="genre">Genre</label>
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
      Please click on a DJ or create a new one...
    </div>
  </div>
</template>

<script>
import DJ from "../models/DJ";
import GenreEL from "../models/Genre";

export default {
  name: "dj-item",
  props: ["dj"],
  data() {
    return {
      currentDJ: null,
      message: "",
    };
  },
  watch: {
    dj: function (dj) {
      this.currentDJ = { ...dj };
      this.message = "";
    },
  },
  methods: {
    async updateDJ() {
      const data = {
        name: this.currentDJ.name,
        genre: this.currentDJ.genre,
      };
      try {
        if (!this.currentDJ.id) {
          await DJ.create(data)
            .then(() => {
              console.log("The dj was created successfully!");
              this.$emit("refreshList");
            });
        } else {
          await DJ.update(this.currentDJ.id, data)
            .then(() => {
              this.message = "The dj was updated successfully!";
            });
        }
      } catch (e) {
        this.message = e;
        console.log(e);
      }
    },

    deleteDJ() {
      DJ.delete(this.currentDJ.id)
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
    this.currentDJ = { ...this.dj };
    this.genres = GenreEL;
  },
};
</script>

<style></style>
