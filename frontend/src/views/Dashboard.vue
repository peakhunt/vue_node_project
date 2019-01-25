<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>

          <!-- left top -->
          <v-flex d-flex xs12>
            <v-card class="elevation-16">
              <v-card-text>
                <v-layout justify-center>
                  <span class="headline">{{$store.getters.currentTime}}</span>
                </v-layout>
                <v-date-picker readonly locale="kr" full-width v-model="$store.getters.currentDate" header-color="primary"></v-date-picker>
              </v-card-text>
            </v-card>
          </v-flex>

          <!-- left middle -->
          <v-flex d-flex xs12>
            <v-card color="green lighten-2" dark>
              <v-card-text>You are logged in as
                <v-chip color="primary" text-color="white">{{$store.getters.userID}}</v-chip>
              </v-card-text>
            </v-card>
          </v-flex>

          <!-- left bottom -->
          <v-flex d-flex xs12>
            <v-card color="blue lighten-2" dark>
              <v-card-text>Left Bottom Some Stats Will Be Here {{msg}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex d-flex xs12 sm6 md9>
        <v-layout row wrap>
          <!-- right top -->
          <v-flex d-flex xs12>
            <v-card color="indigo" dark>
              <v-card-text>Right Top System Status Will Be Shown Here {{msg}}</v-card-text>
            </v-card>
          </v-flex>

          <!-- right bottom -->
          <v-flex d-flex xs12>
            <v-card color="red lighten-2" dark>
              <v-card-text>Right Bottom Charts Will Be Shown Here {{msg}}</v-card-text>
            </v-card>
          </v-flex>

        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      msg: `blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah`,
      dateTime: new Date().toISOString().substr(0, 10)
    }
  }
}
</script>

<style scoped>
</style>
