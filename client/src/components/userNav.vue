  <template>
  <v-main style="box-shadow: none" class="overflow-hidden">
    <v-app-bar
      class="animate__animated animate__fadeInDown"
      light
      fixed
      src="../assets/icon.png"
    >
      <h1 class="title">Profil de {{ currentUser.fullName }}</h1>
      <v-spacer></v-spacer>
      <v-btn class="primary" @click.prevent="logOut"> Se déconnecter </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab class="primary-bg" link to="/userHome">
            <v-icon>mdi-home</v-icon>
          </v-tab>
          <v-tab class="primary-bg" link to="/UserProfile"
            ><v-icon>mdi-account</v-icon></v-tab
          >
          <v-tab class="primary-bg" link to="/userPost"
            ><v-icon>mdi-pen</v-icon></v-tab
          >
        </v-tabs>
      </template>
    </v-app-bar>

    <v-container style="height: 150px"></v-container>
  </v-main>
</template>

<script>
// Barre de navigation avec les données de l'utilisateur aprés connection
export default {
  name: "userNav",

  data() {
    return {
      drawer: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/SignIn");
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/SignIn");
    },
  },
};
</script>
<style>
.primary-bg:hover {
  background: #fd2d01 !important;
  -webkit-text-fill-color: rgb(255, 255, 255);
}
</style>
