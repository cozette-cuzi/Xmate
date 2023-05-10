<template>
  <div>
    <loading-component :value="loading"></loading-component>
    <v-card>
      <v-layout row wrap class="pa-10 m-10">
        <v-flex xs10>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0 primary--text">{{ group.name }} Group</h3>
              <div> {{ group.description }}</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs2>
          <v-card-title primary-title>
          <v-btn v-if="!group.joined" @click="joinGroup(group.id)">Join</v-btn>
          <v-btn v-else disabled>Joined!</v-btn>
          </v-card-title>
        </v-flex>
        <v-flex xs12 class="mr-3 ml-3 mb-3">
          <v-textarea outline class="pa-0 mb-1" textarea rows="5" label="What Are You Looking For?" v-model="newPost.content"></v-textarea>
          <v-btn style="margin-top: -15px" color="secondary" @click="post()">Post</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <div class="mt-3">
      <posts :filter="filter" ref="Posts"></posts>

    </div>
  </div>
</template>

<script>
import LoadingComponent from "../components/LoadingComponent";
import Posts from "../components/Posts";

export default {
  name: "Group",
  components: {
    LoadingComponent,
    Posts
  },
  data() {
    return {
      loading: false,
      group: null,
      newPost: {group_id: this.$route.params.id, content: null},
      filter: {
        type: 'groups',
        group_id: this.$route.params.id
      }
    }
  },
  mounted() {
    this.fetchGroup();
  },
  methods: {
    fetchGroup() {
      this.axios.get(this.api.ACTIONS.GROUP(this.$route.params.id))
          .then(
              ({data}) => {
                this.group = data.data;
                let userGroupsIds = this.$store.state.user.groups.map(userGroup => userGroup.id);
                this.group.joined = userGroupsIds.includes(this.group.id);
                this.loading = false;
              }
          )
          .catch(
              () => this.$router.push({name: "NotFound"})
          )
    },
    joinGroup(id) {
      this.loading2 = true;
      this.axios.post(this.api.ACTIONS.JOIN_GROUP(id)).then(
          () => {
            window.getApp.$emit('SHOW_TOAST', 'Joined!', 'success');
          }
      ).catch(
          x => {
            window.getApp.$emit('SHOW_TOAST', 'Something Went Wrong', 'red');
          }
      ).finally(
          () => this.loading2 = false
      )
    },
    rerender(){
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.$nextTick(() => {
        })
      })
    },
    post() {
      this.axios.post(this.api.ACTIONS.POSTS, this.newPost).then(
          () => {
            this.$refs.Posts.fetchPosts();
            this.newPost.content = null;
            window.getApp.$emit('SHOW_TOAST', 'Posted!', 'success');
          }
      ).catch(
          x => {
            message = x.response.data.message;
            window.getApp.$emit('SHOW_TOAST', message, 'red');
          }
      ).finally(
          () => this.loading2 = false
      )
    }

  }
}
</script>

<style scoped>

</style>