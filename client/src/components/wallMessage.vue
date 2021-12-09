<template>
  <div>
    <v-container style="max-width: 1185px">
      <v-card id="link" class="animate__jackInTheBox animate__animated"
        ><router-link
          style="text-decoration: none"
          :to="{ name: 'MessageId', params: { id } }"
          ><v-card-title style="color: black">{{ title }}</v-card-title>
          <v-img rounded v-if="image" :src="image" alt="Image" contain></v-img>
          <v-card-text style="color: black">
            <p>{{ description }}</p>
            <p>
              Par {{ author }} le
              {{ formatedDate }}
            </p>
          </v-card-text>
        </router-link>
        <v-card-text>
          <v-form method="post">
            <v-text-field
              v-model="comment"
              type="text"
              required
              placeholder="Écrire un commentaire"
            ></v-text-field
          ></v-form>
          <v-btn class="success" @click="onSendComment">Envoyer</v-btn>
        </v-card-text>
      </v-card></v-container
    >

    <v-container
      ><wallComment
        v-show="show"
        v-for="comment in rightComment"
        :id="comment.id"
        :userId="comment.userId"
        :postId="comment.postId"
        :comment="comment.comment"
        :createdAt="comment.createdAt"
        :key="comment.id"
      ></wallComment
    ></v-container>
  </div>
</template>

<script>
// Page d'accueil avec affichage des composants wallMessage et wallComment
import wallComment from "../components/wallComment";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "wallMessage",
  props: ["id", "title", "description", "image", "author", "createdAt"],
  components: { wallComment },
  data() {
    return {
      comment: "",
      showPost: true,
      formatedDate: "",
    };
  },
  // Date formatée à la date locale
  mounted() {
    let objDate = new Date(this.createdAt);
    return (this.formatedDate = objDate.toLocaleString("fr-FR"));
  },
  // Récupére les getters enregistrées dans vueex
  computed: {
    ...mapGetters({
      getAllComments: "getAllComments",
      getAllMessages: "getAllMessages",
      getAllUsers: "getAllUsers",
    }),
    rightComment() {
      try {
        const comments = this.getAllComments.data;
        return comments.filter((comment) => this.id == comment.postId);
      } catch (err) {
        return err;
      }
    },
  },

  methods:
    // Récupére les actions enregistrées dans vueex
    {
      ...mapActions({
        addComment: "addComment",
        loadComments: "loadComments",
      }),
      //Commentaires en cours de dev
      onSendComment() {
        try {
          if (this.comment !== "") {
            this.addComment({
              comment: this.comment,
              postId: this.postId,
            });
            this.comment = "";
          }
        } catch (err) {
          return err;
        }
      },
    },
};
</script>
<style>
#link {
  color: black !important;
  text-decoration: none !important;
  background: url("../assets/icon.png") center;
}
</style>