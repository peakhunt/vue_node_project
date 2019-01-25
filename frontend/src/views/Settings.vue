<template>
  <v-container fluid grid-list-lg>
    <v-layout justify-center>
      <v-flex xs12 sm8>
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <div>
              <div class="headline">Change Password</div>
            </div>
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid">
              <v-text-field v-model="oldPassword"
                            prepend-icon="lock"
                            type="password"
                            label="Original Password"
                            :rules="[rules.requiredOrgPass]" />
              <v-text-field v-model="newPassword1"
                            prepend-icon="lock"
                            type="password"
                            label="New Password"
                            :rules="[rules.requiredNewPass]"/>
              <v-text-field v-model="newPassword2"
                            prepend-icon="lock"
                            type="password"
                            label="New Password Aain"
                            :rules="[rules.requiredNewPass]"
                            :error-messages="passwordMatchError()"/>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" color="primary" @click="changePassword">Change</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Settings',
  computed: {
    ...mapGetters([
      'userID'
    ])
  },
  data () {
    return {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      valid: true,
      rules: {
        requiredOrgPass: value => !!value || 'Please enter original password.',
        requiredNewPass: value => !!value || 'Please enter new password.'
      }
    }
  },
  methods: {
    doChangePassword () {
      const self = this

      console.log('trying to update password')
      self.$store.dispatch('changePassword', {
        id: self.userID,
        oldPassword: self.oldPassword,
        newPassword: self.newPassword1,
        cb: (err) => {
          self.$emit('hideProgress')
          if (err) {
            const msg = 'Password update failed: ' + err
            return self.$emit('add-notify', { msg, color: 'error' })
          }
          return self.$emit('add-notify', { msg: 'Password Updated', color: 'success' })
        }
      })
    },
    changePassword () {
      const self = this

      self.$emit('showProgress', 'Updating Password...')
      setTimeout(() => {
        self.doChangePassword()
      }, 500)
    },
    passwordMatchError () {
      return (this.newPassword1 === this.newPassword2) ? '' : 'Passowrd doesn\'t match'
    }
  }
}
</script>

<style scoped>
</style>
