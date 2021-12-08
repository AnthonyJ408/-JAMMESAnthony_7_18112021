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
        <v-row>
          <v-col>
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
            </v-text-field> </v-col
          ><v-col>
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
            </v-text-field
          ></v-col>
        </v-row>

        <v-container style="width: 20%">
          <v-btn class="rounded-0 warning" x-large block> Modifier</v-btn>
        </v-container>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
import userNav from "../components/userNav.vue";
export default {
  name: "UserProfile",
  components: { userNav },
  data() {
    return {
      user: this.$store.state.auth.user,
    };
  },
  mounted() {
    const name = this.user.fullName.split(" ");
    this.user.firstName = name[0];
    this.user.lastName = name[1];

    return console.log(name);
  },
};
</script>