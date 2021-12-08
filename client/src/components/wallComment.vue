<template>
  <v-container>
    <v-avatar class="mr-2"></v-avatar>
    <div id="comment">
      <h6>{{ user.fullName }}</h6>
      <div class="card-text text-left">{{ comment }}</div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "wallComment",
  props: ["id", "comment", "userId", "postId", "createdAt"],
  computed: {
    user() {
      try {
        const users = this.getAllUsers.data;
        console.log(users);
        return (
          users.find((user) => this.id == user.id) || {
            fullName: "",
          }
        );
      } catch (err) {
        return err;
      }
    },
  },
};
</script>