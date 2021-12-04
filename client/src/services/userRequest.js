import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3000/api/messages';

class UserService {
  getAllMessage() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  getOneMessage(id) {
    return axios.get(API_URL + '/' + id, { headers: authHeader() });
  }
  postOneMessage(user) {
    return axios.post(
      API_URL,
      {
        author: user.author,
        message: user.message,
        fileUrl: user.fileUrl,
      },
      { headers: authHeader() }
    );
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
