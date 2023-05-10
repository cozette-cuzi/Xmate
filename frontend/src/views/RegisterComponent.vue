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
                  <h1 class="flex primary--text">Xmate</h1>
                  <v-layout row style="width: 100%">
                    <v-flex style="width: 100%">
                      <v-form style="width: 100%">
                        <v-text-field :error="error" append-icon="person" name="name" label="Full Name"
                                      type="text"
                                      required=true
                                      v-model="model.name"></v-text-field>
                        <v-text-field :error="error" append-icon="email" name="login" label="email"
                                      type="text"
                                      required=true
                                      v-model="model.email"></v-text-field>
                        <ChooseDate label="Birthday" v-model="model.birthday"/>
                        <v-select :items="api.CONSTANTS.GENDERS"
                                  v-model="model.gender"
                                  label="Gender"
                        />
                        <v-text-field :error="error" append-icon="lock" name="password" label="Password"
                                      id="password"
                                      required=true
                                      type="password" v-model="model.password"></v-text-field>
                        <v-text-field :error="error" append-icon="lock" name="password_confirmation"
                                      label="Confirm Password"
                                      id="password"
                                      required=true
                                      type="password" v-model="model.password_confirmation"></v-text-field>
                        <v-btn block color="primary" @click="register" :loading="loading">Register</v-btn>

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
import ChooseDate from "../components/utils/input/ChooseDate";

export default {
  components: {ChooseDate},
  title: 'RegisterComponent',
  data: () => ({
    loading: false,
    error: false,
    model: {
      name: '',
      birthday: '',
      gender: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    socket: null
  }),
  methods: {
    async register() {
      this.error = false;
      this.loading = true;
      this.axios.post(this.api.ACTIONS.REGISTER, {...this.model})
          .then(({data}) => {

            let next = '/login';
            window.getApp.$emit('SHOW_TOAST', "Registered Successfully", 'green');
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
