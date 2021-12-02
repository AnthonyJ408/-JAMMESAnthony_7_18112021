<template>
  <v-app id="inspire">
    <userNav> </userNav>
    <v-main>
      <v-container fluid>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Recherche"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="message" :search="search"></v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import userNav from '../components/userNav.vue'
import UserService from '../services/userRequest.js'
export default {
  name: 'UserProfile',
  components: { userNav },
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Message',
        align: 'start',
        filterable: false,
        value: 'name'
      },
      { text: 'date', value: 'date' },
      { text: 'Trier par "like"' }
    ],
    message: [
      { date: 'response.data' }],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam']
    ]
  }),
  mounted () {
    console.log('lol')
    UserService.getPublicContent().then(
      (response) => {
        const messages = response.data
        for (const messageApi of messages) {
          this.message.push({ messageApi })
        }
      },
      (error) => {
        this.message = error.response.data
      }
    )
  }
}
</script>
