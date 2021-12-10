<template>
  <v-app style="background: #e3e3e3">
    <div class="container">
      <userNav></userNav>
    </div>

    <v-container>
      <v-form
        class="register animate__animated animate__rollIn"
        ref="form"
        lazy-validation
      >
        <v-divider class="ma-5"></v-divider>
        <v-text-field
          v-model="user.email"
          class="form-control rounded-0"
          label="Email"
          name="email"
          prepend-inner-icon="mdi-email"
          type="email"
          required
          outlined
        >
        </v-text-field>
        <v-divider class="ma-5"></v-divider>
        <v-text-field
          v-model="user.password"
          :counter="20"
          class="form-control rounded-0"
          label="Mot de passe"
          name="password"
          prepend-inner-icon="mdi-lock"
          type="password"
          required
          outlined
        >
        </v-text-field>
        <v-divider class="ma-5"></v-divider>
        <v-text-field
          v-model="user.lastName"
          :counter="15"
          required
          class="form-control rounded-0"
          label="Nom"
          name="lastName"
          prepend-inner-icon="mdi-account"
          type="text"
          outlined
        >
        </v-text-field>
        <v-divider class="ma-5"></v-divider>
        <v-text-field
          v-model="user.firstName"
          :counter="15"
          required
          class="form-control rounded-0"
          label="Prénom"
          name="firstName"
          prepend-inner-icon="mdi-account"
          type="text"
          outlined
        >
        </v-text-field>

        <v-row>
          <v-col class="col-6">
            <v-btn
              class="rounded-0 warning"
              @click="click = true"
              x-large
              block
            >
              Modifier</v-btn
            ></v-col
          >
          <v-col class="col-6">
            <v-btn class="rounded-0 error" @click="onDelete" x-large block>
              Supprimer</v-btn
            ></v-col
          >
        </v-row>
        <v-alert
          class="ma-6"
          dismissible
          shaped
          text
          v-if="click"
          :type="successful ? 'warning' : 'error'"
          >{{ message }}</v-alert
        >
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
//Page de profil avec suppression et modification(pour le moment pas fonctionel)
import userNav from "../components/userNav.vue";
import { mapActions } from "vuex";
export default {
  name: "UserProfile",
  components: { userNav },
  data() {
    return {
      successful: true,
      click: "",
      message: "Non fonctionel",
      user: "",
    };
  },
  methods: {
    ...mapActions({ deleteUser: "deleteUser" }),
    //Action vueex pour une requête delete de l'utilisateur avec retour sur la page de connexion
    async onDelete() {
      await this.deleteUser(this.user.id)
        .then(() => {
          this.$refs.form.reset();
          this.$store.dispatch("auth/logout");
          this.$router.push("/SignIn");
        })
        .catch(() => {
          this.successful = false;
          this.message = "Erreur!";
        });
    },
  },
  mounted() {
    const loggedUser = this.$store.state.auth.user;
    const name = loggedUser.fullName.split(" ");
    loggedUser.firstName = name[1];
    loggedUser.lastName = name[0];
    return (this.user = loggedUser);
  },
};
</script>