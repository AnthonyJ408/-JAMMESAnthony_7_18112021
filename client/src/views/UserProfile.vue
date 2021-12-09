<template>
  <v-app>
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
      user: this.$store.state.auth.user,
    };
  },
  methods: {
    ...mapActions({ deleteUser: "deleteUser" }),
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
    const name = this.user.fullName.split(" ");
    this.user.firstName = name[0];
    this.user.lastName = name[1];

    return;
  },
};
</script>