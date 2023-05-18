<template>
  <form @submit.prevent="login">
    <label for="username">Username:</label>
    <input v-model="username" id="username" type="text" required>

    <label for="password">Password:</label>
    <input v-model="password" id="password" type="password" required>

    <button type="submit">Login</button>
  </form>
</template>

<script>
import axios from 'axios'
import SecureLS from 'secure-ls'

let secureLS = new SecureLS({ encodingType: 'aes' })

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  name: 'Login',
  methods: {
    async login() {
      try {
        // replace with your actual login API endpoint
        const response = await axios.post('http://localhost:8000/api/token/', {
          username: this.username,
          password: this.password
        })
        secureLS.set('access', response.data.access)
        this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        this.$router.push({ name: 'Fail' })
      }
    }
  }
}
</script>

<style scoped>
</style>

