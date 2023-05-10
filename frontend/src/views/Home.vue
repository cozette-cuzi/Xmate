<template>
  <posts :filter="filter"></posts>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent";
import Posts from "@/components/Posts";

export default {
  name: "Home",
  components: {
    LoadingComponent,
    Posts
  },
  data() {
    return {
      filter: {
        type: 'home',
      }
    }
  }
}
</script>

<style scoped>

</style>