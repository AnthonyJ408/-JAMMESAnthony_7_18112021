import userRequest from '../services/userRequest';

const initialState = {
  posts: [],
  addPostStatus: null,
  updatePostStatus: null,
};
export const message = {
  state: initialState,
  getters: {
    getAllMessages: (state) => state.posts,
    addPostStatus: (state) => state.addPostStatus,
    updatePostStatus: (state) => state.updatePostStatus,
  },
  actions: {
    async loadPosts({ commit }) {
      return userRequest
        .getAllMessage()
        .then((response) => {
          commit('getMessage', response);
          localStorage.setItem('posts', JSON.stringify(response.data));
          return Promise.resolve(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addPost({ commit }, fd) {
      try {
        const response = userRequest.postMessage(fd);
        commit('addStatus', true);
        commit('postMessage', response.data);
      } catch (err) {
        return commit('addStatus', false);
      }
    },
    deletePost({ commit }, requestId) {
      const messageId = requestId.messageId;
      const userId = requestId.userId;

      try {
        userRequest.deleteMessage(messageId, userId);
        commit('deleteMessage', requestId);
      } catch (err) {
        return commit('addStatus', false);
      }
    },
    async updatePost({ commit }, fd) {
      try {
        const response = userRequest.updateMessage(fd);

        commit('updateMessage', response.data);
        commit('putStatus', true);
      } catch (err) {
        commit('putStatus', false);
      }
    },
  },

  mutations: {
    getMessage: (state, posts) => (state.posts = posts),
    postMessage: (state, post) => state.posts.unshift(post),
    deleteMessage: (state, id) =>
      (state.posts = state.posts.filter((post) => post.id !== id)),
    updateMessage: (state, updatedPost) => {
      const index = state.posts.findIndex((post) => post.id === updatedPost.id);

      if (index !== -1) {
        state.posts.splice(index, 1, updatedPost);
      }
    },
    addStatus: (state, boolean) => (state.addPostStatus = boolean),
    putStatus: (state, boolean) => (state.updatePostStatus = boolean),
  },
};
