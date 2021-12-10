export default function authHeader() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token && token.accessToken) {
    return { 'x-access-token': token.accessToken };
  } else {
    return {};
  }
}
