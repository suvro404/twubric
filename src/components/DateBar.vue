<template>
  <div>
    <div class="overline">
      Find By Date
      <v-tooltip top color="orange" class="black--text">
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="orange" small v-bind="attrs" v-on="on">
            mdi-alert-circle-outline
          </v-icon>
        </template>
        <span class="black--text" style="font-weight: 500">
          Date range between which your followers joined Twitter
        </span>
      </v-tooltip>
    </div>
    <v-toolbar class="sort-bar">
      <v-row align="center" justify="center">
        <v-btn class="sort-btn" v-bind="size" @click="showDatePicker('startDate')">
          <span class="date-caption">From:</span>
          {{getFormattedDate(dateRangeForSorting.startDate)}}
        </v-btn>
        <v-btn class="sort-btn" v-bind="size" @click="showDatePicker('endDate')">
          <span class="date-caption">To:</span>
          {{getFormattedDate(dateRangeForSorting.endDate)}}
        </v-btn>
      </v-row>
    </v-toolbar>
    <v-overlay :value="showStartDatePicker">
      <v-date-picker v-model="startDate"
                     @input="setDateRange('startDate')"
                     v-click-outside="closeDatePicker"
      ></v-date-picker>
    </v-overlay>
    <v-overlay :value="showEndDatePicker">
      <v-date-picker v-model="endDate"
                     @input="setDateRange('endDate')"
                     v-click-outside="closeDatePicker"
      ></v-date-picker>
    </v-overlay>
  </div>
</template>

<script>
import basicMixins from "@/mixins/basicMixins";

export default {
  name: "DateBar",
  data() {
    return {
      showStartDatePicker: false,
      showEndDatePicker: false
    }
  },
  computed: {
    size () {
      const size = {xs:'x-small',sm:'small',lg:'large',xl:'x-large'}[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {}
    },
    dateRangeForSorting() {
      return this.$store.state.dateRangeForSorting;
    },
    startDate: {
      get() {
        return (new Date(this.getFormattedDate(this.dateRangeForSorting.startDate))).toISOString().substr(0, 10);
      },
      set(val) {
        this.$store.commit("setDateRangeForSorting", {date: this.getTimeInSeconds(val), name: 'startDate'});
      }
    },
    endDate: {
      get() {
        return (new Date(this.getFormattedDate(this.dateRangeForSorting.endDate))).toISOString().substr(0, 10);
      },
      set(val) {
        this.$store.commit("setDateRangeForSorting", {date: this.getTimeInSeconds(val), name: 'endDate'});
      }
    }
  },
  mixins: [basicMixins],
  methods: {
    showDatePicker(name) {
      if(name == 'startDate') {
        this.showStartDatePicker = !this.showStartDatePicker;
        this.showEndDatePicker = false;
      } else {
        this.showStartDatePicker = false;
        this.showEndDatePicker = !this.showEndDatePicker;
      }
    },
    setDateRange(name) {
      name == 'startDate' ? this.$store.commit("setDateRangeForSorting", {date: (this.getTimeInSeconds(this.startDate)+86400), name: name}):
          this.$store.commit("setDateRangeForSorting", {date: (this.getTimeInSeconds(this.endDate)+86400), name: name});

      this.closeDatePicker();
    },
    closeDatePicker() {
      this.showStartDatePicker = false;
      this.showEndDatePicker = false;
    },
    getTimeInSeconds(date) {
      return ((new Date(date).getTime())/1000);
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

.date-caption {
  color: #2196F3;
  font-weight: bold;
  margin-right: 5px;
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