import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = 'http://localhost:3000/api/auth/';
// Requête axios pour l'authentification

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password,
      })
      .then((token) => {
        localStorage.setItem('token', JSON.stringify(token.data));
        const decodedToken = jwt_decode(token.data.accessToken);
        return decodedToken;
      });
  }

  logout() {
    localStorage.removeItem('posts');
    localStorage.removeItem('token');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
