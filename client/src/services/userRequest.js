import axios from 'axios';
import authHeader from './authHeader';
const API_URL = 'http://localhost:3000/api';

class UserService {
  getAllMessage() {
    return axios.get(API_URL + '/messages', { headers: authHeader() });
  }
  getOneMessage(id) {
    return axios.get(API_URL + '/messages/:' + id, { headers: authHeader() });
  }
  postMessage(fd) {
    return axios.post(API_URL + '/messages', fd, { headers: authHeader() });
  }
  updateMessage(fd) {
    return axios.post(API_URL + `/messages/${fd.get('id')}`, fd, {
      headers: authHeader(),
    });
  }
  deleteMessage(id) {
    return axios.delete(API_URL + `/messages/${id}`, {
      headers: authHeader(),
    });
  }
  getAllUsers() {
    return axios.get(API_URL, '/auth/users', { headers: authHeader() });
  }
  deleteUser(id) {
    return axios.delete(API_URL + 'auth/users/' + id, {
      headers: authHeader(),
    });
  }
  postComment(comment) {
    return axios.post(API_URL, '/comments' + comment, {
      headers: authHeader(),
    });
  }
  getAllComment() {
    return axios.get(API_URL, '/comments', { headers: authHeader() });
  }
}

export default new UserService();
