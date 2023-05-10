<template>
  <div>
    <loading-component :value="loading"></loading-component>
    <div v-for="(post, index) in posts" :key="index">
      <post :post="post" :filter="filter"></post>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post"
import LoadingComponent from "./LoadingComponent";

export default {
  name: "Posts",
  components: {
    LoadingComponent,
    Post
  },
  props: ['filter'],
  data() {
    return {
      posts: null,
      loading: true
    }
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      var paramFilter = [];
      paramFilter['type'] = this.filter.type;
      paramFilter['user_id'] = this.filter.user_id ? this.filter.user_id : null;
      paramFilter['group_id'] = this.filter.group_id ? this.filter.group_id : null;
      var p = {

        filter_type: paramFilter['type'],
            user_id: paramFilter['user_id'],
          group_id: paramFilter['group_id'],
          page_size: 10,
          page: 1,


      }
      this.axios.get(this.api.ACTIONS.POSTS, {
        params: {
          filter_type: this.filter.type,
          user_id: this.filter.user_id ? this.filter.user_id : null,
          group_id: this.filter.group_id ? this.filter.group_id : null,
          page_size: 200,
          page: 1,
        }
      }).then(res => {
        this.posts = res.data.data.posts;
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>