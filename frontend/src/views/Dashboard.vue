<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>

          <v-flex d-flex xs12>
            <v-card color="purple" dark>
              <v-card-text>Left Top TIme Info Will Be Here</v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12>
            <v-card color="green lighten-2" dark>
              <v-card-text>Left Middle Login Info Will Be Here</v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12>
            <v-card color="blue lighten-2" dark>
              <v-card-text>Left Bottom Some Stats Will Be Here</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex d-flex xs12 sm6 md9>
        <v-layout row wrap>
          <v-flex d-flex xs12>
            <v-card color="indigo" dark>
              <v-card-text>Right Top System Status Will Be Shown Here</v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12>
            <v-card color="red lighten-2" dark>
              <v-card-text>Right Bottom Charts Will Be Shown Here</v-card-text>
            </v-card>
          </v-flex>

        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
</script>

<style scoped>
</style>
