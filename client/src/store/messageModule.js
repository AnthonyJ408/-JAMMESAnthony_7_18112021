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
      return await userRequest
        .postMessage(fd)

        .then((response) => {
          commit('addStatus', true);
          commit('postMessage', response.data);

          return Promise.resolve(response);
        })
        .catch((err) => {
          console.log(err);
          commit('addStatus', false);
        });
    },
    async deletePost({ commit }, id) {
      return userRequest
        .deleteMessage(id)
        .then((response) => {
          commit('deleteMessage', id);
          return Promise.resolve(response);
        })
        .catch(() => {
          commit('addStatus', false);
        });
    },
    async updatePost({ commit }, formData) {
      return userRequest
        .updateMessage(formData)
        .then((response) => {
          commit('updateMessage', response.data);
          commit('putStatus', true);
          return Promise.resolve(response);
        })
        .catch((err) => {
          console.log(err);
          commit('putStatus', false);
        });
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
