<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="Vue Material Admin" height="120">
                  <h1 class="flex my-4 primary--text">Xmate</h1>
                  <v-layout row style="width: 100%">
                    <v-flex xs12>
                      <v-form>
                        <v-text-field :error="error" append-icon="person" name="login" label="Email"
                                      v-on:keyup.enter="login"
                                      type="text"
                                      required=true
                                      v-model="model.email"></v-text-field>
                        <v-text-field :error="error" append-icon="lock" name="password" label="Password"
                                      v-on:keyup.enter="login"
                                      id="password"
                                      required=true
                                      type="password" v-model="model.password"></v-text-field>
                        <div wrap>
                          <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
                          <h3 style="text-align: center">OR</h3>
                          <v-btn block color="secondary" @click="goToRegister">Register
                          </v-btn>
                        </div>
                          <v-card height="100px" flat>
                            <v-bottom-nav
                                active.sync="recent"
                                :value="true"
                                absolute
                            >
                              <v-btn
                                  color="teal"
                                  flat
                                  value="recent"
                              >
                                <span >Google</span>
                                <v-icon color="error" style="margin-right: 26px;">gmail</v-icon>
                              </v-btn>

                              <v-btn
                                  color="teal"
                                  flat
                                  value="favorites"
                              >
                                <span>Facebook</span>
                                <v-icon color="info">facebook</v-icon>
                              </v-btn>

                            </v-bottom-nav>
                          </v-card>
                      </v-form>
                    </v-flex>
                  </v-layout>

                </div>


              </v-card-text>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import store from "@/store";

export default {
  title: 'Login',
  data: () => ({
    loading: false,
    error: false,
    model: {
      email: '',
      password: ''
    },
    socket: null
  }),
  methods: {
    async login() {
      this.error = false;
      this.loading = true;
      this.axios.post(this.api.ACTIONS.LOGIN, {...this.model})
          .then(({data}) => {
            this.$store.commit('LOGIN', data.data);
            let next = this.$route.query.next || '/home';

            window.getApp.$emit('APP_LOGIN_SUCCESS');
            this.$router.push(next);
          })
          .catch((err) => {
            console.log(err.message);
            this.error = true;
            let response = err.response;
            if (response) {
              window.getApp.$emit('SHOW_TOAST', response.data.message, 'red');
            } else {
              window.getApp.$emit('SHOW_TOAST', 'Check your info', 'red');
            }
          })
          .then(() => this.loading = false);
    },
    goToRegister() {
      this.$router.push({name: 'RegisterComponent'});
    }
  }

};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
