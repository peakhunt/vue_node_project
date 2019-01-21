<template>
  <v-app dark>
    <div v-if="isLoggedIn">
      <v-toolbar>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

        <v-toolbar-title class="white--text">
          <span class="font-weight-light">Your App</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <!--
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat> {{ $route.name }}</v-btn>
        </v-toolbar-items>
        -->
      </v-toolbar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
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
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <router-view/>
      </v-content>
    </div>

    <v-content v-if="!isLoggedIn">
      <login/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from './views/Login.vue'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  components: {
    Login
  },
  data () {
    return {
      drawer: false,
      navItems: [
        { icon: 'apps', title: 'Main', to: '/' },
        { icon: 'apps', title: 'About', to: '/about' }
      ]
    }
  }
}
</script>
