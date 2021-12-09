<template>
  <v-app style="background: #e3e3e3">
    <v-container>
      <user-nav></user-nav>
      <v-card class="mx-auto ma-3">
        <h1 class="d-flex pa-5">Écrire un message:</h1>
        <v-form ref="form">
          <v-text-field
            v-model="newMessage.title"
            class="d-flex pa-5 animate__zoomInDown animate__animated"
            solo
            auto-grow
            clearable
            label="Entrer un titre"
          ></v-text-field>

          <v-textarea
            class="d-flex pa-5 animate__zoomInDown animate__animated"
            solo
            auto-grow
            placeholder="Écrire un message..."
            clearable
            v-model="newMessage.description"
          ></v-textarea>
          <v-file-input
            name="image"
            v-model="newMessage.image"
            @change="onFileSelected"
            class="d-flex pa-5 animate__zoomInDown animate__animated"
            accept="jpeg/png/jpg/gif"
            ref="file"
            label="File input"
          ></v-file-input>
          <div class="d-flex justify-center">
            <v-btn @click="onUpload" class="ma-4 success">Envoyer</v-btn>
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
  </v-app>
</template>

<script>
import UserNav from "../components/userNav.vue";
import Message from "../models/message";
export default {
  name: "UserPost",
  components: {
    UserNav,
  },
  data() {
    return {
      author: this.$store.state.auth.user.fullName,
      message: "",
      newMessage: new Message("", "", "", ""),
      successful: "",
    };
  },
  methods: {
    onFileSelected(event) {
      this.newMessage.image = event;
    },
    onUpload(e) {
      try {
        e.preventDefault();
        const fd = new FormData();
        fd.append("author", this.author);
        fd.append("file", this.newMessage.image);
        fd.append("title", this.newMessage.title);
        fd.append("description", this.newMessage.description);
        this.$store.dispatch("addPost", fd).then(() => {
          this.successful = true;
          this.message = "Message envoyé!";
          this.$refs.form.reset();
        });
      } catch (err) {
        this.message = "Mauvaise saisies!";
        return err;
      }
    },
  },
};
</script>
