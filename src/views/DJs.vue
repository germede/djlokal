<template>
  <div class="row d-flex justify-content-between flex-wrap flex-md-nowrap">
    <div class="col-md-6">
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
      <ul class="list-group mt-3">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(dj, index) in items" :key="index"
          @click="setActive(dj, index)">
          {{ dj.name }}
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
  </div>
</template>

<script>
import DJ from "../models/DJ";
import DJItem from "./DJ";

export default {
  name: "dj-list",
  components: { DJItem },
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
        let id = item.id;
        let data = item.data();
        _items.push({
          id: id,
          name: data.name,
        });
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
      };
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
    this.unsubscribe = DJ
      .getAll().orderBy("name", "asc").onSnapshot(this.onDataChange);
  },
  beforeUnmount() {
    this.unsubscribe();
  }
};
</script>

<style></style>
