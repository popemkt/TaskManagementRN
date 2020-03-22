import { BASE_URL } from '../Constants/configs';
import axios from 'axios';

export async function createUser(username, password, fullname, roleId) {
  let res = await axios.post(
    `${BASE_URL}User?Username=${username}&Password=${password}&Fullname=${fullname}&RoleId=${roleId}`,
  );
  return res;
}

export async function loadAllUsers(id) {
  let res = await axios.get(`${BASE_URL}User/Group/${id}`);
  return res;
}
