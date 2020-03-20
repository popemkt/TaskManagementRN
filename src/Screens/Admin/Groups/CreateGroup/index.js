import {
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';

import Button from '../../../../Components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserChooser from '../../../../Components/UserChooser';

function CreateGroup() {
  const [isVisible, setIsVisible] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    GroupName: null,
    MangerId: null,
  });

  return (
    <View>
      <UserChooser
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        criteria={l => l.RoleID === 2}
        action={l => setGroupInfo({ ...groupInfo, MangerId: l.Id })}
      />
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 30,
          paddingHorizontal: '5%',
          justifyContent: 'flex-start',
        }}
      >
        <Text style={s.header}>{'Create Group'}</Text>
        <Text style={s.minorHeader}>{'Group Details\n'}</Text>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Group Name'}</Text>
          <TextInput
            placeholder='Enter group name'
            style={s.input}
            multiline
            value={groupInfo.Username}
            onChangeText={text =>
              setGroupInfo({ ...groupInfo, GroupName: text })
            }
          />
        </View>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Text style={s.label}>
            {'Manager ID: ' +
              (groupInfo.MangerId
                ? groupInfo.MangerId
                : 'Touch to select manager')}
          </Text>
        </TouchableOpacity>
        <View style={s.row}>
            <Button
              title='CONFIRM'
              // onPress={}
              buttonStyle={{ backgroundColor: 'green' }}
            />
            <Button
              title='CANCEL'
              // onPress={}
              buttonStyle={{ backgroundColor: 'red' }}
            />
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

export default CreateGroup;
