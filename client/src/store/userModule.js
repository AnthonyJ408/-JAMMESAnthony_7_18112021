import userRequest from '../services/userRequest';

const initialState = {
  users: [],
};
export const user = {
  state: initialState,
  getters: {
    getAllUsers: (state) => state.users,
  },

  actions: {
    async loadUsers({ commit }) {
      return userRequest
        .getAllUsers()
        .then((response) => {
          console.log(response);
          commit('storeUser', response.data);
          localStorage.setItem('users', JSON.stringify(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteUser({ commit }, id) {
      return userRequest
        .deleteUser(id)
        .then((response) => {
          console.log(response);
          commit('deletedUser', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mutations: {
    storeUser: (state, users) => (state.users = users),
    deletedUser: (state, id) =>
      (state.users = state.users.filter((user) => user.id !== id)),
  },
};
