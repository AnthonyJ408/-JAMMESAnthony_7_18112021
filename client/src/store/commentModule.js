import userRequest from '../services/userRequest';

const initialState = {
  comments: [],
};
export const comment = {
  state: initialState,
  getters: {
    getAllComments: (state) => state.comments,
  },

  actions: {
    addComment({ commit }, comment) {
      return userRequest
        .addComment(comment)
        .then((response) => {
          console.log(response);
          commit('addComment', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async loadComments({ commit }) {
      return userRequest
        .getAllComment()
        .then((response) => {
          console.log(response);
          commit('getComment', response.data);
          localStorage.setItem('comments', JSON.stringify(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    getComment: (state, comments) => (state.comments = comments),
    addComment: (state, comment) => state.comments.unshift(comment),
  },
};
