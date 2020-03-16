import { Picker, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import Button from '../../../../Components/Button';

function CreateUser() {
  const [userInfo, setUserInfo] = useState({
    Username: null,
    Password: null,
    ConfirmPassword: null,
  });

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
        <View style={{ ...s.row, justifyContent: 'flex-start' }}>
          <Text style={s.label}>{'Role: '}</Text>
          <Picker
              selectedValue={userInfo.RoleID}
              style={{ height: 30,width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setUserInfo({ ...userInfo, RoleID: itemValue })
              }
            >
              <Picker.Item label='Manager' value={2} />
              <Picker.Item label='Employee' value={3} />
            </Picker>
        </View>
        <View>
          <Text style={s.label}>{`Processor:`}</Text>
          <View style={s.row}>
            <Button
              title='CONFIRM'
              // onPress={}
              buttonStyle={{ backgroundColor: 'green' }}
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
    width: '95%',
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
    paddingLeft: 7,
    paddingTop: 5,
    textAlignVertical: 'top',
  },
  label: {
    marginVertical: 4,
  },
});

export default CreateUser;
