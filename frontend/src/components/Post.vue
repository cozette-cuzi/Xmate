<template>
  <div >
    <v-layout class="wrap-layout mb-3">
      <v-flex xs12 m-3>
        <v-layout row wrap class="pa-1">
          <v-flex xs1>
            <div class="headline font-weight-bold">
              <router-link :to="{name: 'UserProfile', params:{id: this.post.user_id}}" style="text-decoration: none">
                <v-avatar size="100%">
                  <img :src="api.GET_IMAGE(this.post.image)" alt="Michael Wang"/>
                </v-avatar>
              </router-link>
            </div>
          </v-flex>
          <v-flex xs11 class="pl-3">
            <div>
              <v-layout row wrap class="pa-1">
                <v-flex xs11>
                  <h2 class="primary--text">
                    <router-link :to="{name: 'UserProfile', params:{id: this.post.user_id}}"
                                 style="text-decoration: none">
                      {{ this.post.user_name }}
                    </router-link>
                    <span v-if="filter !== 'group_posts'" class="black--text font-weight-light">
                      <v-icon>arrow_forward</v-icon>
                      <span class="secondary--text">{{ this.post.group_name }}</span>
                    </span>
                  </h2>
                </v-flex>
                <v-flex v-if="this.$store.state.user.id == post.user_id" xs1>
                  <v-tooltip v-if="!post.is_mated" bottom color="success">
                    <template v-slot:activator="{ on }">
                      <v-scroll-x-transition>
                        <v-icon v-if="!post.is_mated" @click="markAsMated()" v-on="on" class="animate" color="grey"
                                large>
                          check_circle_outline
                        </v-icon>
                      </v-scroll-x-transition>
                    </template>
                    <span color="green">Mark as Mated!</span>
                  </v-tooltip>
                  <v-scroll-x-transition>
                    <v-icon class="animate" v-if="post.is_mated" color="success" large>check_circle</v-icon>
                  </v-scroll-x-transition>
                </v-flex>
              </v-layout>
              <p>{{ this.post.content }}</p>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="m-8">
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs2>
                  <v-btn @click="toggleLike()" flat color="secondary">
                    <v-icon class="mr-2">thumb_up</v-icon>
                    <span v-if="!post.is_liked">Like</span>
                    <span v-else>Liked</span>
                  </v-btn>
                </v-flex>
                <v-flex xs2>
                  <v-btn @click="addComment = true" flat color="accent">
                    <v-icon class="mr-2">chat</v-icon>
                    Comment
                  </v-btn>
                </v-flex>
                <v-flex xs4></v-flex>
                <v-flex xs2 style="margin: auto; text-align: right">
                  <h3 class="post-info">{{ this.post.likes_counter }} likes</h3>
                </v-flex>
                <v-flex xs2 style="margin:auto 0; text-align: right">
                  <h3 class="mr-2 post-info">{{ this.post.comments_counter }} comments</h3>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </v-card-text>
            <div style="padding-left: 30px;">
              <h3 class="mb-3 font-weight-medium">Comments</h3>
              <div v-for="(comment, index) in post.comments" :key="index">
                <comment :data="comment"></comment>
              </div>
              <div v-if="post.comments.length== 0">
                <h3 style="color: grey" class="font-weight-light">No Comments Yet.</h3>
              </div>
              <div v-if="addComment">
                <v-textarea outline rows="1" label="Add Comment" v-model="newComment"></v-textarea>
                <v-card-actions style="margin-top: -27px;">
                  <v-btn small outlined color="accent" @click="addNewComment()">Post</v-btn>
                  <v-btn small outlined @click="addComment = false">Cancel</v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Comment from "@/components/Comment"
import LoadingComponent from "./LoadingComponent";

export default {
  name: "Post",
  components: {
    Comment
  },
  props: {
    post: Object,
    filter: Object | Array
  },
  data() {
    return {
      mated: false,
      addComment: false,
      newComment: null
    }
  },
  methods: {
    markAsMated() {
      this.mated = true;
      this.axios.post(this.api.ACTIONS.MATED_TOGGLE(this.post.id))
          .then(res => {
            this.post.is_mated = !this.post.is_mated;
            let message = (this.post.is_mated) ? 'Mated!' : 'De-mated';
            this.post.likes_counter += (this.post.is_mated) ? 1 : -1;
            window.getApp.$emit('SHOW_TOAST', message, 'success')
          }).catch(e => {
        window.getApp.$emit('SHOW_TOAST', 'You can\'t do this action.', 'red')
      })
    },
    fetchPost() {
      this.axios.get(this.api.ACTIONS.POST(this.post.id))
          .then(res => {
            this.post = res.data.data
          })
    },
    addNewComment() {
      this.axios.post(this.api.ACTIONS.ADD_COMMENT(this.post.id), {'content': this.newComment})
          .then(res => {
            window.getApp.$emit('SHOW_TOAST', 'Comment Added Successfully!', 'success');
            this.newComment = null;
            this.addComment = false;
            this.fetchPost();
          }).catch(e => {
        window.getApp.$emit('SHOW_TOAST', 'Something Went Wrong', 'red');
      })
    },
    toggleLike() {
      this.axios.post(this.api.ACTIONS.LIKE_TOGGLE(this.post.id))
          .then(res => {
            let message = res.data.message;
            this.post.is_liked = !this.post.is_liked;
            this.post.likes_counter += (this.post.is_liked) ? 1 : -1;
            window.getApp.$emit('SHOW_TOAST', message, 'success')
          })
          .catch(e => {
            window.getApp.$emit('SHOW_TOAST', 'Something Went Wrong', 'red')
          })
    }
  },
  computed: {
    image() {
      return this.$store.state.user.image
    },
  },
}
</script>

<style scoped>
.wrap-layout {
  background-color: white;
  margin-top: 5px;
  border: 1px solid lightgrey;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 3px;
  padding: 10px
}

.post-info {
  color: grey;
  font-weight: normal;
  font-size: 16px;
}

</style>