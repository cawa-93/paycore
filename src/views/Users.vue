<template>
  <el-container>
    <el-container>
      <el-aside width='200px'>
        <logo class='logo'></logo>
        <fake-menu @logout='logOut'></fake-menu>
      </el-aside>
      <el-main>
        <template v-if='users && users.records'>
          <el-table
            stripe
            :data='users.records'>
            <el-table-column
              prop='name'
              label='Name'
              min-width='150px'>
            </el-table-column>
            <el-table-column
              label='Email'
              min-width='150px'>
              <template slot-scope='scope'>
                <a :href='`mailto:${scope.row.contact.email}`' :title='`Email ${scope.row.contact.emailVerified ? "" : "not "}verified`'>
                  <el-tag :type='scope.row.contact.emailVerified ? "success" : "danger"'>
                    {{scope.row.contact.email}}
                  </el-tag>
                </a>
              </template>
            </el-table-column>
            <el-table-column
              label='Phone number'>
              <template slot-scope='scope'>
                {{scope.row.contact.phoneNumber || '—'}}
              </template>
            </el-table-column>
            <el-table-column
              label='Country code'>
              <template slot-scope='scope'>
                <el-tag v-if='scope.row.contact.countryCode'>
                  {{scope.row.contact.countryCode}}
                </el-tag>
                <span v-else>—</span>
              </template>
            </el-table-column>
            <el-table-column
              label='Organizations'>
              <template slot-scope='scope'>
                <el-tag>
                  {{scope.row.members.length}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label='Ban expiry date'>
              <template slot-scope='scope'>
                <time :datetime='scope.row.banExpiryDate' v-if='scope.row.banExpiryDate'>
                  {{new Date(scope.row.banExpiryDate).toLocaleString()}}
                </time>
                <span v-else>—</span>
              </template>
            </el-table-column>
            <el-table-column
              label='Created at'>
              <template slot-scope='scope'>
                <time :datetime='scope.row.createdAt' v-if='scope.row.createdAt'>
                  {{new Date(scope.row.createdAt).toLocaleString()}}
                </time>
                <span v-else>—</span>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class='pagination'
            background
            layout='total, prev, pager, next'
            :total.sync='users.totalRecords' :page-size='table.pageSize' :current-page.sync='table.pageNumber'>
          </el-pagination>

        </template>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
import logo from '@/components/logo'
import fakeMenu from '@/components/fake-menu'
export default {
  name: 'Users',
  components: {logo, fakeMenu},
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

<style scoped lang="scss">
$space: 50px;
.header {
  margin-bottom: $space;
}
.logo {
  height: auto;
  width: 100%;
}
.footer {
  margin-top: $space;
}
</style>

<style  lang="scss">
.pagination {
  margin-top: 20px;
  display: flex;
  .el-pagination__total {
    margin-right: auto;
    font-weight: bold;
  }
}

</style>
