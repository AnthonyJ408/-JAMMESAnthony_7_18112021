<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="message">Message</label>
        <input
          type="text"
          class="form-control"
          id="message"
          required
          v-model="message.message"
          name="message"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="message.description"
          name="description"
        />
      </div>

      <button @click="saveMessage" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newMessage">Add</button>
    </div>
  </div>
</template>

<script>
import MessageDataService from "../services/MessageDataService";

export default {
  name: "add-message",
  data() {
    return {
      message: {
        id: null,
        message: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveMessage() {
      var data = {
        message: this.message.message,
        description: this.message.description
      };

      MessageDataService.create(data)
        .then(response => {
          this.message.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newMessage() {
      this.submitted = false;
      this.message = {};
    }
  }
}