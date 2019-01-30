<template>
  <v-parallax src="vbanner.jpg" height="100vh" style="height:100%">
    <v-layout align-center justify-center v-if="!loginProgress">
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" id="loginForm">
              <v-text-field v-model="id"
                            prepend-icon="person"
                            label="User ID"
                            type="text"
                            :rules="[rules.required]" />
              <v-text-field v-model="password"
                            prepend-icon="lock"
                            type="password"
                            label="Password"
                            :rules="[rules.required]" />
            </v-form>
            <span v-if="loginFailed" style="color: red; display: block" class="text-xs-center">
              Login failed. please try again!
            </span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" form="loginForm" :disabled="!valid" color="primary" @click="doLogin">Login</v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>
    </v-layout>

    <v-dialog v-model="loginProgress" persistent max-width="400px">
      <v-card color="primary">
        <v-card-text> Logging In...
          <v-progress-linear
            indeterminate
            color="green"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-parallax>
</template>

<script>

export default {
  name: 'Login',
  methods: {
    doLogin () {
      const self = this

      self.loginProgress = true
      self.loginFailed = false

      setTimeout(() => {
        self.$store.dispatch('login', {
          id: this.id,
          password: this.password,
          cb: (err) => {
            self.loginProgress = false

            if (err) {
              console.log('login failed')
              self.loginFailed = true
              return
            }
            console.log('login success')
          }
        })
      }, 1000)
    }
  },
  data () {
    return {
      id: '',
      password: '',
      valid: true,
      loginProgress: false,
      loginFailed: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
