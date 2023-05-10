<template>
  <v-toolbar
      color="white"
      fixed
      dark
      app
      style="padding: 5px 90px"
  >
    <div @click="this.$router.push({name: 'Home'})"></div>
    <router-link :to="{name: 'Home'}">
      <img src="/static/m.png" alt="Vue Material Admin" height="60">
    </router-link>
    <router-link :to="{name: 'Home'}" style="text-decoration: none">
      <h2 class="primary--text">Xmate</h2>
    </router-link>
    <v-spacer></v-spacer>
    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn v-for="(nav_item, index) in nav_menu" :key="index" @click="nav_item.click()" color="primary" large flat
             slot="activator" style="padding: 0px;margin: 0">
        {{ nav_item.title }}
      </v-btn>
    </v-menu>
    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px">
          <img :src="api.GET_IMAGE(image)" alt="Michael Wang"/>
        </v-avatar>
      </v-btn>

      <v-list class="pa-0">
        <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null"
                     :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled"
                     :target="item.target" rel="noopener" :key="index">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>


  </v-toolbar>
</template>
<script>

export default {
  name: 'app-toolbar',
  data() {
    return {
      search: null,
      searchResults: [],
      selectedPassenger: null,
      ai_dispatch_left: "00:00",
      loading: false,
      follow_up_ticket: false,
      items: [
        {
          icon: 'fullscreen_exit',
          href: '#',
          title: 'Logout',
          click: (e) => {
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
          }
        },

      ],
      nav_menu: [
        {
          href: 'Home',
          title: 'Home',
          click: (e) =>
              this.$router.push({
                name: "Home",
              })
        },
        {
          href: '#groups',
          title: 'Groups',
          click: (e) => this.$router.push({
            name: "Groups"
          })
        },
        {
          href: '#profile',
          title: 'Profile',
          click: (e) => this.$router.push({
            name: "UserProfile",
            params: {id: this.$store.state.user.id}
          })
        },
      ],
    }
  },
  computed: {
    image() {
      return this.$store.state.user.image
    },
    online: {
      get() {
        return this.$store.state.user.online;
      },
    }
  },
  methods: {},
};
</script>
