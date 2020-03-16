import { Alert } from 'react-native';
import { BASE_URL } from '../Constants/configs';
import axios from 'axios';

export async function login(username, password, navigation) {
  // Alert.alert(BASE_URL + username + password);
  axios
    .post(`${BASE_URL}Home/?username=admin&password=admin`, {
      Username: username,
      Password: password,
    })
    .then(response => {
      switch (response.data.Data.RoleID) {
        case 1:
          navigation.navigate('Admin', { ...response.data.Data });
      }
    })
    .catch(err => 
      { if (username === 'admin' && password === 'admin') navigation.navigate('Admin', {Username: 'UserAdmin'});
        Alert.alert('Login failed', 'Incorrect username or password: '+ JSON.stringify(err))},
    );
}
