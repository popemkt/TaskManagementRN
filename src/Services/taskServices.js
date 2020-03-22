import { BASE_URL } from '../Constants/configs';
import axios from 'axios';

export async function getAllTasks(currId) {
  let res = await axios.get(`${BASE_URL}Task?id=${currId}`);
  return res;
}

export async function createTask(task) {
  let res = await axios.post(`${BASE_URL}Task`, task);
  return res;
}

export async function getTaskDetails(id) {
  let res = await axios.get(`${BASE_URL}Task/${id}`);
  return res;
}

export async function deleteTask(id) {
  let res = await axios.get(`${BASE_URL}Task/${id}`);
  return res;
}

export async function updateTaskDetails(task) {
  let data = new FormData();
  data.append('TaskId', task.TaskId);
  data.append('TaskName', task.TaskName);
  data.append('ContentAssigned', task.ContentAssigned);
  data.append('ContentHandlingWork', task.ContentHandlingWork);
  data.append('Description', task.Description);
  data.append('Mark', task.Mark);
  data.append('Status', task.Status);
  data.append('Acceptance', task.Acceptance);
  data.append('Processor', task.Processor);
  if (task.ImageConfirmation && task.ImageConfirmation.includes('file')) {
    data.append('img', {
      uri: task.ImageConfirmation,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
  }
  data.append('Updater', task.Updater);
  data.append('ConfirmationEnded', task.ConfirmationEnded);

  let res = axios.put(`${BASE_URL}Task`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'accept-encoding': 'gzip, deflate',
      host: 'exp.host',
    },
  });
  return res;
}
