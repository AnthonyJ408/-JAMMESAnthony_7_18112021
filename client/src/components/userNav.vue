
  <template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../assets/icon.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item >
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ currentUser.fullName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link to="/userHome">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Accueil</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/userProfile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Mon compte</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/Favorites">
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Favoris</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/UserPost">
        <v-list-item-icon>
          <v-icon>mdi-lead-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Ecrire un message</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click.prevent="logOut" block> Se déconnecter </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'userNav',
  data () {
    return {
      drawer: null
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  mounted () {
    if (!this.currentUser) {
      this.$router.push('/SignIn')
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/SignIn')
    }
  }
}
</script>
