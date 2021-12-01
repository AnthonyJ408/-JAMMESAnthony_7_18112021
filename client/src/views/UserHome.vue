<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
import UserRequest from '../services/userRequest'

export default {
  name: 'UserHome',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    UserRequest.getPublicContent().then(
      response => {
        this.content = response.data
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
      }
    )
  }
}
</script>
