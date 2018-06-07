<template>
  <el-menu :router='true'>

    <el-menu-item index='/'>
      <font-awesome-icon icon='home' class='el-icon-'/>
      <span>Login page</span>
    </el-menu-item>

    <el-menu-item @click='() => $emit("logout")'>
      <font-awesome-icon icon='sign-out-alt'  class='el-icon-' />
      <span>Logout</span>
    </el-menu-item>

    <el-submenu>
      <template slot='title'>
        <i class='el-icon-location'></i>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group title='Group One'>
        <el-menu-item>item one</el-menu-item>
        <el-menu-item>item one</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title='Group Two'>
        <el-menu-item>item three</el-menu-item>
      </el-menu-item-group>
      <el-submenu>
        <template slot='title'>item four</template>
        <el-menu-item>item one</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item>
      <i class='el-icon-menu'></i>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item disabled>
      <i class='el-icon-document'></i>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item>
      <i class='el-icon-setting'></i>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
  name: 'fake-menu',
  components: {FontAwesomeIcon}
}
</script>

<style>
.el-icon- {
  color:#909399
}
</style>
