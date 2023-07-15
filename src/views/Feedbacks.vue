<!-- eslint-disable max-len -->
<template>
  <div v-if="currentDocument">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
      <h3>
        <vue-feather type="star"></vue-feather>
        Feedbacks
      </h3>
      <div class="btn-toolbar">
        <button v-if="currentItem.id" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
          data-bs-target="#feedbackModal">
          <vue-feather type="edit" size="10"></vue-feather>
          Edit
        </button>
        <button v-else class="btn btn-outline-success btn-sm" @click="addItem()" data-bs-toggle="modal"
          data-bs-target="#feedbackModal">
          <vue-feather type="plus" size="10"></vue-feather>
          Add
        </button>
      </div>
    </div>
    <div class="modal fade" id="feedbackModal" ref="feedbackModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="currentItem.id">Edit Feedback</h5>
            <h5 class="modal-title" v-else>Create Feedback</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="updateFeedback">
            <div class="modal-body">
              <p>What do you think about {{ currentDocument.name }}?</p>
              <div class="mt-3">
                <label for="stars" class="form-label text-center w-100">{{ currentItem.stars }} stars</label>
                <input v-model="currentItem.stars" type="range" class="form-range" min="1" max="5" id="stars">
              </div>
              <div class="form-floating mt-3">
                <textarea v-model="currentItem.comment" class="form-control" id="comment" placeholder="Name"></textarea>
                <label for="comment">Comment</label>
              </div>
            </div>
            <div class="modal-footer">
              <button v-if="currentItem.id" type="button" data-bs-dismiss="modal" class="btn btn-outline-danger"
                @click="deleteFeedback">
                <vue-feather type="trash" size="11"></vue-feather>
                Delete
              </button>
              <button data-bs-dismiss="modal" type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="items.filter(feedback => currentDocument.id == feedback.document).length > 0">
      <ul class="list-group mt-3 mb-3">
        <template v-for="(feedback, index) in items" :key="index">
          <li class="list-group-item" :class="{ active: index == currentIndex }" @click="setActive(feedback, index)"
            v-if="currentDocument.id == feedback.document">
            <span class="badge bg-secondary rounded-pill">
              <span v-for="(star, index) in feedback.stars" :key="index">
                <vue-feather type="star" size="11" stroke="yellow" fill="white"></vue-feather>
              </span>
            </span>
            <br>
            {{ feedback.comment }}
          </li>
        </template>
      </ul>
    </div>
    <div v-else>
      <div class="alert alert-secondary" role="alert">
        No feedbacks found, would you like to add one?
      </div>
    </div>
    <p>{{ message }}</p>

  </div>
</template>

<script>
import Feedback from "../models/Feedback";
import GenreEL from "../models/Genre";

export default {
  name: "feedback-list",
  props: ["collection", "document"],
  data() {
    return {
      items: [],
      currentCollection: "",
      currentDocument: null,
      currentItem: null,
      currentIndex: -1,
      message: "",
    };
  },
  watch: {
    collection: function (collection) {
      this.currentCollection = { ...collection };
    },
    document: function (document) {
      this.currentDocument = { ...document };
    },
  },
  methods: {
    onDataChange(items) {
      let _items = [];
      items.forEach((item) => {
        _items.push(Feedback.fromFirestore(item));
      });
      this.items = _items;
    },

    refreshFeedbackList() {
      this.currentItem = { id: 0 };
      this.currentIndex = -1;
    },

    addItem() {
      this.currentItem = { stars: 3, comment: "" };
      this.currentIndex = -1;
    },

    setActive(item, index) {
      if (this.currentIndex === index) {
        this.refreshFeedbackList();
      } else {
        this.currentItem = item;
        this.currentIndex = index;
      }
    },

    async updateFeedback() {
      const data = {
        collection: this.currentCollection,
        document: this.currentDocument.id,
        stars: parseInt(this.currentItem.stars),
        comment: this.currentItem.comment,
      };
      try {
        if (!this.currentItem.id) {
          await Feedback.create(data)
            .then(() => {
              this.message = "The feedback was created successfully!";
              this.$emit("refreshFeedbackList");
            });
        } else {
          await Feedback.update(this.currentItem.id, data)
            .then(() => {
              this.message = "The feedback was updated successfully!";
            });
        }
      } catch (e) {
        this.message = e;
        console.log(e);
      }
    },

    deleteFeedback() {
      Feedback.delete(this.currentItem.id)
        .then(() => {
          this.$emit("refreshFeedbackList");
          this.message = "The feedback was deleted successfully!";
        })
        .catch((e) => {
          this.message = e;
          console.error(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentCollection = this.collection;
    this.currentDocument = { ...this.document };
    this.currentItem = { stars: 3, comment: "" };
    this.genres = GenreEL;
    this.unsubscribe = Feedback.getAll()
      .where("collection", "==", this.currentCollection)
      .onSnapshot(this.onDataChange);
  },
  beforeUnmount() {
    this.unsubscribe();
  }
};
</script>

<style></style>
