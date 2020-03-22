import { Alert } from 'react-native';
import { BASE_URL } from '../Constants/configs';
import axios from 'axios';

export async function getAllGroups() {
  let res = await axios.get(`${BASE_URL}Group`);
  return res;
}

export async function createGroup(groupInfo) {
  let res = await axios.post(
    `${BASE_URL}Group?GroupName=${groupInfo.GroupName}&ManagerId=${groupInfo.ManagerId}`,
  );
  return res;
}

export async function getGroupDetails(id) {
  let res = await axios.get(`${BASE_URL}Group/${id}`);
  return res;
}

export async function moveToGroup(user, id) {
  let res = await axios.put(`${BASE_URL}User/${user.Id}/${id}`);
  return res;
}
