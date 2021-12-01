<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <v-img
                src="../assets/icon-above-font.png"
                alt="Groupomania"
                contain
                height="200"
              ></v-img>
              <v-card-text>
                <v-form
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
                    <v-progress-circular
                      v-show="loading"
                      indeterminate
                      color="primary"
                    >
                    </v-progress-circular>
                    Se connecter</v-btn
                  >
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    Pas de compte?
                    <a @click="switchToCreateAccount" class="pl-2 black--text"
                      >S'inscrire</a
                    >
                  </v-card-actions>
                </v-form>
                <v-form ref="form" v-model="valid" lazy-validation v-else>
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
                    :counter="10"
                    :rules="lastNameRules"
                    required
                    class="form-control rounded-0"
                    label="Entrez votre nom"
                    name="lastName"
                    prepend-inner-icon="mdi-account"
                    type="text"
                    outlined
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="user.firstName"
                    :counter="10"
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
                    <v-progress-circular
                      v-show="loading"
                      indeterminate
                      color="primary"
                    >
                    </v-progress-circular>
                    S'inscrire</v-btn
                  >
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    Déjà membre?
                    <a @click="switchToLogin" class="pl-2 black--text"
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
  </v-app>
</template>

<script>
import User from '../models/user'
export default {
  name: 'SignIn',

  data () {
    return {
      user: new User('', '', '', '', ''),
      submitted: false,
      successful: false,
      mode: 'login',
      loading: false,
      valid: true,
      firstNameRules: [
        (v) => !!v || 'Prénom requis',
        (v) => (v && v.length <= 10) || 'Doit contenir au moins 10 caractères'
      ],
      lastNameRules: [
        (v) => !!v || 'Nom requis',
        (v) => (v && v.length <= 10) || 'Doit contenir au moins 10 caractères'
      ],
      emailRules: [
        (v) => !!v || 'E-mail requis',
        (v) => /.+@.+\..+/.test(v) || 'E-mail non valide'
      ],
      passwordRules: [
        (v) => !!v || 'Mot de passe requis',
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            v
          ) ||
          'Le mot de passe doit contenir au moins 8 caractères un nombre, une majuscule, une minuscule et un caractère spécial '
      ]
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/UserHome')
    }
  },
  methods: {
    handleLogin  () {
      this.loading = true
      this.$refs.form.validate()
      if (this.$refs.form.validate() === true) {
        this.loading = false
        this.$store.dispatch('auth/login', this.user)
        this.$router.push('/UserHome')
        this.$refs.form.reset()
      } else {
        this.loading = false
      }
    },
    handleRegister () {
      this.user.fullName = this.user.lastName + ' ' + this.user.firstName
      this.message = ''
      this.submitted = true
      this.$refs.form.validate()
      if (this.$refs.form.validate() === true) {
        this.$store.dispatch('auth/register', this.user)
        this.successful = true
        this.$refs.form.reset()
        this.mode = 'login'
      } else {
        this.successful = false
      }
    },
    switchToCreateAccount () {
      this.mode = 'create'
    },
    switchToLogin () {
      this.mode = 'login'
    }
  }
}
</script>
