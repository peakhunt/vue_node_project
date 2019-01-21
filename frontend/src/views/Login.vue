<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field v-model="id"
                            prepend-icon="person"
                            label="Login"
                            type="text"
                            :rules="[rules.required]" />
              <v-text-field v-model="password"
                            prepend-icon="lock"
                            type="password"
                            label="Password"
                            :rules="[rules.required]" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    doLogin () {
    }
  },
  data () {
    return {
      id: '',
      password: '',
      valid: true,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  }
}
</script>
