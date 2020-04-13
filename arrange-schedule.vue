<template>
  <q-layout view="lHh LpR fFf">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="left" side="left" bordered :width="260">
      <div class="row">
        <div class="col-6">
          <draggableC
            v-for="(everydaySite, key) in EverydaySites"
            :key="key"
            :date="everydaySite.id"
            :dateKey="key"
            :everydaySite="everydaySite"
          ></draggableC>
        </div>
      </div>
    </q-drawer>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  data() {
    return {
      enabled: true,
    };
  },
  components: {
    draggableC: () => import("components/drag/draggableC.vue"),
  },
  computed: {
    ...mapGetters("travel", ["everydaySites"]),
    EverydaySites: {
      get() {
        return this.everydaySites;
      },
      set(value) {
        this.setDragkey(value);
      },
    },
  },
  methods: {
    ...mapActions("travel", ["setDragkey"]),
  },
};
</script>
<style lang="stylus">
.weekday {
        min-width: 350px;
        height: 35px;
        // cursor: pointer;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 20px;
        //border:2px #54a9a9 dashed;
        border-width: 2px 7px 5px 7px;
        border-bottom-color: #400080;
        border-style: solid dotted;

    }
</style>
