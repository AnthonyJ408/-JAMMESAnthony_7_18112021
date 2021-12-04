<template>
  <v-app id="inspire">
    <userNav> </userNav>
    <v-main>
      <v-container fluid>
        <messagePost></messagePost>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import messagePost from "../components/messagePost.vue";
import userNav from "../components/userNav.vue";
export default {
  name: "UserPost",
  components: { messagePost, userNav },
  data: () => ({}),
};
</script>
