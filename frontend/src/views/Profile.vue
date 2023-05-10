<template>
  <div>
    <loading-component :value="loading"></loading-component>
    <posts v-if="!loading" :filter="'my_posts'" :group_id="null"></posts>
  </div>
</template>

<script>
import LoadingComponent from "../components/LoadingComponent";
export default {
  name: "Profile",
  components: {LoadingComponent},
  data() {
    return {
      loading: true,
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>