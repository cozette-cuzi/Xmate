<template>
  <div>
    <loading-component :value="loading"/>
    <loading-component :value="loading2"/>
    <div v-if="!loading">
      <v-layout class="pa-0" row wrap>
        <v-flex xs5 v-for="(group,index) in groups" :key="index" class="mr-4 mb-4">
          <v-card style="padding: 20px">
            <v-card-title primary-title>
              <h2 class="headline mb-0 primary--text">{{ group.name }} Group:</h2>
              <v-spacer></v-spacer>
              <h3>{{ group.description }}</h3>

            </v-card-title>
            <v-card-actions>
              <v-btn v-if="!group.joined" small outlined color="secondary" @click="joinGroup(group.id, index)">Join
              </v-btn>
              <v-btn flat color="accent" @click="visitGroup(index)">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent";
import Posts from "../components/Posts";

export default {
  name: "Groups",
  components: {
    LoadingComponent,
    Posts
  },
  data() {
    return {
      groups: null,
      userGroups: this.$store.state.user.groups,
      loading: true,
      loading2: false,
    };
  },
  mounted() {
    this.fetchGroups();
  },
  methods: {
    fetchGroups() {
      this.axios.get(this.api.ACTIONS.GROUPS, {
        params: {
          page_size: 100,
          page: 1
        }
      }).then(
          res => {
            this.groups = res.data.data.groups;
            let userGroupsIds = this.userGroups.map(userGroup => userGroup.id);
            this.groups.map((group) => group.joined = userGroupsIds.includes(group.id))
            this.loading = false;
          }
      ).catch(
          x => {
            this.error = x.response.data.message;
          }
      ).finally(
          () => this.loading = false
      )
    },
    joinGroup(id, index) {
      this.loading2 = true;
      this.axios.post(this.api.ACTIONS.JOIN_GROUP(id)).then(
          () => {
            this.groups[index].joined = true;
            window.getApp.$emit('SHOW_TOAST', 'Joined!', 'success');
          }
      ).catch(
          x => {
            message = x.response.data.message;
            window.getApp.$emit('SHOW_TOAST', message, 'red');
          }
      ).finally(
          () => this.loading2 = false
      )
    },
    visitGroup(index) {
      let group = this.groups[index]
      this.$router.push({
        name: "Group",
        params: {id: group.id, name: group.name, joined: group.joined}
      })
    }
  }
}
</script>

<style scoped>

</style>