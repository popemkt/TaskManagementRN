import { Alert } from 'react-native';
import { BASE_URL } from '../Constants/configs';
import axios from 'axios';

export async function login(username, password) {
  // Alert.alert(BASE_URL + username + password);
  let response = axios.post(`${BASE_URL}Home/?username=admin&password=admin`, {
    Username: username,
    Password: password,
  });
  return response;
}
