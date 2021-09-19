<template>
  <div>
    <div v-if="userList.length">
      <div v-if="sortedList.length">
        <v-row>
          <v-col xs="12" sm="3" md="3" lg="3" v-for="user in sortedList" :key="user.uid"
                 class="d-flex justify-center mb-6">
            <div class="card-container pt-6 pl-3 pr-3 pb-4">
              <span class="score">{{user.twubric.total}}</span>
              <img :src="user.image" class="user-img" :alt="user.fullname" />
              <div class="mt-2 mb-5">
                <h3>{{user.fullname}}</h3>
                <p class="body-2">@{{user.username}}</p>
              </div>
              <v-row class="mb-2">
                <v-col>
                  <div>Friends</div>
                  <div>{{user.twubric.friends}}</div>
                </v-col>
                <v-col>
                  <div>Influence</div>
                  <div>{{user.twubric.influence}}</div>
                </v-col>
                <v-col>
                  <div>Chirpiness</div>
                  <div>{{user.twubric.chirpiness}}</div>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col class="caption">
                  {{getFormattedDate(user.join_date)}}
                </v-col>
                <v-col>
                  <v-btn
                      small
                      outlined
                      color="red lighten-2"
                      @click="openWarningDialog(user)"
                  >
                    Remove
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        Sorting parameters don't match any of your users.
      </div>
      <warning-dialog :user="userToRemove"></warning-dialog>
    </div>
    <div v-else>Nobody follows you on Twitter!</div>
  </div>
</template>

<script>
import basicMixins from "@/mixins/basicMixins";
import WarningDialog from "@/components/WarningDialog";

export default {
  name: "UserList",
  data() {
    return {
      userToRemove: null,
      sortedList: []
    }
  },
  created() {
    this.fetchUsers();
  },
  components: {
    'warning-dialog': WarningDialog
  },
  computed: {
    userList() {
      return this.$store.state.userList;
    },
    sortCriteria() {
      return this.$store.state.sortCriteria;
    },
    dateRangeForSorting() {
      return this.$store.state.dateRangeForSorting;
    }
  },
  mixins: [basicMixins],
  mounted() {
    this.setWatchCollection();
  },
  methods: {
    setWatchCollection() {
      this.$watch(
        (vm) => [vm.userList, vm.sortCriteria, vm.dateRangeForSorting],
        (val) => {
          this.getSortedList(this.userList);
        },
        {
          immediate: true,
          deep: true,
        }
      );
    },
    fetchUsers() {
      fetch("/users.json")
          .then(response => response.json())
          .then(json => {
            this.$store.commit("setUserList", json);
          });
    },
    openWarningDialog(user) {
      this.userToRemove = user;
      this.$store.commit("openWarningDialog", true);
    },
    getSortedList(uList) {
      this.getSortedListByCriteria(uList).then((cList) => {
        this.sortedList = this.getSortedListByDate(cList);
      });
    },
    getSortedListByCriteria(uList) {
      return new Promise((resolve, reject) => {
        let list = [...uList];
        for(let i=0; i<this.sortCriteria.length; i++) {
          if(this.sortCriteria[i].asc) {
            list.sort((a,b) => {
              return (a.twubric[this.sortCriteria[i].name] - b.twubric[this.sortCriteria[i].name]);
            });
          } else if(this.sortCriteria[i].desc) {
            list.sort((a,b) => {
              return (b.twubric[this.sortCriteria[i].name] - a.twubric[this.sortCriteria[i].name]);
            });
          }
        }
        resolve (list);
      });
    },
    getSortedListByDate(uList) {
      let startDate = this.dateRangeForSorting.startDate;
      let endDate = this.dateRangeForSorting.endDate;
      const list = uList.filter(user => user.join_date >= startDate && user.join_date <= endDate);
      return list;
    }
  }
}
</script>

<style scoped>
.card-container {
  background-color: #231E39;
  border-radius: 5px;
  box-shadow: 0px 10px 20px -10px rgba(0,0,0,0.75);
  position: relative;
}

.card-container .score {
  color: #231E39;
  background-color: #FEBB0B;
  border-radius: 3px;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 3px 7px;
  position: absolute;
  top: 30px;
  left: 30px;
}

.card-container .user-img {
  border: 1px solid #03BFCB;
  padding: 7px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>