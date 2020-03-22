import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import { getDatetime, truncate } from '../../../Common/utils';

import { AdminContext } from '../../../Contexts';
import Button from '../../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import OptionModal from './Modals/OptionModal/OptionModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAllTasks } from '../../../Services/taskServices';
import { useIsFocused } from '@react-navigation/native';

export default function Tasks({ navigation }) {
  const admin = useContext(AdminContext);
  const [listTasks, setListTasks] = useState([]);
  const [searchAgain, setSearchAgain] = useState(true);
  const [userSearch, setUserSearch] = useState('');
  const [options, setOptions] = useState({
    filter: false,
    fromDate: null,
    toDate: null,
    status: null,
  });
  const [optionModalVisibility, setOptionModalVisibility] = useState(false);
  const focused = useIsFocused();
  const icon = {
    name: 'wrench',
    type: 'font-awesome',
    color: '#2089dc',
  }

  const filter = l => {
    return Boolean(
      (!userSearch ||
        (userSearch &&
          l.ProcesssorName.toLowerCase().includes(userSearch.toLowerCase()))) &&
        optionFilter(l),
    );
  };

  const optionFilter = l => {
    if (options.filter) {
      let date = new Date(l.DueDate);
      return (
        Boolean(options.fromDate ? date >= options.fromDate : true) &&
        (options.toDate ? date <= options.toDate : true) &&
        (options.status ? options.status == l.Status : true)
      );
    } else return true;
  };

  useEffect(() => {
    if (focused) console.log('yes');
    getAllTasks(admin.Id)
      .then(res => {
        setListTasks(res.data.Data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [focused, searchAgain]);

  return (
    <View style={s.container}>
      <OptionModal
        isVisible={optionModalVisibility}
        setIsVisile={setOptionModalVisibility}
        options={options}
        setOptions={setOptions}
      />
      <Text style={s.header}>{admin.Username || 'Admin Board'}</Text>
      <View style={s.row}>
        <Text style={s.minorHeader}>{'Tasks'}</Text>
        <Button
          icon={{ name: 'recycle', size: 10 }}
          buttonStyle={{ marginLeft: 10, marginBottom: 10 }}
          onPress={() => {
            setUserSearch('');
            setSearchAgain(!searchAgain);
            setOptions({
              filter: false,
              fromDate: null,
              toDate: null,
              status: null,
            });
          }}
        />
      </View>
      <View style={s.row}>
        <Button
          title='Options '
          icon={{ name: 'filter', size: 10 }}
          buttonStyle={{ marginLeft: 10 }}
          onPress={() => setOptionModalVisibility(true)}
          style={{ color: 'red' }}
        />
        <Input
          rightIcon={
            <Icon
              name='chevron-right'
              type='entypo'
              color='#86939e'
              size={25}
            />
          }
          value={userSearch}
          onChangeText={text => setUserSearch(text)}
          containerStyle={{ width: '50%' }}
          placeholder='Username'
        />
        <Button
          title='Create '
          icon={{ name: 'plus', size: 10 }}
          onPress={() => navigation.navigate('CreateTask')}
        />
      </View>
      <View style={{ width: '100%' }}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 8,
          }}
        >
          {listTasks
            ? listTasks.map((l, i) => {
                if (filter(l)) {
                  console.log(JSON.stringify(l));
                  return (
                    <ListItem
                      Component={TouchableOpacity}
                      style={s.listItem}
                      roundAvatar
                      chevron
                      subtitle={
                        truncate(
                          l.ProcesssorName +
                            (l.ContentAssigned && l.ContentAssigned !== 'null'
                              ? ': ' + l.ContentAssigned
                              : ''),
                          40,
                        ) +
                        ('\n' + getDatetime(l.DueDate))
                      }
                      titleStyle={{ fontWeight: 'bold' }}
                      bottomDivider
                      leftIcon={icon}
                      key={l.TaskId}
                      onPress={() => {
                        navigation.navigate('TaskDetails', { ...l });
                      }}
                      rightTitle={l.StatusName}
                      rightSubtitle={l.AcceptanceName}
                      rightSubtitleStyle={{
                        color:
                          l.Acceptance !== null
                            ? l.Acceptance
                              ? 'green'
                              : 'red'
                            : 'grey',
                      }}
                      rightTitleStyle={s.rightTitleStyle}
                      title={l.TaskName}
                    />
                  );
                }
              })
            : null}
        </ScrollView>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    fontSize: 40,
    marginLeft: 10,
  },
  listItem: {
    width: '100%',
  },
  minorHeader: {
    fontSize: 20,
    marginLeft: 10,
  },
  row: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightTitleStyle: {
    fontWeight: 'bold',
  },
});
