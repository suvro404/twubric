<template>
  <v-dialog v-model="warningDialogOpened" width="500">
    <v-card v-if="user">
      <v-card-text class="pt-4 msg">
        Are you sure you want to remove <span class="user-name">{{user.fullname}}</span> from your follower list?
      </v-card-text>
      <v-divider class="mb-2"></v-divider>

      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn color="red lighten-2" class="white--text" @click="removeUser(user.uid)">
          Confirm
        </v-btn>
        <v-btn color="primary" outlined @click="closeDialog">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "WarningDialog",
  props: ['user'],
  computed: {
    warningDialogOpened: {
      get() {
        return this.$store.state.warningDialogOpened;
      },
      set(val) {
        this.$store.commit("openWarningDialog", val);
      }
    }
  },
  methods: {
    removeUser(userId) {
      this.$store.commit("removeUserFromList", userId);
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("openWarningDialog", false);
    }
  }
}
</script>

<style scoped>
  .msg {
    color: black !important;
    font-size: 1.5rem;
    line-height: 1.6;
  }
  .user-name {
    font-weight: bold;
    color: #2292EC;
  }
</style>