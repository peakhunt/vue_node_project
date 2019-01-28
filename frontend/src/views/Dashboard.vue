<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md2>
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
            <v-card class="elevation-16">
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

      <v-flex d-flex xs12 sm6 md8>
        <v-layout row wrap>

          <!-- middle top -->
          <v-flex d-flex class="middle-top">
            <v-card color="indigo" class="elevation-16">
              <v-card-text>Middle Top System Status Will Be Shown Here {{msg}}</v-card-text>
            </v-card>
          </v-flex>

          <!-- middle bottom -->
          <v-flex d-flex class="middle-bottom">
            <v-card class="elevation-16 text-xs-center">
              <!-- guess it's apexcharts bug. without color style, toolbar menu gets white text
                   which is inherited from the parent -->
              <apexcharts style="color: black" type="area" height="100%" :options="options" :series="series">
              </apexcharts>
            </v-card>
          </v-flex>

        </v-layout>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-layout row wrap>
          <!-- right top -->
          <v-flex d-flex>
            <v-card color="orange" class="elevation-16">
              <v-card-text>Right Top System Status Will Be Shown Here {{msg}}</v-card-text>
            </v-card>
          </v-flex>

          <!-- right middle -->
          <v-flex d-flex>
            <v-card color="purple" class="elevation-16">
              <v-card-text>Right Middle System Status Will Be Shown Here {{msg}}</v-card-text>
            </v-card>
          </v-flex>

          <!-- right bottom -->
          <v-flex d-flex>
            <v-card color="cyan" class="elevation-16">
              <v-card-text>Right Bottom System Status Will Be Shown Here {{msg}}</v-card-text>
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
    'apexcharts': VueApexCharts
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
          background: '#ffffff',
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blue: 3,
            opacity: 0.5
          }
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        title: {
          text: 'Blah Blah Blah Data',
          align: 'left'
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'datetime'
        },
        tooltip: {
          theme: 'dark'
        },
        theme: {
          palette: 'palette5'
        }
      },
      series: [
        {
          name: 'Series 1',
          data: [
            [1486684800000, 34],
            [1486684900000, 44],
            [1486685000000, 65],
            [1486685100000, 63],
            [1486685200000, 22],
            [1486685300000, 37],
            [1486685400000, 99],
            [1486685500000, 11],
            [1486685600000, 89],
            [1486685700000, 90],
            [1486685800000, 19],
            [1486685900000, 33],
            [1486686000000, 65],
            [1486686100000, 63],
            [1486686200000, 22],
            [1486686300000, 37],
            [1486686400000, 99],
            [1486686500000, 11],
            [1486686600000, 89],
            [1486686700000, 90],
            [1486686800000, 19],
            [1486686900000, 33]
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.middle-top {
  height: 50%;
}

.middle-bottom {
  height: 50%;
}
</style>
