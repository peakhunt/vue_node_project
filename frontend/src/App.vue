<template>
  <v-app dark>
    <v-toolbar v-if="isLoggedIn">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">Your App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" absolute temporary>
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
      <router-view v-if="isLoggedIn"/>
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
      <v-btn flat @click="noti.show = false">Close</v-btn>
    </v-snackbar>

    <v-dialog v-model="showLoggingOutDialog" persistent max-width="400px">
      <v-card color="primary">
        <v-card-text> Logging Out...
          <v-progress-linear
            indeterminate
            color="green"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-footer v-if="isLoggedIn" absolute class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
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
      'http403Error'
    ])
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
        { icon: 'settings', title: 'Settings', to: '/settings' }
      ]
    }
  },
  methods: {
    doLogout () {
      const self = this

      console.log('logout called')
      self.showLoggingOutDialog = true
      setTimeout(() => {
        self.$store.dispatch('logout', (err) => {
          self.showLoggingOutDialog = false
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
    performLoginStartup () {
      console.log('###### performLoginStartup')
      // XXX FIXME
    },
    performLogoutCleanup () {
      console.log('###### performLogoutCleanup')
      // XXX FIXME
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
