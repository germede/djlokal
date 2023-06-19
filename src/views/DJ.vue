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
          <button class="btn btn-outline-danger" @click="deleteDJ">
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
    <form>
      <div class="form-floating mt-3">
        <input class="form-control" v-model="currentDJ.name" placeholder="Name">
        <label for="name">Name</label>
      </div>
    </form>
    <hr>
    <button class="btn btn-primary btn-lg w-100" @click="updateDJ">
      <vue-feather type="save" size="16"></vue-feather>
      Submit
    </button>
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
    updateDJ() {
      const data = {
        name: this.currentDJ.name,
      };
      if (!this.currentDJ.id) {
        DJ.create(data)
          .then(() => {
            console.log("The dj was created successfully!");
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        DJ.update(this.currentDJ.id, data)
          .then(() => {
            this.message = "The dj was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },

    deleteDJ() {
      DJ.delete(this.currentDJ.id)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentDJ = { ...this.dj };
  },
};
</script>

<style></style>
