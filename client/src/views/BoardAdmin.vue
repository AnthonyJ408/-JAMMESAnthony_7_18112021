<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import UserRequest from '../services/userRequest'

export default {
  name: 'BoardAdmin',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    UserRequest.getUAdminBoard().then(
      (response) => {
        this.content = response.data
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
      }
    )
  }
}
</script>
