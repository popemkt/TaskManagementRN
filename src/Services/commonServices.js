import { Alert } from 'react-native';
import { BASE_URL } from '../Constants/configs';
import axios from 'axios';

export async function login(username, password) {

  let response = axios.get(
    `${BASE_URL}Home/?username=${username}&password=${password}`,
  );
  return response;
}
