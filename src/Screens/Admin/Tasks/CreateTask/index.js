import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Button from '../../../../Components/Button';
import DatetimePicker from '../../../../Components/DatetimePicker';
import UserChooser from '../../../../Components/UserChooser';

function CreateTask() {
  const [isVisible, setIsVisible] = useState();
  const [task, setTask] = useState({
    Description: null,
    Name: null,
    dueDate: null,
    ProcessorId: null,
  });

  return (
    <View style={{ flex: 1 }}>
      <UserChooser
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        action={t => setTask({ ...task, ProcessorId: t.Id })}
      />
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
            value={task.Description}
            onChangeText={text => setTask({ ...task, Description: text })}
          />
        </View>

        <View style={s.inputContainer}>
          <Text style={s.label}>{'Name'}</Text>
          <TextInput
            placeholder='Enter description'
            style={s.input}
            value={task.Name}
            onChangeText={text => setTask({ ...task, Name: text })}
            maxLength={40}
          />
        </View>
        <View style={{ ...s.row, justifyContent: 'flex-start' }}>
          <Text>{'Due date:  '}</Text>
          <DatetimePicker
            date={task.dueDate}
            setDate={date => setTask({ ...task, dueDate: date })}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Text style={s.label}>
              {'Processor: ' +
                (task.ProcessorId ? task.ProcessorId : 'Touch to select processor')}
            </Text>
          </TouchableOpacity>
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

export default CreateTask;
