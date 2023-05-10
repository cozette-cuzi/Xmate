<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app" v-if="$route && $route.name && $route.name.toLowerCase() !== 'root'">
        <app-toolbar class="app--toolbar"></app-toolbar>
        <div>
          <v-layout style="margin: 30px 130px" row wrap align="left">
            <v-flex xs3 v-if="$route.name !== 'RegisterComponent'">
              <app-side-nav></app-side-nav>
            </v-flex>
            <v-flex xs9>
              <v-content>
                <!-- Page Header -->
                <div>
                  <router-view :key="$route.fullPath"></router-view>
                </div>
              </v-content>
            </v-flex>

          </v-layout>
<!--          <div class="box1" v-if="$route.name !== 'RegisterComponent'">-->
<!--            <app-side-nav></app-side-nav>-->
<!--          </div>-->
<!--          <div class="box3">-->
<!--            <v-content>-->
<!--              &lt;!&ndash; Page Header &ndash;&gt;-->
<!--              <div>-->
<!--                <router-view :key="$route.fullPath"></router-view>-->
<!--              </div>-->
<!--            </v-content>-->
<!--          </div>-->
        </div>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
        v-for="(snackbar,i) of snackbars"
        :key="'sanackbar-' + i"
        :timeout="snackbar.timeout ? snackbar.timeout : 3000"
        :color="snackbar.color"
        v-model="snackbar.show"
        v-bind="snackbar"
    >
      {{ snackbar.text }}
      <v-btn v-if="snackbar.action" dark flat @click="snackbar.action">
        Show
      </v-btn>
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import AppToolbar from '@/components/AppToolbar';
import AppSideNav from '@/components/AppSideNav';
import AppEvents from '@/event';
import Login from "./views/Login";

export default {
  components: {
    Login,
    AppToolbar,
    AppSideNav
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbars: [],
    active_ride_id: null,
  }),
  created() {
    AppEvents.forEach(item => this.$on(item.name, item.callback));
    window.getApp = this;
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push({name: "Login"});
      // this.axios.put(this.api.ACTIONS.LOGOUT)
      //     .then(() => {
      //       window.getApp.$emit('APP_LOGOUT');
      //     })
      //     .catch(err => {
      //       window.getApp.$emit("SHOW_TOAST", "err (check console)");
      //       console.log(err);
      //       console.log(err.response);
      //       console.log(err.response.data);
      //     }).finally(
      //     () => {
      //       this.$store.commit("LOGOUT");
      //       this.$router.push({name: "Login"});
      //     }
      // )
    },
  },

};
</script>

<style lang="css" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0
}

.page-wrapper {
  min-height: calc(100vh - 64px - 50px);
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 0px;
}
.box3 {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  width: 817px;
  position: relative;
}
</style>
