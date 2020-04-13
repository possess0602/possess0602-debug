<template>
  <div>
    <div class="col-6">
      <p class="weekday">{{ date }}</p>
      <draggable
        v-model="siteGroup"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
        group="site"
      >
        <q-btn
          color="black"
          v-for="(site, key) in siteGroup"
          :key="key"
          :label="site"
          style="margin: 4px;"
          unelevated
        />
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  props: ["date", "dateKey", "everydaySite"],
  data() {
    return {
      enabled: true,
    };
  },
  components: {
    draggable,
  },
  computed: {
    siteGroup: {
      get() {
        var dateKey = this.dateKey;
        console.log("everydaySite", dateKey, this.everydaySite);
        return this.everydaySite; //這裡想要抓取 everydaySite.site 在日期間移動，不知道要怎麼抓取
      },
      set(value) {
        console.log("computed setter");
        this.$store.commit("travel/setDragGroup", {
          value,
          id: this.date,
        });
      },
    },
  },
  methods: {
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
  },
};
</script>
