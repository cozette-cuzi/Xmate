<template>
  <div>
    <loading-component :value="loading"/>
    <v-dialog v-model="dialog" width="600">
      <v-card width="100%">
        <v-card-title class="headline lighten-2" primary-title>
          Add Interests:
        </v-card-title>
        <v-card-text class="p-0">
          <v-select
              width="90%"
              v-model="userInterests"
              :items="interests"
              item-text="name"
              item-value='id'
              chips
              label="Interests"
              multiple
              @change="interestsUpdated = true"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="light-grey" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="addInterests()">
            Add
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card class="side-nav mb-4">

      <v-card-title class="font-weight-thin" primary-title>
        <div  class="mb-4">
          <h2 style="margin: 0 auto" class="headline mb-0">{{ this.$store.state.user.name }}</h2>
        </div>

        <v-card-text class="pa-0">
          <v-divider></v-divider>
          <div style="margin-top: 15px">
            <h3 class="headline">Interests:</h3>
            <div class="chips">
              <v-chip disabled v-for="(interest, index) in user.interests" :key="index" :text-color="colors[index%3]"
                      class="chip">
                {{ interest.name }}
              </v-chip>
              <v-btn
                  style="width: 30px; height: 30px"
                  dark
                  fab
                  color="primary"
                  @click="dialog = true"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
import LoadingComponent from "./LoadingComponent";
import store from "../store";

export default {
  name: 'app-side-nav',
  components: {
    LoadingComponent
  },
  data() {
    return {
      loading: true,
      interests: null,
      userInterests: this.$store.state.user.interests,
      user: this.$store.state.user,
      colors: ["primary", "secondary", "accent"],
      dialog: false,
      model: {interests: []},
      interestsUpdated: false
    }
  },
  mounted() {
    this.fetchInterests();
    this.fetchUser()
  },
  methods: {
    fetchInterests() {
      this.axios.get(this.api.ACTIONS.INTERESTS)
          .then(
              ({data}) => {
                this.interests = data.data;
                this.loading = false;
              }
          )
          .catch(
              () => this.$router.push({name: "NotFound"})
          )
    },
    addInterests() {
      this.loading = true
      this.user.interest_ids = this.userInterests;
      delete this.user.image;
      if(!this.interestsUpdated) {
        delete this.user.interest_ids;
      }
      this.user.interests = this.userInterests;
      this.axios.post(this.api.ACTIONS.UPDATE_PROFILE, this.user).then(
          () => {
            this.dialog = false;
            this.user = this.$store.state.user;
            this.fetchUser();
            window.getApp.$emit('SHOW_TOAST', 'Updated!', 'success');
          }
      ).catch(
          x => {
            window.getApp.$emit('SHOW_TOAST', 'Something went wrong', 'red');
          }
      ).finally(
          () => this.loading = false
      )
    },
    fetchUser() {
      this.axios.get(this.api.ACTIONS.USER(this.$store.state.user.id))
          .then(
              ({data}) => {
                this.user = data.data;
                this.loading = false;
              }
          )
          .catch(
              () => this.$router.push({name: "NotFound"})
          )
    },

  }
};
</script>
<style lang="css">
.side-nav {
  padding: 20px;
  min-height: 350px;
  width: 300px;
  margin: 62px -8px auto;
}

.chips {
  text-size: 25px;
}

.chip {
  font-size: 16px;
  font-weight: bolder
}
</style>