import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { deleteUser, updateUser } from '../../../../Services/userServices';

import Button from '../../../../Components/Button';

export default function Admin({ navigation, route }) {
  const [name] = useState(route.params?.Username);
  const [user, setUser] = useState({ ...route.params });
  const [newPassword, setNewPassword] = useState('');

  const validation = () => {
    let validation = [];
    if (!user.Username.trim() && user.Username < 6)
      validation.push('Username must be more than 6 characters!\n');
    if (newPassword.trim() && newPassword.length < 6)
      validation.push('Password must be more than 6 characters!\n');
    if (validation.length > 0) {
      Alert.alert('Validation error', validation.join(''));
      return false;
    }
    return true;
  };

  const onUpdate = () => {
    let tempUser = { ...user };
    if (newPassword) {
      setUser({ ...user });
      tempUser = { ...user, Password: user.Password + '-' + newPassword };
    }
    console.log('new pass: ' + newPassword + JSON.stringify(tempUser));
    if (validation()) {
      updateUser(tempUser)
        .then(res => {
          Alert.alert('Info', 'Update successful!');
          navigation.goBack();
        })
        .catch(err => Alert.alert('Error', 'Network Error'));
    }
  };

  const onDelete = () => {
    deleteUser(user.Id)
      .then(res => {
        Alert.alert('Info', 'Delete sucessful');
        navigation.goBack();
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name || 'User'}</Text>
      <Text style={styles.minorHeader}>{'User Details\n'}</Text>
      <Text style={styles.label}>{`User Id: ${user.Id}`}</Text>
      <Text style={styles.label}>{`Username: ${user.Username}`}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{'Fullname'}</Text>
        <TextInput
          style={styles.input}
          value={user.Fullname}
          onChangeText={text => setUser({ ...user, Fullname: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{'New Password'}</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder='New password'
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          maxLength={40}
        />
      </View>
      <View>
        <Text style={styles.label}>{`Role: ${user.RoleName}`}</Text>
        <Text style={styles.label}>{`Group: ${
          user.GroupName && user.GroupName !== 'null'
            ? user.GroupName
            : 'No group'
        }`}</Text>
        <View style={{ ...styles.row, marginVertical: 20 }}>
          <Button
            title='DELETE'
            onPress={() => {
              Alert.alert(
                'Warning',
                `Are you sure want to delete user ${user.Username}`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                  },
                  { text: 'Yes', onPress: onDelete },
                ],
                { cancelable: false },
              );
            }}
            buttonStyle={{ backgroundColor: 'red' }}
          />
          <Button
            title='UPDATE'
            onPress={onUpdate}
            buttonStyle={{ backgroundColor: 'green' }}
          />
          <Button
            title='CANCEL'
            onPress={() => navigation.goBack()}
            buttonStyle={{ backgroundColor: 'grey' }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: '5%',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 40,
  },
  listItem: {
    width: 400,
  },
  inputContainer: {
    marginTop: 10,
    width: '95%',
  },
  minorHeader: {
    fontSize: 20,
  },
  row: {
    width: '95%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderLeftWidth: 4,
    borderLeftColor: '#039dfc',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderTopWidth: 1,
    borderTopColor: 'grey',
    borderRightWidth: 1,
    borderRightColor: 'grey',
    width: '100%',
    paddingLeft: 7,
    paddingTop: 5,
    textAlignVertical: 'top',
  },
  label: {},
});
