import axios from 'axios';
import jwtDecode from 'jwt-decode';

function authenticate(credentials) {
  const url = "http://localhost:8000/api/login_check";

  return axios.post(url, credentials)
    .then(res => res.data.token)
    .then(token => {
      window.localStorage.setItem('authToken', token);
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      return true;
    });
}

function registerUser(credentials, url) {
  return axios({
    method: 'post',
    url,
    data: credentials
  }).then((res) => res.data);

}

function EmailPassword(email, url) {
  return axios({
    method: 'post',
    url,
    data: email
  }).then((res) => res.data);

}

function ChangePassword(data) {
  const url = `${process.env.REACT_APP_API_PATH}/password/forgotpassword`;
  let config = {
    headers: {
      'Authorization': 'Bearer ' + data.token
    }
  }
  return axios({
    method: 'post',
    url,
    data: data,
    config
  }).then((res) => res.data);
}

function logout() {

  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function verificate() {

  const token = window.localStorage.getItem("authToken");
  if (token) {
    const {
      exp: expiration
    } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      return true
    } else {
      logout();
      return false
    }

  }
  return false;

}
const getIdUser = () => {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const {
      id
    } = jwtDecode(token);
    return id;
  }
}
export default {
  authenticate,
  logout,
  verificate,
  registerUser,
  EmailPassword,
  ChangePassword,
  getIdUser
};