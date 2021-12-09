<template>
  <v-app>
    <userNav> </userNav>
    <v-main>
      <v-container class="animate__zoomInDown animate__animated" v-if="!modify">
        <v-card id="alone" class="ma-5 animate__animated animate__slow">
          <v-card-title>{{ post.title }}</v-card-title>

          <v-img
            :src="post.fileUrl"
            alt="Image"
            class="rounded-0"
            style="width: 100%"
          ></v-img
          ><v-card-text
            >{{ post.description }}
            <p>
              Par {{ post.author }} le
              {{
                post.createdAt.slice(0, 10).split("-").reverse().join("/") +
                " à " +
                post.createdAt.slice(11, 16)
              }}
            </p></v-card-text
          >
          <v-card-actions v-show="verif">
            <v-btn @click="modifyWanted()" class="ma-2 warning">Modifier</v-btn>

            <v-btn @click="ondelete(postId, user.id)" class="ma-2 error"
              >Supprimer</v-btn
            >
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
      <v-container v-else>
        <v-card class="mx-auto ma-3">
          <h1 class="d-flex pa-5">Modifier un message:</h1>
          <v-form ref="form">
            <v-text-field
              v-model="newMessage.title"
              class="d-flex pa-5 animate__rubberBand animate__animated"
              solo
              auto-grow
              clearable
              label="Entrer un titre"
            ></v-text-field>

            <v-text-field
              v-model="newMessage.description"
              class="d-flex pa-5 animate__rubberBand animate__animated"
              solo
              auto-grow
              placeholder="Écrire un message..."
              clearable
            ></v-text-field>
            <v-file-input
              v-model="newMessage.image"
              name="image"
              @change="onFileSelected"
              class="d-flex pa-5 animate__rubberBand animate__animated"
              accept="jpeg/png/jpg/gif"
              ref="file"
              label="File input"
            ></v-file-input>
            <div v-show="verif" class="d-flex justify-center">
              <v-btn @click="onUpdate" class="ma-4 warning">Modifier</v-btn>
              <v-btn @click="modify = false" class="ma-4 error">Retour</v-btn>
            </div>
          </v-form>

          <v-container
            ><v-alert
              dismissible
              dense
              text
              v-if="message"
              :type="successful ? 'success' : 'error'"
              >{{ message }}</v-alert
            ></v-container
          >
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import userNav from "../components/userNav.vue";
import Message from "../models/message";
export default {
  components: { userNav },
  data() {
    return {
      modify: "",
      newMessage: new Message("", "", "", ""),
      successful: "",
      message: "",
      postId: this.$route.params.id,
      user: this.$store.state.auth.user,
      verif: "",
    };
  },
  mounted() {
    if (this.user.fullName == this.post.author) {
      this.verif = true;
    } else if (this.user.roles[0] == "ROLE_ADMIN") {
      this.verif = true;
    }
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
    async ondelete(messageId, userId) {
      const requestId = {
        messageId: messageId,
        userId: userId,
      };
      await this.deletePost(requestId)
        .then(() => {
          this.successful = true;
          this.message = "Message supprimé!";
          this.$router.push("/UserHome");
          this.$refs.form.reset();
        })
        .catch(() => {
          this.successful = false;
          this.message = "Erreur!";
        });
    },
    onFileSelected(event) {
      this.newMessage.image = event;
    },

    modifyWanted() {
      return (this.modify = true);
    },
    onUpdate(e) {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.set("id", this.post.id);
        formData.append("file", this.newMessage.image);
        formData.set("title", this.newMessage.title);
        formData.set("description", this.newMessage.description);

        this.$store.dispatch("updatePost", formData).then(() => {
          this.successful = true;
          this.message = "Message modifié";
          this.$router.push("/UserHome");
          this.$refs.form.reset();
        });
      } catch (err) {
        this.successful = false;
        this.message = "Erreur!";
      }
    },
  },
};
</script>
<style>
#alone {
  color: black !important;
  text-decoration: none !important;
  background: url("../assets/icon.png") no-repeat center;
}
</style>