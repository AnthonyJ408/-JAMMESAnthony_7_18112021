<template>
  <v-app>
    <userNav> </userNav>
    <v-main>
      <v-container>
        <v-card
          v-if="load == true"
          class="ma-3 animate__animated animate__slow"
          link
        >
          <v-card-title>{{ message.author }}</v-card-title>
          <v-card-text>{{ message.message }}</v-card-text>
          <v-card-subtitle
            >Le
            {{
              message.createdAt.slice(0, 10).split("-").reverse().join("/") +
              " à " +
              message.createdAt.slice(11, 16)
            }}</v-card-subtitle
          >
          <v-card-actions>
            <v-btn class="warning">Modifier</v-btn>
            <v-btn class="error">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import UserService from "../services/userRequest.js";
import userNav from "../components/userNav.vue";
export default {
  components: { userNav },
  data() {
    return {
      message: {},
      id: this.$route.params.id,
      load: "",
    };
  },
  created() {
    UserService.getOneMessage(this.id).then((data) => {
      this.message = data.data;
      this.load = true;
    });
  },
};
</script>
