<template>
  <v-app style="background: #e3e3e3">
    <v-main>
      <userNav></userNav>
      <v-container>
        <v-container>
          <v-form>
            <v-row>
              <v-text-field
                class="form-control rounded-0"
                label="Recherche"
                prepend-inner-icon="mdi-magnify"
                type="text"
                outlined
              ></v-text-field
            ></v-row> </v-form
        ></v-container>
        <v-divider></v-divider>
        <v-container>
          <wallMessage
            v-for="message in getAllMessages.data"
            :id="message.id"
            :author="message.author"
            :userId="message.userId"
            :title="message.title"
            :description="message.description"
            :image="message.fileUrl"
            :createdAt="message.createdAt"
            :key="message.id"
          >
          </wallMessage>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import wallMessage from "../components/wallMessage.vue";
import userNav from "../components/userNav.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { userNav, wallMessage },
  data: () => ({}),

  methods: {
    ...mapActions({
      loadPosts: "loadPosts",
      loadUsers: "loadUsers",
      loadComments: "loadComments",
    }),
  },
  mounted() {
    this.loadPosts();
  },

  computed: {
    ...mapGetters({
      getAllMessages: "getAllMessages",
      getAllUsers: "getAllUsers",
      getAllComments: "getAllComments",
    }),
    user() {
      try {
        const users = this.getAllUsers.data;
        return (
          users.find((user) => localStorage.getItem("id") == user.id) || {
            fullName: null,
          }
        );
      } catch (err) {
        return err;
      }
    },
  },
};
</script>
<style >
.v-input__slot {
  background: white !important;
}
</style>
