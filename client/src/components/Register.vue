<template>
  <div>
    <input
    type="email"
    name="email"
    v-model="email"
    placeholder="email"/>
    <input
    type="password"
    name="password"
    v-model="password"
    placeholder="mot de passe"/>
    <div v-html="error" class="error" />
    <button
      @click="signup" >
      S'inscrire</button>
  </div>
</template>

<script>
import AuthServices from '@/services/AuthServices'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async signup () {
      try {
        await AuthServices.signup({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
