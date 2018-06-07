<template>
  <el-container>
    <el-header>
      <logo></logo>
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
            background
            layout='prev, pager, next'
            :total.sync='users.totalRecords' :page-size='table.pageSize' :current-page.sync='table.pageNumber'>
          </el-pagination>

        </template>

      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import axios from 'axios'
import logo from '@/components/logo'
export default {
  name: 'Users',
  components: {logo},
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
    }
  }
}
</script>

<style></style>
