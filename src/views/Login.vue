<template>
  <div class='home'>
    <logo class='logo'></logo>
    <el-card class='box-card'>
      <login-form @login='saveUser'></login-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/login-form.vue'
import logo from '@/components/logo'

export default {
  name: 'home',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.getters.isUserAuth) {
        vm.$router.replace({name: 'users'})
      }
    })
  },
  components: {
    LoginForm,
    logo
  },
  methods: {
    saveUser (authData) {
      this.$store.commit('initUser', authData)
      this.$router.replace({name: 'users'})
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  flex-direction: column
}

.logo {
  margin-bottom: 50px;
}
</style>
