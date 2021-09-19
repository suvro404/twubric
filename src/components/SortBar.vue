<template>
  <div>
    <div class="overline">Sort By Criteria</div>
    <v-toolbar class="sort-bar">
      <v-row align="center" justify="center">
        <v-btn v-for="(sc, index) in sortCriteria" :key="index"
               class="sort-btn" v-bind="size"
               @click="setSortCriteria(sc.name)"
        >
          {{sc.name}}
          <v-icon right color="blue" v-if="sc.desc">mdi-arrow-up-bold</v-icon>
          <v-icon right color="blue" v-if="sc.asc">mdi-arrow-down-bold</v-icon>
        </v-btn>
      </v-row>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "SortBar",
  computed: {
    size () {
      const size = {xs:'x-small',sm:'small',lg:'large',xl:'x-large'}[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {}
    },
    sortCriteria() {
      return this.$store.state.sortCriteria;
    }
  },
  methods: {
    setSortCriteria(cName) {
      this.$store.commit("setSortCriteria", cName);
    }
  }
}
</script>

<style scoped>
.sort-bar {
  width: fit-content !important;
  background: #2f3245 !important;
  border-radius: 10px !important;
  margin: 0 auto !important;
}
.sort-btn {
  background: #231E39 !important;
  color: #9DA1B6 !important;
  margin: 5px;
}

@media only screen and (max-width: 600px) {
  .sort-bar {
    padding: 10px !important;
    height: fit-content !important;
  }
  .sort-btn {
    margin: 5px 20px;
  }
}
</style>