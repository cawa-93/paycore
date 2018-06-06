<template>
  <div>
    <el-alert v-for='(alert, i) in alerts'
              :key='i'
              :title='alert.title'
              :type='alert.type || "error"'
              @close='deleteAlert(i)'>
    </el-alert>
    <el-form label-position='right' label-width='100px' :model='form' :rules='rules' ref='loginForm' @validate='onValidate'>
      <el-form-item label='Login' prop='login'>
        <el-input type='email' autofocus v-model.trim='form.login'></el-input>
      </el-form-item>
      <el-form-item label='Password' prop='password'>
        <el-input type='password' v-model='form.password'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='onSubmit' :disabled='!isFormValid'>Sign in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login-form',
  data () {
    return {
      alerts: [
      ],
      form: {
        login: '',
        password: ''
      },
      validation: {
        login: false,
        password: false
      },
      rules: {
        login: [
          {required: true, message: 'Please input Login'}
        ],
        password: [
          {required: true, message: 'Please input password'}
        ]
      }
    }
  },
  computed: {
    isFormValid () {
      return this.validation.login && this.validation.password
    }
  },
  methods: {
    deleteAlert (index) {
      this.alerts.splice(index, 1)
    },
    onValidate (name, state) {
      this.validation[name] = state
    },
    async onSubmit () {
      try {
        const {data} = await axios.post('https://sandbox.sdk.finance/api/v1/authorization', {
          login: this.form.login,
          password: this.form.password
        })

        this.$emit('login', data)
      } catch (e) {
        if (e.response) {
          console.error(e.response)
          this.alerts.push({title: e.response.data.message})
        } else {
          console.error(e)
          this.alerts.push({title: e.toString()})
        }
      }
    }
  }
}
</script>

<style>
.el-alert {
  margin-bottom: 10px;
}
</style>
