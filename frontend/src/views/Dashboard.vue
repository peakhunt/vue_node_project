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
            <v-card color="indigo" height="100%">
              <v-card-text>Right Top System Status Will Be Shown Here {{msg}}</v-card-text>
            </v-card>
          </v-flex>

          <!-- right bottom -->
          <v-flex d-flex xs12>
            <v-card>
              <v-sheet class="white" height="100%">
                  <apexchart type="line" :options="options" :series="series"></apexchart>
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
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Dashboard',
  components: {
    'apexchart': VueApexCharts
  },
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
  methods: {
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
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
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  }
}
</script>

<style scoped>
</style>
