<!-- eslint-disable max-len -->
<template>
  <div class="row">
    <div class="col-md-3">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h1>
          <vue-feather type="list"></vue-feather>
          DJs
        </h1>
        <div class="btn-toolbar">
          <button class="btn btn-success" @click="addItem()">
            <vue-feather type="plus" size="11"></vue-feather>
            Add
          </button>
        </div>
      </div>
      <ul class="list-group mt-3 mb-3">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(dj, index) in items" :key="index"
          @click="setActive(dj, index)">
          {{ dj.name }}
        </li>
      </ul>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: page <= 1 }">
          <a class="page-link button" href="#" @click.prevent="setPage(page - 1)">
            <span>&laquo;</span>
          </a>
        </li>
        <template v-for="p in totalPages" :key="p">
          <li class="page-item" :class="{ active: page == p }">
            <a class="page-link button" href="#" @click.prevent="setPage(p)">{{ p }}</a>
          </li>
        </template>
        <li class="page-item" :class="{ disabled: page >= totalPages }">
          <a class="page-link button" href="#" @click.prevent="setPage(page + 1)">
            <span>&raquo;</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentItem">
        <d-j-item :dj="currentItem" @refreshList="refreshList" />
      </div>
      <div v-else>
        <div class="alert alert-warning" role="alert">
          Please click on a DJ or create a new one...
        </div>
      </div>
    </div>
    <div class="col-md-3" v-if="currentItem">
      <feedbacks collection="djs" :document="currentItem" />
    </div>
  </div>
</template>

<script>
import DJ from "../models/DJ";
import DJItem from "./DJ";
import Feedbacks from "./Feedbacks";

export default {
  name: "dj-list",
  components: { DJItem, Feedbacks },
  data() {
    return {
      allItems: [],
      items: [],
      page: 1,
      perPage: 5,
      totalPages: 0,
      loading: false,
      currentItem: null,
      currentIndex: -1,
      unsubscribe: null
    };
  },
  methods: {
    onDataChange(qS) {
      let items = [];
      qS.forEach((item) => items.push(DJ.fromFirestore(item)));
      this.allItems = items;
      this.totalPages = Math.ceil(this.allItems.length / this.perPage);
      this.refreshList();
    },

    refreshList() {
      this.currentItem = null;
      this.currentIndex = -1;
      this.items = [];
      for (
        let i = (this.page - 1) * this.perPage;
        i <= ((this.page - 1) * this.perPage + this.perPage) - 1;
        i++) {
        if (this.allItems.length > i) this.items.push(this.allItems[i]);
      }
    },

    addItem() {
      this.currentItem = DJ.empty();
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

    setPage(i) {
      if (i >= 1 && i <= this.totalPages) {
        this.page = i;
        this.refreshList();
      }
    }
  },
  mounted() {
    this.unsubscribe = DJ
      .getAll().orderBy("name", "asc").onSnapshot(this.onDataChange);
  },
  beforeUnmount() {
    this.unsubscribe();
  }
};
</script>

<style></style>
