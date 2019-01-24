<template>
  <v-container fluid grid-list-lg>
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <div>
              <div class="headline">User Management</div>
            </div>
          </v-card-title>

          <v-card-text>
          </v-card-text>

          <v-card-actions>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserManagement',
  computed: {
    ...mapGetters([
      'userID'
    ])
  },
  data () {
    return {
      users: []
    }
  },
  methods: {
  },
  created () {
    var self = this

    this.$store.dispatch('getAllUsers', (err, res) => {
      if (err) {
        console.log('failed to get all users')
        return
      }

      console.log(res.users)
      self.users = res.users
    })
  }
}
</script>

<style scoped>
</style>
