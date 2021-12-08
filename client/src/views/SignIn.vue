<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" sm="8" md="4" lg="4">
          <v-card elevation="0">
            <v-img
              class="animate__animated animate__flip"
              src="../assets/icon-above-font.png"
              alt="Groupomania"
              height="300"
            ></v-img>
            <v-card-text>
              <v-alert
                dismissible
                shaped
                text
                v-if="message"
                :type="successful ? 'success' : 'error'"
                >{{ message }}</v-alert
              >
              <v-form
                class="login animate__animated animate__rollIn"
                ref="form"
                v-model="valid"
                lazy-validation
                v-if="mode == 'login'"
              >
                <v-text-field
                  v-model="user.email"
                  :rules="emailRules"
                  class="form-control rounded-0"
                  label="Entrez votre email"
                  name="email"
                  prepend-inner-icon="mdi-email"
                  type="email"
                  outlined
                >
                </v-text-field>
                <v-text-field
                  autocomplete
                  v-model="user.password"
                  :rules="passwordRules"
                  :counter="20"
                  class="form-control rounded-0"
                  label="Entrez votre mot de passe"
                  name="password"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  outlined
                >
                </v-text-field>
                <v-btn
                  class="rounded-0 primary"
                  x-large
                  block
                  :disabled="!valid"
                  @click="handleLogin"
                >
                  Se connecter</v-btn
                >
                <v-card-actions class="text--secondary">
                  <v-spacer></v-spacer>
                  Pas de compte?
                  <a
                    @click="
                      triggerTransition('login', 'animate__rollOut', 'register')
                    "
                    class="pl-2 black--text"
                    >S'inscrire</a
                  >
                </v-card-actions>
              </v-form>
              <v-form
                class="register animate__animated animate__rollIn"
                ref="form"
                v-model="valid"
                lazy-validation
                v-else
              >
                <v-text-field
                  v-model="user.email"
                  :rules="emailRules"
                  class="form-control rounded-0"
                  label="Entrez votre email"
                  name="email"
                  prepend-inner-icon="mdi-email"
                  type="email"
                  outlined
                >
                </v-text-field>
                <v-text-field
                  autocomplete
                  v-model="user.password"
                  :counter="20"
                  :rules="passwordRules"
                  required
                  class="form-control rounded-0"
                  label="Entrez votre mot de passe"
                  name="password"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  outlined
                >
                </v-text-field>
                <v-text-field
                  v-model="user.lastName"
                  :counter="15"
                  :rules="lastNameRules"
                  required
                  class="form-control rounded-0"
                  label="Entrez votre nom"
                  placeholder="Entrez votre nom"
                  name="lastName"
                  prepend-inner-icon="mdi-account"
                  type="text"
                  outlined
                >
                </v-text-field>

                <v-text-field
                  v-model="user.firstName"
                  :counter="15"
                  :rules="firstNameRules"
                  required
                  class="form-control rounded-0"
                  label="Entrez votre prénom"
                  name="firstName"
                  prepend-inner-icon="mdi-account"
                  type="text"
                  outlined
                >
                </v-text-field>
                <v-btn
                  class="rounded-0 primary"
                  x-large
                  block
                  :disabled="!valid"
                  @click="handleRegister"
                >
                  S'inscrire</v-btn
                >

                <v-card-actions class="text--secondary">
                  <v-spacer></v-spacer>
                  Déjà membre?
                  <a
                    @click="
                      triggerTransition('register', 'animate__rollOut', 'login')
                    "
                    class="pl-2 black--text"
                    >Se connecter</a
                  >
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import User from "../models/user";
export default {
  name: "SignIn",
  data() {
    return {
      user: new User("", "", "", "", ""),
      submitted: false,
      successful: false,
      mode: "login",
      message: "",
      valid: true,
      firstNameRules: [
        (v) => !!v || "Prénom requis",
        (v) => (v && v.length <= 15) || "Doit contenir maximum 15 caractères",
      ],
      lastNameRules: [
        (v) => !!v || "Nom requis",
        (v) => (v && v.length <= 15) || "Doit contenir maximum 15 caractères",
      ],
      emailRules: [
        (v) => !!v || "E-mail requis",
        (v) => /.+@.+\..+/.test(v) || "E-mail non valide",
      ],
      passwordRules: [
        (v) => !!v || "Mot de passe requis",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            v
          ) ||
          "Le mot de passe doit contenir au moins 8 caractères un nombre, une majuscule, une minuscule et un caractère spécial ",
      ],
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/UserHome");
    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/UserHome");
            this.$refs.form.reset();
          },
          (error) => {
            console.log(error);
            this.message =
              error.response.data.message !== undefined
                ? error.response.data.error.errors[0].message
                : error.response.data;
          }
        );
      }
    },
    handleRegister() {
      this.user.fullName = this.user.lastName + " " + this.user.firstName;
      this.message = "";
      this.submitted = true;
      if (this.$refs.form.validate()) {
        this.$store.dispatch("auth/register", this.user).then(
          (data) => {
            console.log(data);
            this.message = data.message;
            this.successful = true;
            this.$refs.form.reset();
            this.mode = "login";
          },
          (error) => {
            console.log(error);
            this.message =
              error.response.data.error !== undefined
                ? error.response.data.error.errors[0].message
                : error.response.data.errors[0].msg;

            this.successful = false;
          }
        );
      }
    },
    triggerTransition(object, animation, mode) {
      const element = document.querySelector(`.${object}`);
      element.classList.add(`${animation}`);
      setTimeout(() => {
        this.mode = mode;
      }, 1000);
    },
  },
};
</script>
