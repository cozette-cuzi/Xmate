<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "RootComponent"
    }
</script>

<style scoped>
.layout {
  background-color: white;
  margin-top: 5px;
  border: 1px solid lightgrey;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 3px;
  padding:10px
}
</style>