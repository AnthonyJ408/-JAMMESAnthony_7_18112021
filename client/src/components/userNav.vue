
  <template>
  <v-card class="overflow-hidden">
    <v-app-bar
      class="animate__animated animate__fadeIn"
      light
      fixed
      src="../assets/icon.png"
    >
      <h1 class="title">Profil de {{ currentUser.fullName }}</h1>
      <v-spacer></v-spacer>
      <v-btn class="primary" @click.prevent="logOut"> Se déconnecter </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab class="primary-bg" link to="/userHome" rounded>
            <v-icon>mdi-home</v-icon>
          </v-tab>
          <v-tab class="primary-bg" link to="/userProfile"
            ><v-icon>mdi-account</v-icon></v-tab
          >
          <v-tab class="primary-bg" link to="/Favorites"
            ><v-icon>mdi-star</v-icon></v-tab
          >
          <v-tab class="primary-bg" link><v-icon>mdi-magnify</v-icon></v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet class="overflow-y-auto" max-height="100">
      <v-container style="height: 1000px"></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
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
#sheet {
  box-shadow: none;
  height: 120px;
}
</style>
