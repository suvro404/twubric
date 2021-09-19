<template>
  <div class="home pa-5">
    <v-row align="center" justify="center" class="mb-8">
      <sort-bar class="pa-3"></sort-bar>
      <date-bar class="pa-3"></date-bar>
    </v-row>
    <user-list></user-list>
  </div>
</template>

<script>
import SortBar from "@/components/SortBar";
import DateBar from "@/components/DateBar";
import UserList from "@/components/UserList";

export default {
  name: 'Home',
  components: {
    'user-list': UserList,
    'sort-bar': SortBar,
    'date-bar': DateBar
  }
}
</script>

<style scoped>

</style>
