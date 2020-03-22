import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';

import { AdminContext } from '../../../../Contexts';
import Button from '../../../../Components/Button';
import DatetimePicker from '../../../../Components/DatetimePicker';
import { SendNoti } from '../../../../Services/commonServices';
import UserChooser from '../../../../Components/UserChooser';
import { createTask } from '../../../../Services/taskServices';

function CreateTask({ navigation }) {
  const admin = useContext(AdminContext);
  const [isVisible, setIsVisible] = useState();
  const [task, setTask] = useState({
    ContentAssigned: null,
    TaskName: null,
    DueDate: null,
    Processor: null,
    ProcessorName: null,
    Creator: admin.Id,
  });

  const onConfirm = () => {
    if (validation())
      createTask(task)
        .then(res => {
          Alert.alert('Info', res.data.Message);
          SendNoti(task.Processor, 'You have a new task');
          navigation.goBack();
        })
        .catch(err => {
          Alert.alert('Error', err.data.Message);
        });
  };

  const validation = () => {
    let validation = [];

    if (!task.ContentAssigned) validation.push('Work assigned');
    if (!task.DueDate) validation.push('Due date');
    if (!task.Processor) validation.push('Processor');
    if (!task.TaskName) validation.push('Name');
    if (validation.length > 0) {
      Alert.alert(
        'Validation error',
        `${validation.join(', ')} must not be empty!`,
      );
      return false;
    }
    if (task.DueDate) return true;
    return true;
  };

  return (
    <View style={{ flex: 1 }}>
      <UserChooser
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        action={t =>
          setTask({ ...task, Processor: t.Id, ProcessorName: t.Fullname })
        }
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
          <Text style={s.label}>{'Name'}</Text>
          <TextInput
            placeholder='Enter name'
            style={s.input}
            value={task.TaskName}
            onChangeText={text => setTask({ ...task, TaskName: text })}
            maxLength={40}
          />
        </View>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Work assigned'}</Text>
          <TextInput
            placeholder='Enter work assigned'
            style={s.input}
            numberOfLines={4}
            multiline
            value={task.ContentAssigned}
            onChangeText={text => setTask({ ...task, ContentAssigned: text })}
          />
        </View>

        <View style={{ ...s.row, justifyContent: 'flex-start' }}>
          <Text>{'Due date:  '}</Text>
          <DatetimePicker
            date={task.DueDate}
            setDate={date => setTask({ ...task, DueDate: date })}
            minimumDate={new Date()}
          />
        </View>
        <View>
          <View style={{ ...s.row, justifyContent: 'flex-start' }}>
            <Text style={s.label}>{'Processor: '}</Text>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Text style={s.label}>
                {task.Processor
                  ? task.ProcessorName
                  : 'Touch to select processor'}
              </Text>
            </TouchableOpacity>
          </View>
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
    marginVertical: 4,
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
