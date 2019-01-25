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
                  <span class="headline">{{currentTime}}</span>
                </v-layout>
                <v-date-picker readonly locale="kr" full-width v-model="currentDate" header-color="primary"></v-date-picker>
              </v-card-text>
            </v-card>
          </v-flex>

          <!-- left bottom -->
          <v-flex d-flex xs12>
            <v-card dark>
              <v-card-text>
                <span class="light-blue--text">절감요금</span>
                <v-divider></v-divider>
                <v-layout row>
                  <v-flex xs6>
                    <v-text-field label="주간 절감요금"
                                  readonly
                                  suffix="원"
                                  value="12345"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="누적 절감요금"
                                  readonly
                                  suffix="원"
                                  value="12345"></v-text-field>
                  </v-flex>
                </v-layout>

                <span class="light-blue--text">피크저감관리</span>
                <v-divider></v-divider>
                <v-layout row>
                  <v-flex xs6>
                    <v-text-field label="금일 최대부하"
                                  readonly
                                  suffix="kW"
                                  value="12345"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="금년 최대부하"
                                  readonly
                                  suffix="kW"
                                  value="12345"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs6>
                    <v-text-field label="작년 최대부하"
                                  readonly
                                  suffix="kW"
                                  value="12345"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="피크 저감량"
                                  readonly
                                  suffix="kW"
                                  value="12345"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
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
            <v-card>
              <v-sheet>
                <v-sparkline
                 :value="value"
                 color="rgba(255, 255, 255, .7)"
                 height="100"
                 padding="24"
                 stroke-linecap="round"
                 smooth
                >
                  <template slot="label" slot-scope="item">${{ item.value }}</template>
                </v-sparkline>
              </v-sheet>
            </v-card>
          </v-flex>

        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'currentTime',
      'currentDate'
    ]),
    userIcon () {
      if (this.isAdmin) {
        return 'supervisor_account'
      }
      return 'person'
    }
  },
  data () {
    return {
      msg: `blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah`,
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760
      ]
    }
  }
}
</script>

<style scoped>
</style>
