<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout row wrap>

      <!-- left start -->
      <v-flex d-flex xs12 sm6 md2 class="left-common">
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
          <!-- left top end -->

          <!-- left bottom -->
          <v-flex d-flex xs12>
            <v-card class="elevation-16">
              <v-card-title class="info--text title font-weight-bold">절감요금</v-card-title>
              <v-card-text>
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
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12>
            <v-card class="elevation-16">
              <v-card-title class="info--text title font-weight-bold">피크저감관리</v-card-title>
              <v-card-text>
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
          <!-- left bottom end -->
        </v-layout>
      </v-flex>
      <!-- left end -->

      <!-- middle start -->
      <v-flex d-flex xs12 sm6 md8 class="middle-common">
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
      <!-- middle end -->

      <!-- right start -->
      <v-flex d-flex xs12 sm6 md2 class="right-common">
        <v-layout row wrap>
          <!-- right top -->
          <v-flex d-flex xs12 class="right-top">
            <v-card class="elevation-16 red" raised height="100%">
              <v-carousel class="red" height="100%" cycle hide-delimiters interval="2500">
                <v-carousel-item :key="0" style="height: 100%">
                  <v-container fill-height justify-center class="text-xs-center blue">
                    <span class="title font-weight-light">요금제</span>
                    <span class="headline font-weight-bold">
                      &nbsp;을)고압A&nbsp;
                    </span>
                    <span class="title font-weight-light">
                      산업용
                    </span>
                  </v-container>
                </v-carousel-item>

                <v-carousel-item :key="1" style="height: 100%">
                  <v-container fill-height justify-center class="text-xs-center green">
                    <span class="title font-weight-light">적용부하</span>
                    <span class="headline font-weight-bold">
                      &nbsp;최대부하&nbsp;
                    </span>
                    <span class="title font-weight-light">
                      시간대
                    </span>
                  </v-container>
                </v-carousel-item>

                <v-carousel-item :key="2" style="height: 100%">
                  <v-container fill-height justify-center class="text-xs-center cyan">
                    <span class="title font-weight-light">적용요금</span>
                    <span class="headline font-weight-bold">
                      &nbsp;166.7&nbsp;
                    </span>
                    <span class="title font-weight-light">
                      원/kWh
                    </span>
                  </v-container>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </v-flex>

          <!-- right middle1 -->
          <v-flex d-flex xs12 class="right-middle1">
            <v-card class="elevation-16" raised>
              <v-card-title class="title font-weight-bold info--text">2월 13일</v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex d-flex xs6>
                    <v-text-field label="전력 사용량"
                                  readonly
                                  suffix="kWh"
                                  value="12345"></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs6>
                    <v-text-field label="총전량"
                                  readonly
                                  suffix="kWh"
                                  value="12345"></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs6>
                    <v-text-field label="방전량"
                                  readonly
                                  suffix="kWh"
                                  value="12345"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>

          <!-- right middle2 -->
          <v-flex d-flex xs12 class="right-middle2">
            <v-card class="elevation-16" raised>
              <v-card-title class="title font-weight-bold info--text">2월 누적량</v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex d-flex xs6>
                    <v-text-field label="전력 사용량"
                                  readonly
                                  suffix="kWh"
                                  value="12345"></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs6>
                    <v-text-field label="총전량"
                                  readonly
                                  suffix="kWh"
                                  value="12345"></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs6>
                    <v-text-field label="방전량"
                                  readonly
                                  suffix="kWh"
                                  value="12345"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>

          <!-- right bottom -->
          <v-flex d-flex xs12 class="right-bottom">
            <v-card class="elevation-16" raised>
              <v-card-title class="title font-weight-bold info--text">ESS 설치후 누적량</v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex d-flex xs6>
                    <v-text-field label="전력 사용량"
                                  readonly
                                  suffix="kWh"
                                  value="12345"></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs6>
                    <v-text-field label="총전량"
                                  readonly
                                  suffix="kWh"
                                  value="12345"></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs6>
                    <v-text-field label="방전량"
                                  readonly
                                  suffix="kWh"
                                  value="12345"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>

        </v-layout>
      </v-flex>
      <!-- right end -->

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
      ],
      price_plans: [
        {
          title: '전력 요금재',
          value: '(을)고압A',
          unit: '산업용'
        },
        {
          title: '현재 적용부하',
          value: '최대부하',
          unit: '시간대'
        },
        {
          title: '현재 요금단가',
          value: '166.7',
          unit: '원/kWh'
        }
      ]
    }
  }
}
</script>

<style scoped>
.left-common {
  min-width: 20%;
}

.middle-common {
  max-width: 60%;
}

.right-common {
  min-width: 20%;
}

.right-top {
  height: 10%;
}

.right-middle1 {
  height: 30%;
}

.right-middle2 {
  height: 30%;
}

.right-bottom {
  height: 30%;
}

.middle-top {
  height: 50%;
}

.middle-bottom {
  height: 50%;
}

.mode-class {
  font-size: 28px;
  font-weight: bold;
  color: #B2FF59;
}

.mode-bg-style {
  border-radius: 5%;
  background-color: #525252;
  padding: 0;
}

.opr-status {
  font-size: 80px;
  color: #B2FF59;
}
</style>
