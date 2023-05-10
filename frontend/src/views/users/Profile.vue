<template>
  <div>
    <loading-component :value="loading"/>
    <v-card class="pa-3 background">
      <v-layout row wrapper>
        <v-flex xs3>
          <div className="headline font-weight-bold">
            <v-avatar size="90%">
              <img :src="api.GET_IMAGE(this.user.image)" />
            </v-avatar>
          </div>
        </v-flex>
        <v-flex xs10 class="pl-3 pt-3">
          <div class="font-weight-light">
            <h1 class="primary--text font-weight-regular"><span
                class="black--text font-weight-thin">Hi I'm </span>{{ this.user.name }}</h1>
            <h3 class="accent--text font-weight-light">{{ (this.user.gender === 'MALE') ? 'Male' : 'Female' }}</h3>
            <h3 class=" font-weight-light">{{ this.age }} years old.</h3>
          </div>
        </v-flex>
        <v-flex v-if="this.$store.state.user.id == this.$route.params.id" xs3 style="text-align: right;">
          <v-btn
              style="text-align: right"
              small
              dark
              fab
              color="secondary"
              @click="dialog = true"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <div v-if="user.interests.length">
          <div class=" ma-2">
            <h2 class="font-weight-light">I'm interested in: </h2>
            <v-chip disabled v-for="(interest, index) in user.interests" :key="index" :text-color="colors[index%3]"
                    class="chip font-weight-regular">
              {{ interest.name }}
            </v-chip>
          </div>
        </div>
      </v-flex>
      <v-flex xs12>
        <h2 class="font-weight-light">Contact me via: </h2>
        <h3 class="font-weight-light text-sm-left accent--text">{{ this.user.email }}</h3>
      </v-flex>
    </v-card>

    <posts v-if="!loading" :filter="filter"></posts>
    <v-dialog v-model="dialog" width="600" persistent>
      <v-card width="100%">
        <v-card-title class="headline lighten-2" primary-title>
          Update Profile:
        </v-card-title>
        <v-card-text class="p-0">
          <v-text-field v-model="user.name" label="Name"></v-text-field>
          <ChooseDate label="Birthday" v-model="user.birthday"/>
          <v-select
              width="90%"
              v-model="user.interests"
              :items="interests"
              name="name"
              item-text="name"
              item-value='id'
              chips
              label="Interests"
              multiple
              @change="interestsUpdated = true"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="light-grey" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="updateUser()">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent";
import Posts from "../../components/Posts";
import store from "../../store";
import ChooseDate from "../../components/utils/input/ChooseDate";

export default {
  name: "UserProfile",
  title: 'User Profile',
  components: {ChooseDate, Posts, LoadingComponent},
  props: ['id'],
  data() {
    return {
      loading: true,
      user: null,
      age: null,
      colors: ["primary", "secondary", "accent"],
      dialog: false,
      interestsUpdated: false,
      filter: {
        type: 'users',
        user_id: this.$route.params.id
      }
    }
  },
  mounted() {
    this.fetchUser();
    this.fetchInterests();
  },
  methods: {
    calcAge(date) {
      var today = new Date();
      var birthDate = new Date(date);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
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
    fetchUser() {
      this.axios.get(this.api.ACTIONS.USER(this.$route.params.id))
          .then(
              ({data}) => {
                this.user = data.data;
                this._user = Object.assign({}, this.user);
                this.age = this.calcAge(this.user.birthday);
                store.dispatch('validateToken');
                this.loading = false;
              }
          )
          .catch(
              () => this.$router.push({name: "NotFound"})
          )
    },
    updateUser() {
      this.loading = true;
      this.user.interest_ids = this.user.interests;
      if (!this.interestsUpdated) {
        delete this.user.interest_ids;
      }
      delete this.user.image;
      this.axios.post(this.api.ACTIONS.UPDATE_PROFILE, this.user).then(
          () => {
            this.dialog = false;
            window.getApp.$emit('SHOW_TOAST', 'Updated!', 'success');
            this.fetchUser();
          }
      ).catch(
          x => {
            window.getApp.$emit('SHOW_TOAST', 'Something went wrong', 'red');
          }
      ).finally(
          () => this.loading = false
      )
    }
  }
}

</script>

<style scoped lang="css">
.background{
  background-image: url("https://www.istockphoto.com/vector/coconut-leaves-random-on-pastel-background-gm962735258-262946437");
}
</style>