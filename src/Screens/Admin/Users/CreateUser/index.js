import {
  Alert,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';

import Button from '../../../../Components/Button';
import { createUser } from '../../../../Services/userServices';

function CreateUser({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    Username: null,
    Password: null,
    ConfirmPassword: null,
    RoleID: 2,
    Fullname: null,
  });

  const onConfirm = () => {
    if (validation()) {
      createUser(
        userInfo.Username,
        userInfo.Password,
        userInfo.Fullname,
        userInfo.RoleID,
      )
        .then(res => {
          Alert.alert('Info', res.data.Message);
          navigation.goBack();
        })
        .catch(err => {
          Alert.alert('Error', res.data.Message);
        });
    }
  };

  const validation = () => {
    let validation = [];
    let confirmError = '';
    if (!userInfo.Username) validation.push('Username');
    if (!userInfo.Password) validation.push('Password');
    if (!userInfo.ConfirmPassword) validation.push('ConfirmPassword');
    if (!userInfo.Fullname) validation.push('Fullname');
    else if (userInfo.ConfirmPassword !== userInfo.Password) {
      confirmError = '\nPassword not matched!';
    }
    if (validation.length > 0 || confirmError) {
      Alert.alert(
        'Validation error',
        (validation.length > 0
          ? `${validation.join(', ')} must not be empty!`
          : '') + confirmError,
      );
      return false;
    }
    return true;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 30,
          paddingHorizontal: '5%',
          justifyContent: 'flex-start',
        }}
      >
        <Text style={s.header}>{'Create User'}</Text>
        <Text style={s.minorHeader}>{'User Details\n'}</Text>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Username'}</Text>
          <TextInput
            placeholder='Enter username'
            style={s.input}
            multiline
            value={userInfo.Username}
            onChangeText={text => setUserInfo({ ...userInfo, Username: text })}
          />
        </View>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Password'}</Text>
          <TextInput
            textContentType={'password'}
            secureTextEntry
            placeholder='Enter password'
            style={s.input}
            value={userInfo.Password}
            onChangeText={text => setUserInfo({ ...userInfo, Password: text })}
            maxLength={40}
          />
        </View>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Confirm password'}</Text>
          <TextInput
            textContentType={'password'}
            secureTextEntry
            placeholder='Enter password'
            style={s.input}
            value={userInfo.ConfirmPassword}
            onChangeText={text =>
              setUserInfo({ ...userInfo, ConfirmPassword: text })
            }
            maxLength={40}
          />
        </View>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Fullname'}</Text>
          <TextInput
            placeholder='Enter fullname'
            style={s.input}
            multiline
            value={userInfo.Fullname}
            onChangeText={text => setUserInfo({ ...userInfo, Fullname: text })}
          />
        </View>
        <View style={{ ...s.row, justifyContent: 'flex-start' }}>
          <Text style={s.label}>{'Role: '}</Text>
          <Picker
            selectedValue={userInfo.RoleID}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setUserInfo({ ...userInfo, RoleID: itemValue })
            }
          >
            <Picker.Item label='Manager' value={2} />
            <Picker.Item label='Employee' value={3} />
          </Picker>
        </View>
        <View>
          <View style={s.row}>
            <Button
              title='CONFIRM'
              onPress={onConfirm}
              buttonStyle={{ backgroundColor: 'green' }}
            />
            <Button
              title='CANCEL'
              onPress={() => navigation.goBack()}
              buttonStyle={{ backgroundColor: 'grey' }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
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
  scroll: {
    paddingBottom: 30,
  },
  listItem: {
    width: 400,
  },
  inputContainer: {
    marginTop: 10,
  },
  minorHeader: {
    fontSize: 20,
  },
  row: {
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
    height: 40,
    paddingLeft: 7,
    textAlignVertical: 'top',
  },
  label: {
    marginVertical: 4,
    fontSize: 15,
  },
});

export default CreateUser;
