<template>
  <v-app dark>
    <v-toolbar dense
     fixed
     clipped-left
     app
     v-if="isLoggedIn">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">
        <span class="font-weight-light">사랑의 빠떼리</span>
      </v-toolbar-title>
      <v-divider class="mx-3" inset vertical></v-divider>
      <span class="subheading">Dashboard</span>
      <v-spacer></v-spacer>

      <v-divider class="mx-3" inset vertical></v-divider>
      <span class="info--text headline font-weight-bold">Manual</span>
      <v-divider class="mx-3" inset vertical></v-divider>
      <v-icon large class="error--text">notification_important</v-icon>
      <v-divider class="mx-3" inset vertical></v-divider>

      <v-menu open-on-hover bottom offset-y transition="slide-y-transition">
        <v-chip slot="activator" color="primary">
          <v-icon >{{userIcon}}</v-icon>
          {{userID}}
        </v-chip>
        <v-list>
          <v-list-tile @click="$router.push('user_management')">
            <v-list-tile-title>User Management</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="doLogout()">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" absolute temporary left>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile
         v-for="item in navItems"
         :key="item.title"
         :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="doLogout">
          <v-list-tile-action>
            <v-icon>apps</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view v-if="isLoggedIn"
       v-on:add-notify="addNotify"
       v-on:showProgress="showProgressIndicator"
       v-on:hideProgress="hideProgressIndicator"/>
      <login v-if="!isLoggedIn"/>
    </v-content>

    <v-dialog v-model="youAreLoggedOut" persistent max-width="400px">
      <v-card color="error">
        <v-card-title class="headline">You are logged out!!!</v-card-title>
        <v-card-text>
          You are logged out from the system. Please login again
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="forceLogout">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="noti.show"
                :color="noti.color"
                :timeout="noti.timeout"> {{ noti.msg }}
      <v-btn flat @click="noti.show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-dialog v-model="progressIndicator.show" persistent max-width="400px">
      <v-card color="primary">
        <v-card-text> {{ progressIndicator.message }}
          <v-progress-linear
            indeterminate
            color="green"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!--
    <v-footer v-if="isLoggedIn" absolute class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
    -->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from './views/Login.vue'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'http403Error',
      'isAdmin',
      'userID'
    ]),
    userIcon () {
      if (this.isAdmin) {
        return 'supervisor_account'
      }
      return 'person'
    }
  },
  components: {
    Login
  },
  data () {
    return {
      drawer: false,
      showLoggingOutDialog: false,
      youAreLoggedOut: false,
      noti: {
        show: false,
        color: '',
        msg: '',
        timeout: 3000
      },
      navItems: [
        { icon: 'apps', title: 'Main', to: '/' },
        { icon: 'apps', title: 'About', to: '/about' },
        { icon: 'settings', title: 'Settings', to: '/settings' },
        { icon: 'settings', title: 'User Management', to: '/user_management' }
      ],
      progressIndicator: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    doLogout () {
      const self = this

      console.log('logout called')
      this.showProgressIndicator('Logging Out...')
      setTimeout(() => {
        self.$store.dispatch('logout', (err) => {
          this.hideProgressIndicator()

          if (err) {
            console.log('logout failed' + err)
            self.showNotification('logout failed', 'error')
            return
          }
          console.log('logout success')
        })
      }, 1000)
    },
    forceLogout () {
      console.log('forcing Logout')
      this.youAreLoggedOut = false
      this.$store.dispatch('forceLogout')
    },
    showNotification (msg, color) {
      const self = this

      self.noti.show = false
      setTimeout(() => {
        self.noti.msg = msg
        self.noti.color = color
        self.noti.show = true
      }, 250)
    },
    addNotify (noti) {
      this.showNotification(noti.msg, noti.color)
    },
    performLoginStartup () {
      console.log('###### performLoginStartup')
      this.drawer = false
      this.$store.dispatch('initializeTime')
    },
    performLogoutCleanup () {
      console.log('###### performLogoutCleanup')
      this.$router.push('/')
      this.$store.dispatch('deinitializeTime')
    },
    showProgressIndicator (msg) {
      this.progressIndicator.message = msg
      this.progressIndicator.show = true
    },
    hideProgressIndicator () {
      this.progressIndicator.message = ''
      this.progressIndicator.show = false
    }
  },
  watch: {
    isLoggedIn (newVal, oldVal) {
      if (oldVal === false && newVal === true) {
        // new just logged in
        // XXX do anything necessary that should be done
        // after user login
        this.performLoginStartup()
      } else if (oldVal === true && newVal === false) {
        // new just logged out
        // XXX do anything necessary that should be done
        // after user logged out
        this.performLogoutCleanup()
      }
    },
    http403Error (newVal, oldVal) {
      if (oldVal === false && newVal === true) {
        // this means we are logged out
        console.log('http403Error occurred')
        this.youAreLoggedOut = true
      }
    }
  },
  mounted () {
    console.log('#### mounted')
    if (this.isLoggedIn === true) {
      this.performLoginStartup()
    }
  }
}
</script>
