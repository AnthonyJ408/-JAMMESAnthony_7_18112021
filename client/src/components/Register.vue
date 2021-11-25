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
    <button
      @click="register" >
      S'inscrire</button>

  </div>
</template>

<script>
import AuthServices from '@/services/AuthServices'
export default {
  data () {
    return {
      email: '',
      password:'',
    }
  },
  methods: {
    async register() {
      const response = await AuthServices.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
