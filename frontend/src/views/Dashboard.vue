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
          <v-flex d-flex xs12 class="middle-top">
            <v-layout row wrap>
              <!-- left -->
              <v-flex d-flex xs9 sm9 md8>
                <v-card class="elevation-16">
                  <svg height="100%" width="100%" viewbox="0 0 1200 800">
                    <power-line :x="155" :y="140" :width="300" :height="10" class="power-line" />
                    <power-line :x="270" :y="150" :width="10" :height="100" class="power-line" />
                    <power-line :x="330" :y="280" :width="120" :height="10" class="power-line" />

                    <power-direction :x="360" :y="270" :width="32" :height="32" class="power-direction" />
                    <power-direction v-if="false" :x="400" :y="270" :width="32" :height="32" dir="right" class="power-direction" />

                    <power-direction v-if="false" :x="259" :y="160" :width="32" :height="32" dir="up" class="power-direction" />
                    <power-direction :x="259" :y="180" :width="32" :height="32" dir="down" class="power-direction" />

                    <power-direction :x="200" :y="130" :width="32" :height="32" dir="left" class="power-direction" />
                    <power-direction v-if="false" :x="350" :y="130" :width="32" :height="32" dir="left" class="power-direction" />

                    <battery :x="450" :y="250" :width="150" :height="75" :value="batteryLevel"/>
                    <power-tower :x="50" :y="25" :width="150" :height="150"/>
                    <factory :x="450" :y="25" :width="150" :height="150"/>
                    <server :x="230" :y="235" :width="100" :height="100"/>

                    <text text-anchor="end" x="550" y="300" class="svg-text-heavy">
                      {{batteryLevel}}%
                    </text>

                    <rect x="92" y="185" rx="5" ry="5" width="60" height="20" fill="none" stroke="white" />
                    <text text-anchor="end" x="138" y="200" class="svg-text-small-border">
                      {{batteryLevel}}&nbsp;kV
                    </text>

                    <rect x="490" y="185" rx="5" ry="5" width="80" height="20" fill="none" stroke="white" />
                    <text text-anchor="end" x="552" y="200" class="svg-text-small-border">
                      {{batteryLevel}}&nbsp;kW
                    </text>

                    <rect x="242" y="345" rx="5" ry="5" width="80" height="20" fill="none" stroke="white" />
                    <text text-anchor="end" x="302" y="360" class="svg-text-small-border">
                      {{batteryLevel}}&nbsp;kW
                    </text>

                    <rect x="477" y="345" rx="5" ry="5" width="80" height="20" fill="none" stroke="white" />
                    <text text-anchor="end" x="540" y="360" class="svg-text-small-border">
                      {{batteryLevel}}&nbsp;kWh
                    </text>
                  </svg>
                </v-card>
              </v-flex>

              <!-- right -->
              <v-flex d-flex xs3 sm3 md4>
                <v-card class="elevation-16">
                  <!--
                    XXX: FIXME
                    why does adding height=100% here fuck up the whole chart including
                    line chart when realtime update is applied???
                  -->
                  <apexcharts type="radialBar" :options="radialOptions" :series="radialSeries">
                  </apexcharts>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- middle bottom -->
          <v-flex d-flex xs12 class="middle-bottom">
            <v-card class="elevation-16 text-xs-center" height="100%">
              <!-- guess it's apexcharts bug. without color style, toolbar menu gets white text
                   which is inherited from the parent -->
              <apexcharts height="100%" style="color: black" type="line" :options="options" :series="series">
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
import Battery from '@/components/Battery'
import PowerTower from '@/components/PowerTower'
import Factory from '@/components/Factory'
import Server from '@/components/Server'
import PowerLine from '@/components/PowerLine'
import PowerDirection from '@/components/PowerDirection'

export default {
  name: 'Dashboard',
  components: {
    'apexcharts': VueApexCharts,
    Battery,
    PowerTower,
    Factory,
    Server,
    PowerLine,
    PowerDirection
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
  mounted () {
    var self = this
    var inc = [ true, true ]
    var batInc = [ true ]

    self.timer = setInterval(() => {
      self.testRadialChart(inc)
      self.testLineChart()
      self.testBatteryLevel(batInc)
    }, 200)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    testRadialChart (inc) {
      var series = this.radialSeries.slice()

      for (let i = 0; i < 2; i += 1) {
        if (inc[i]) {
          series[i] += 1
        } else {
          series[i] -= 1
        }

        if (series[i] > 100) {
          series[i] = 100
          inc[i] = false
        }

        if (series[i] < 0) {
          series[i] = 0
          inc[i] = true
        }
      }
      this.radialSeries = series
    },
    testBatteryLevel (inc) {
      var series = [this.batteryLevel]

      for (let i = 0; i < 1; i += 1) {
        if (inc[i]) {
          series[i] += 1
        } else {
          series[i] -= 1
        }

        if (series[i] > 100) {
          series[i] = 100
          inc[i] = false
        }

        if (series[i] < 0) {
          series[i] = 0
          inc[i] = true
        }
      }
      this.batteryLevel = series[0]
    },
    testLineChart () {
      var dataArray = this.series[0].data
      const timestamp = dataArray[dataArray.length - 1][0] + 100000
      const data = this.getRandomInt()
      const newPair = [timestamp, data]

      dataArray.splice(0, 1)
      dataArray.push(newPair)
    }
  },
  data () {
    return {
      timer: null,
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
            enabled: false,
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
            opacity: 0.3,
            blur: 5,
            left: -7,
            top: 22
          }
        },
        /*
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        }, */
        markers: {
          size: 0,
          hover: {
            size: 0
          }
        },
        stroke: {
          curve: 'straight',
          width: 5
        },
        grid: {
          padding: {
            left: 0,
            right: 0
          }
        },
        title: {
          text: 'Blah Blah Blah Data',
          align: 'left',
          style: {
            fontSize: '22px'
          }
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
        legend: {
          show: true,
          floating: true,
          horizontalAlign: 'left',
          onItemClick: {
            toggleDataSeries: false
          },
          position: 'top',
          offsetY: -33,
          offsetX: 60
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
      radialSeries: [19, 100],
      radialOptions: {
        chart: {
          animations: {
            enabled: true
          }
        },
        legend: {
          show: true,
          position: 'bottom',
          fontSize: '22px',
          labels: {
            colors: ['white', 'white']
          }
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '50%',
              background: '#293450'
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15
              }
            },
            dataLabels: {
              name: {
                fontSize: '22px',
                color: 'white'
              },
              value: {
                fontSize: '22px',
                color: 'white'
              },
              total: {
                show: true,
                color: 'white',
                label: 'SOC / SOH',
                formatter: function (w) {
                  return `${w.globals.series[0]}% / ${w.globals.series[1]}%`
                  // return '19% / 100%'
                }
              }
            }
          }
        },
        labels: ['SOH', 'SOC']
      },
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
      ],
      batteryLevel: 0
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
  height: 45%;
}

.middle-bottom {
  height: 55%;
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

.svg-text-small {
  font: italic 13px sans-serif;
  fill: white;
}

.svg-text-small-border {
  font: italic 13px sans-serif;
  fill: white;
  paint-order: stroke;
  stroke: #000000;
  stroke-width: 1px;
  stroke-linecap: butt;
  stroke-linejoin: miter;
}

.svg-text-heavy {
  font: 30px sans-serif;
  fill: white;
}

.power-line {
  fill: #76FF03;
}

.power-direction {
  fill: #76FF03;
}
</style>
