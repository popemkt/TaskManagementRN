import { Input, ListItem } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import OptionModal from './Modals/OptionModal/OptionModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserContext } from '../../../Contexts';
import database from '../../../Services';
import { theme } from '../../../Constants/configs'
import { truncate } from '../../../Common/utils';

export default function Tasks({ navigation }) {
  const user = useContext(UserContext);
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

  const filter = l => {
    return Boolean(
      !userSearch ||
        (userSearch &&
          l.ProcesssorName.toLowerCase().includes(userSearch.toLowerCase())),
    );
  };

  useEffect(() => {
    setListTasks(database.tasks);
  }, [searchAgain]);

  return (
    <View style={s.container}>
      <OptionModal
        isVisible={optionModalVisibility}
        setIsVisile={setOptionModalVisibility}
        options={options}
        setOptions={setOptions}
        setList={setListTasks}
      />
      <Text style={s.header}>{user.Username || 'Admin Board'}</Text>
      <View style={s.row}>
        <Text style={s.minorHeader}>{'Tasks'}</Text>
        <Button
          icon={{ name: 'recycle', size: 10 }}
          buttonStyle={{ marginLeft: 10, marginBottom: 10 }}
          onPress={() => {
            setUserSearch('');
            setSearchAgain(!searchAgain);
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
      <View style={{width: '100%'}}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 8,
          }}
        >
          {listTasks
            ? listTasks.map((l, i) => {
                if (filter(l)) {
                  return (
                    <ListItem
                      Component={TouchableOpacity}
                      style={s.listItem}
                      roundAvatar
                      chevron
                      subtitle={truncate(
                        l.ProcesssorName + ': ' + l.Description,
                        40,
                      )}
                      bottomDivider
                      leftIcon={{
                        name: 'wrench',
                        type: 'font-awesome',
                        color: '#2089dc',
                      }}
                      key={l.TaskId}
                      onPress={() => {
                        navigation.navigate('TaskDetails', { ...l });
                      }}
                      rightTitle={l.StatusName}
                      rightSubtitle={l.AcceptanceName}
                      rightTitleStyle={{color: 'green'}}
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
});
