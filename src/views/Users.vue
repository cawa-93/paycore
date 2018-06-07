<template>
  <el-container>
    <el-header class='header'>
      <el-row type='flex' class='row-bg' justify='space-between'>
        <el-col :span='12'><logo class='logo'></logo></el-col>
        <el-col :span='2'>
          <el-button type='primary' circle @click='logOut' title='logout'>
            <font-awesome-icon icon='sign-out-alt' />
          </el-button>
        </el-col>
      </el-row>

    </el-header>
    <el-container>
      <el-aside width='200px'>
        <router-link to='/'>Home</router-link>
      </el-aside>
      <el-main>
        <template v-if='users && users.records'>
          <el-table
            :data='users.records'>
            <el-table-column
              prop='name'
              label='Name'>
            </el-table-column>
            <el-table-column
              prop='contact.email'
              label='Email'>
            </el-table-column>
            <el-table-column
              prop='contact.phoneNumber'
              label='Phone number'>
            </el-table-column>
            <el-table-column
              prop='contact.countryCode'
              label='Country code'>
            </el-table-column>
            <el-table-column
              prop='members.length'
              label='Organizations'>
            </el-table-column>
            <el-table-column
              prop='banExpiryDate'
              label='Ban expiry date'>
            </el-table-column>
            <el-table-column
              prop='createdAt'
              label='Created at'>
            </el-table-column>
          </el-table>

          <el-pagination
            class='pagination'
            background
            layout='prev, pager, next'
            :total.sync='users.totalRecords' :page-size='table.pageSize' :current-page.sync='table.pageNumber'>
          </el-pagination>

        </template>

      </el-main>
    </el-container>
    <el-footer class='footer'>Footer</el-footer>
  </el-container>
</template>

<script>
import axios from 'axios'
import logo from '@/components/logo'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
  name: 'Users',
  components: {FontAwesomeIcon, logo},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.$store.getters.isUserAuth) {
        vm.$router.replace({name: 'login'})
      }
    })
  },
  data () {
    return {
      table: {
        loading: false,
        sort: {
          date: 'asc'
        },
        pageSize: 10,
        pageNumber: 1
      }
    }
  },
  asyncComputed: {
    async users () {
      if (!this.$store.getters.isUserAuth) {
        return null
      }
      try {
        const {data} = await axios.post('https://sandbox.sdk.finance/api/v1/users/view', {
          pageSize: this.table.pageSize,
          pageNumber: this.table.pageNumber - 1,
          sort: this.table.sort
        }, {
          headers: {
            Authorization: `TOKEN ${this.$store.state.user.authorizationToken.token}`
          }
        })

        return data
      } catch (e) {
        if (e.response) {
          console.error(e.response)
          this.$notify.error({
            title: 'Connection error',
            message: e.response.data
          })
        } else {
          this.$notify.error({
            title: e.toString(),
            message: e.stack
          })
          console.error(e)
        }
      }
      return null
    }
  },
  methods: {
    logOut () {
      this.$store.commit('initUser', {})
      this.$router.replace({name: 'login'})
    }
  }
}
</script>

<style scope lang="scss">
$space: 50px;
.header {
  margin-bottom: $space;
}
.logo {
  height: 60px;
}
.pagination {
  margin-top: $space/2;
}
.footer {
  margin-top: $space;
}
</style>
