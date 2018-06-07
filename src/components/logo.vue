<template>
  <router-link :to='to' class='logo-link'>
    <img src='https://fakeimg.pl/400x150/' :alt='alt'>
  </router-link>
</template>

<script>
export default {
  name: 'logo',
  props: {
    to: {
      type: [String, Object],
      default: '/'
    },
    alt: {
      type: String,
      default: 'Site logo'
    }
  }
}
</script>

<style scoped>
.logo-link,
.logo-link img {
  display: block;
  max-height: 100%;
}
.logo-link img {
  height: 100%;
  width: 100%;

}
</style>
