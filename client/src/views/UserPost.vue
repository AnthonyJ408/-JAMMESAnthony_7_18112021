<template>
  <v-app>
    <v-container>
      <user-nav></user-nav>
      <v-card class="mx-auto ma-3">
        <h1 class="d-flex pa-5">Écrire un message:</h1>
        <v-form ref="form">
          <v-text-field
            v-model="title"
            class="d-flex pa-5"
            solo
            auto-grow
            placeholder="Écrire un message..."
            clearable
            label="Entrer un titre"
          ></v-text-field>

          <v-textarea
            class="d-flex pa-5"
            solo
            auto-grow
            placeholder="Écrire un message..."
            clearable
            v-model="description"
          ></v-textarea>
          <v-file-input
            name="image"
            v-model="image"
            @change="onFileSelected"
            class="d-flex pa-5"
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
export default {
  name: "UserPost",
  components: {
    UserNav,
  },
  data() {
    return {
      author: this.$store.state.auth.user.fullName,
      message: "",
      successful: "",
      title: "",
      description: "",
      image: null,
    };
  },
  methods: {
    onFileSelected(event) {
      this.image = event;
    },
    onUpload(e) {
      try {
        e.preventDefault();
        const fd = new FormData();
        fd.append("author", this.author);
        fd.append("file", this.image);
        fd.append("title", this.title);
        fd.append("description", this.description);
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
