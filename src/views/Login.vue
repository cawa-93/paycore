<template>
  <div class='home'>
    <el-card class='box-card'>
      <login-form @login='saveUser'></login-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/login-form.vue'

export default {
  name: 'home',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.getters.isUserAuth) {
        vm.$router.replace('/about')
      }
    })
  },
  components: {
    LoginForm
  },
  methods: {
    saveUser (authData) {
      this.$store.commit('initUser', authData)
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}
</style>
