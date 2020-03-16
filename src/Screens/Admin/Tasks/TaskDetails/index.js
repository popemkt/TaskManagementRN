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
import ImagePicker from '../../../../Components/ImagePicker';
import { getDatetime } from '../../../../Common/utils';

function TaskDetails({ route }) {
  const [name] = useState(route.params?.TaskName);
  const [image, setImage] = useState(null);
  const [task, setTask] = useState({ ...route.params });
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 30,
          paddingHorizontal: '5%',
          justifyContent: 'flex-start',
        }}
      >
        <Text style={s.header}>{name || 'TaskName'}</Text>
        <Text style={s.minorHeader}>{'Task Details\n'}</Text>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Description'}</Text>
          <TextInput
            style={s.input}
            numberOfLines={4}
            multiline
            value={task.ContentAssigned}
            onChangeText={text => setTask({ ...task, ContentAssigned: text })}
          />
        </View>

        <View style={s.inputContainer}>
          <Text style={s.label}>{'Name'}</Text>
          <TextInput
            style={s.input}
            value={task.TaskName}
            onChangeText={text => setTask({ ...task, TaskName: text })}
            maxLength={40}
          />
        </View>
        <View>
          <Text style={s.label}>{`Creator: ${task.CreatorName}`}</Text>
          <Text style={s.label}>{`Details: ${task.ContentAssigned}`}</Text>
          <Text style={s.label}>{`Processor: ${task.ProcesssorName}`}</Text>
          <Text
            style={s.label}
          >{`Processing details: ${task.ContentHandlingWork}`}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={s.label}>{'Status:'}</Text>
            <Picker
              selectedValue={task.Status}
              style={{ height: 30, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setTask({ ...task, Status: itemValue })
              }
            >
              <Picker.Item label='Unstarted' value={1} />
              <Picker.Item label='Doing' value={2} />
              <Picker.Item label='Done' value={3} />
              <Picker.Item label='Overdue' value={4} />
              <Picker.Item label='Dropped' value={5} />
            </Picker>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={s.label}>{'Mark:'}</Text>
            <Picker
              selectedValue={task.Mark}
              style={{ height: 30, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setTask({ ...task, Mark: itemValue })
              }
            >
              <Picker.Item label='0' value={0} />
              <Picker.Item label='1' value={1} />
              <Picker.Item label='2' value={2} />
              <Picker.Item label='3' value={3} />
              <Picker.Item label='4' value={4} />
              <Picker.Item label='5' value={5} />
              <Picker.Item label='6' value={6} />
              <Picker.Item label='7' value={7} />
              <Picker.Item label='8' value={8} />
              <Picker.Item label='9' value={9} />
              <Picker.Item label='10' value={10} />

            </Picker>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={s.label}>{'Status:'}</Text>
            <Picker
              selectedValue={task.Status}
              style={{ height: 30, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setTask({ ...task, Status: itemValue })
              }
            >
              <Picker.Item label='Unstarted' value={1} />
              <Picker.Item label='Doing' value={2} />
              <Picker.Item label='Done' value={3} />
              <Picker.Item label='Overdue' value={4} />
              <Picker.Item label='Dropped' value={5} />
            </Picker>
          </View>
          <Text style={s.label}>{`Time start: ${getDatetime(
            task.TimeStart,
          )}`}</Text>
          <Text style={s.label}>{`Time created: ${getDatetime(
            task.CreationTime,
          )}`}</Text>
          <Text style={s.label}>{`Time created: ${getDatetime(
            task.CreationTime,
          )}`}</Text>
          <Text
            style={s.label}
          >{`Time manager last commented: ${getDatetime(task.TimeManagerCommented)}`}</Text>
          <Text style={s.label}>{'Image confirmation'}</Text>
          <ImagePicker image={image} setImage={setImage} />
          <View style={{...s.row, marginVertical: 20}}>
            <Button
              title='DELETE'
              // onPress={}
              buttonStyle={{ backgroundColor: 'red' }}
            />
            <Button
              title='UPDATE'
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
