import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  ScrollView,
} from 'react-native';
import { getDatetime } from '../../../../Common/utils';
import Button from '../../../../Components/Button';
import DatetimePicker from '../../../../Components/DatetimePicker'

function TaskDetails() {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState();
  const [name, setName] = useState('');
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 30,
          paddingHorizontal: '5%',
          justifyContent: 'flex-start',
        }}
      >
        <Text style={s.header}>{'Create Task'}</Text>
        <Text style={s.minorHeader}>{'Task Details\n'}</Text>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Description'}</Text>
          <TextInput
            placeholder='Enter description'
            style={s.input}
            numberOfLines={4}
            multiline
            value={description}
            onChangeText={text => setName(text)}
          />
        </View>

        <View style={s.inputContainer}>
          <Text style={s.label}>{'Name'}</Text>
          <TextInput
            placeholder='Enter description'
            style={s.input}
            value={name}
            onChangeText={text => setName(text)}
            maxLength={40}
          />
        </View>
        <View style={{...s.row, justifyContent: 'flex-start'}}>
          <Text>{'Due date:  '}</Text>
            <DatetimePicker date={dueDate} setDate={setDueDate} />
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

export default TaskDetails;
