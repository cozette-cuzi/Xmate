<template>
  <div>
    <v-layout row wrap className="pa-1">
      <v-flex xs1>
        <div className="headline font-weight-bold">
          <v-avatar size="80%">
            <img :src="api.GET_IMAGE(this.data.image)" alt="Michael Wang"/>
          </v-avatar>
        </div>
      </v-flex>
      <v-flex xs11 className="pl-3">
        <div class="font-weight-light">
          <h3 class="primary--text ">{{ this.data.user_name }}</h3>
          <p>{{ this.data.content }}</p>
          <v-spacer></v-spacer>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    data: Object
  },
}
</script>

<style scoped>

</style>