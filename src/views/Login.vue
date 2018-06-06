<template>
  <div class='home'>
    <el-card class='box-card'>
      <login-form></login-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/login-form.vue'

export default {
  name: 'home',
  components: {
    LoginForm
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
