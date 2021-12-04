<template>
  <v-app id="inspire">
    <userNav></userNav>
    <v-main>
      <v-container fluid>
        <v-form ref="form">
          <v-alert
            dismissible
            shaped
            text
            v-if="message"
            :type="successful ? 'success' : 'error'"
            >{{ message }}</v-alert
          >
          <v-text-field
            cols:10
            height="350"
            class="d-flex pa-5 display-1"
            solo
            :rules="messageRules"
            placeholder="Écrire un message..."
            clearable
            v-model="input"
            @keydown.enter.prevent="postMessage()"
            whitespace
          ></v-text-field>
        </v-form>
        <v-card class="ma-3 animate__zoomIn animate__animated">
          <v-card-title>{{ currentUser.fullName }}</v-card-title>
          <v-card-text>{{ input }}</v-card-text>
        </v-card>
        <div class="d-flex justify-center">
          <v-btn @click="postMessage()" class="success">Envoyer</v-btn>
        </div>
      </v-container>
      <v-divider></v-divider>

      <div class="d-flex align-center">
        <h1 class="ma-3">Flux d'activité</h1>
        <v-btn v-if="showFlux" @click="showFlux = !showFlux" class="info d-flex"
          >Cacher</v-btn
        >
        <v-btn v-else @click="showFlux = !showFlux" class="info d-flex"
          >Afficher</v-btn
        >
      </div>
      <v-container fluid v-show="showFlux" class="modal">
        <v-card
          class="ma-3 animate__lightSpeedInLeft"
          v-for="message in messageData"
          :key="message.createdAt"
          @click="messageDetail(message.id)"
          link
        >
          <v-card-title>{{ message.author }}</v-card-title>
          <v-card-text>{{ message.message }}</v-card-text>
          <v-card-subtitle
            >Le
            {{
              message.createdAt.slice(0, 10).split("-").reverse().join("/") +
              " à " +
              message.createdAt.slice(11, 16)
            }}</v-card-subtitle
          >
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import userNav from "../components/userNav.vue";
import UserService from "../services/userRequest.js";
import Message from "../models/message";
export default {
  components: { userNav },
  data: () => ({
    successful: false,
    showFlux: false,
    input: "",
    message: "",
    author: new Message("", "", ""),
    messageData: [],
    messageRules: [
      (v) => !!v || "Message non conforme!",
      (v) =>
        (v && v.length <= 2000 && v.length >= 1) ||
        "Doit contenir minimum 1 caractères",
    ],
  }),
  created() {
    UserService.getAllMessage()
      .then((response) => {
        const messages = response.data;
        for (const messageApi of messages) {
          this.messageData.push(messageApi);
        }
      })
      .then(() => {
        const speed = document.getElementsByClassName(
          "animate__lightSpeedInLeft"
        );
        for (const light of speed) {
          light.classList.add("animate__animated");
        }
      })

      .catch((error) => {
        this.message = error.response.data;
      });
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    messageDetail(id) {
      this.$router.push(`/MessageId/${id}`);
    },
    postMessage() {
      if (this.$refs.form.validate()) {
        UserService.postOneMessage(this.author).then(() => {
          console.log();
          console.log(this.$store.getters.user);
          this.successful = true;
          this.$refs.form.reset();
        });
      } else {
        this.message = "";
        this.successful = false;
      }
    },
  },
};
</script>
