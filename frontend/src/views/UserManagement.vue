<template>
  <v-container fluid grid-list-lg>
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <div>
              <div class="headline">User Management</div>
            </div>
            <v-spacer/>
            <v-btn color="primary" dark class="mb-2" @click="newUserClicked">New User</v-btn>
          </v-card-title>

          <v-card-text>
            <v-data-table
             hide-actions
             :headers="headers"
             :items="users"
             item-key="id"
             class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td width="200px">{{ props.item.id}} </td>
                <td width="50px">{{ props.item.admin ? 'Yes' : 'No'}} </td>
                <td>
                  <v-icon small class="mr-2" @click="editItem(props.item)" :disabled="props.item.id==='admin' || props.item.id===$store.getters.userID">edit</v-icon>
                  <v-icon small @click="deleteItem(props.item)" :disabled="props.item.id==='admin' || props.item.id===$store.getters.userID">delete</v-icon>
                </td>
              </template>
            </v-data-table>
          </v-card-text>

          <v-card-actions>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>

    <user-mgmt-dialog :options="userMgmtDialogOpts" @close="onUserDialogClose" @cancel="onUserDialogCancel"/>

    <v-dialog v-model="delUserDialogOpts.show" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Delete {{delUserDialogOpts.id}} ?</v-card-title>
        <v-card-text>Are you sure you wanna delete {{delUserDialogOpts.id}}?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="delUser">OK</v-btn>
          <v-btn flat color="primary" @click="delUserDialogOpts.show = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import UserMgmtDialog from './UserMgmtDialog'

export default {
  name: 'UserManagement',
  components: {
    UserMgmtDialog
  },
  computed: {
    ...mapGetters([
      'userID'
    ])
  },
  data () {
    return {
      users: [],
      headers: [
        {
          text: 'User ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        {
          text: 'Admin Cap',
          sortable: false,
          value: 'admin'
        },
        {
          text: 'Actions',
          sortable: false,
          value: 'admin'
        }
      ],
      userMgmtDialogOpts: {
        show: false,
        title: 'Test Title',
        addMode: true,
        id: '',
        password1: '',
        password2: '',
        admin: false
      },
      delUserDialogOpts: {
        id: '',
        show: false
      }
    }
  },
  methods: {
    retrieveAllUsers () {
      const self = this

      this.$store.dispatch('getAllUsers', (err, res) => {
        self.$emit('hideProgress')
        if (err) {
          console.log('failed to get all users')
          this.$emit('add-notify', { msg: 'failed to retrieve users info from server', color: 'error' })
          return
        }
        console.log(res.users)
        self.users = res.users
      })
    },
    editItem (item) {
      this.userMgmtDialogOpts.title = 'Change User Info'
      this.userMgmtDialogOpts.addMode = false

      this.userMgmtDialogOpts.id = item.id
      this.userMgmtDialogOpts.password1 = ''
      this.userMgmtDialogOpts.password2 = ''
      this.userMgmtDialogOpts.admin = item.admin

      this.userMgmtDialogOpts.show = true
    },
    deleteItem (item) {
      this.delUserDialogOpts.id = item.id
      this.delUserDialogOpts.show = true
    },
    doAddNewUser () {
      const self = this

      self.$store.dispatch('addNewUser', {
        id: self.userMgmtDialogOpts.id,
        password: self.userMgmtDialogOpts.password1,
        admin: self.userMgmtDialogOpts.admin,
        cb: (err) => {
          if (err) {
            self.$emit('add-notify', { msg: `failed to add user ${this.userMgmtDialogOpts.id}`, color: 'error' })
            return
          }
          self.retrieveAllUsers()
        }
      })
    },
    addNewUser () {
      const self = this

      self.$emit('showProgress', 'Adding New User...')
      setTimeout(() => {
        self.doAddNewUser()
      }, 500)
    },
    doUpdateUser () {
      const self = this

      self.$store.dispatch('updateUser', {
        id: self.userMgmtDialogOpts.id,
        password: self.userMgmtDialogOpts.password1,
        admin: self.userMgmtDialogOpts.admin,
        cb: (err) => {
          if (err) {
            self.$emit('add-notify', { msg: `failed to update user ${this.userMgmtDialogOpts.id}`, color: 'error' })
            return
          }
          self.retrieveAllUsers()
        }
      })
    },
    updateUser () {
      const self = this

      self.$emit('showProgress', 'Updating User...')
      setTimeout(() => {
        self.doUpdateUser()
      }, 500)
    },
    doDelUser () {
      const self = this

      self.$store.dispatch('delUser', {
        id: self.delUserDialogOpts.id,
        cb: (err) => {
          if (err) {
            self.$emit('add-notify', { msg: `failed to del user ${this.delUserDialogOpts.id}`, color: 'error' })
            return
          }
          self.retrieveAllUsers()
        }
      })
    },
    delUser () {
      const self = this

      self.delUserDialogOpts.show = false
      self.$emit('showProgress', 'Deleting User...')

      setTimeout(() => {
        self.doDelUser()
      }, 500)
    },
    newUserClicked () {
      this.userMgmtDialogOpts.title = 'Add New User'
      this.userMgmtDialogOpts.addMode = true

      this.userMgmtDialogOpts.id = ''
      this.userMgmtDialogOpts.password1 = ''
      this.userMgmtDialogOpts.password2 = ''
      this.userMgmtDialogOpts.admin = false

      this.userMgmtDialogOpts.show = true
    },
    onUserDialogClose () {
      var self = this

      self.userMgmtDialogOpts.show = false

      if (self.userMgmtDialogOpts.addMode) {
        self.addNewUser()
      } else {
        self.updateUser()
      }
    },
    onUserDialogCancel () {
      this.userMgmtDialogOpts.show = false
    }
  },
  created () {
    this.retrieveAllUsers()
  }
}
</script>

<style scoped>
</style>
