<template>
  <v-dialog v-model="options.show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ options.title }}</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid" ref="userForm">
          <v-text-field v-model="options.id"
                        :disabled="options.addMode === false"
                        prepend-icon="person"
                        label="User ID"
                        :rules="[rules.requiredUserID]" />
          <v-text-field v-model="options.password1"
                        prepend-icon="lock"
                        type="password"
                        label="New Password"
                        :rules="[rules.requiredNewPass]" />
          <v-text-field v-model="options.password2"
                        prepend-icon="lock"
                        type="password"
                        label="New Password Aain"
                        :rules="[rules.requiredNewPass]"
                        :error-messages="passwordMatchError()" />
          <v-checkbox :label="options.admin ? 'Admin' : 'No Admin'" v-model="options.admin" />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" color="primary" dark class="mb-2" @click="onConfirm"> {{ options.addMode ? 'Add' : 'Update' }}</v-btn>
        <v-btn color="primary" dark class="mb-2" @click="onCancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UserMgmtDialog',
  props: [
    'options'
  ],
  computed: {
    showDialog () {
      return this.options.show
    }
  },
  methods: {
    onConfirm () {
      this.$emit('close')
    },
    onCancel () {
      this.$emit('cancel')
    },
    passwordMatchError () {
      return (this.options.password1 === this.options.password2) ? '' : 'Passowrd doesn\'t match'
    }
  },
  data () {
    return {
      valid: false,
      rules: {
        requiredUserID: value => !!value || 'Please enter User ID.',
        requiredNewPass: value => !!value || 'Please enter new password.'
      }
    }
  },
  watch: {
    showDialog (newVal, oldVal) {
      if (newVal === true) {
        this.$refs.userForm.resetValidation()
      }
    }
  }
}
</script>

<style scoped>
</style>
