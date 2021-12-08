<template>
  <v-app>
    <userNav> </userNav>
    <v-main>
      <v-container>
        <v-card id="alone" class="ma-5 animate__animated animate__slow">
          <v-card-title>{{ post.author }}</v-card-title>
          <v-card-text>{{ post.description }}</v-card-text>
          <v-img
            :src="post.fileUrl"
            alt="Image"
            class="rounded-0"
            style="width: 100%"
          ></v-img>
          <v-card-subtitle
            >Le
            {{
              post.createdAt.slice(0, 10).split("-").reverse().join("/") +
              " à " +
              post.createdAt.slice(11, 16)
            }}</v-card-subtitle
          >
          <v-card-actions>
            <router-link
              style="text-decoration: none"
              :to="{ name: 'ModifyPost', params: { postId } }"
            >
              <v-btn class="ma-2 warning">Modifier</v-btn>
            </router-link>
            <v-btn @click="ondelete()" class="ma-2 error">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
        <v-alert
          dismissible
          dense
          text
          :type="successful ? 'success' : 'error'"
          v-if="message"
          >{{ message }}</v-alert
        >
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import userNav from "../components/userNav.vue";
export default {
  components: { userNav },
  data() {
    return {
      successful: "",
      message: "",
      postId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters({
      getAllMessages: "getAllMessages",
    }),
    post() {
      try {
        let posts = JSON.parse(localStorage.posts) || [];
        return posts.find((post) => this.postId == post.id);
      } catch (err) {
        return err;
      }
    },
  },
  methods: {
    ...mapActions({ deletePost: "deletePost" }),
    async ondelete() {
      await this.deletePost(this.postId)
        .then(() => {
          this.successful = true;
          this.message = "Message Supprimé";
          this.$router.push("/UserHome");
        })
        .catch(() => {
          this.successful = false;
          this.message = "Erreur!";
        });
    },
  },
};
</script>
<style>
#alone {
  color: black !important;
  text-decoration: none !important;
  background: linear-gradient(127deg, #ffd7d7, rgba(255, 255, 255, 0) 70.71%);
}
</style>