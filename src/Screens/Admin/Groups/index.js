import { Input, ListItem } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAllGroups } from '../../../Services/groupServices';
import { useIsFocused } from '@react-navigation/native';

export default function Tasks({ navigation }) {
  const [listGroups, setListGroups] = useState([]);
  const [groupSearch, setGroupSearch] = useState('');
  const focused = useIsFocused();

  const filter = l => {
    return Boolean(
      !groupSearch ||
        (groupSearch &&
          l.GroupName.toLowerCase().includes(groupSearch.toLowerCase())),
    );
  };

  useEffect(() => {
    if (focused)
      getAllGroups().then(res => {
        setListGroups(res.data.Data);
      });
  }, [focused]);

  return (
    <View style={s.container}>
      <Text style={s.header}>{'Groups'}</Text>
      <View style={s.row}>
        <Input
          rightIcon={
            <Icon
              name='chevron-right'
              type='entypo'
              color='#86939e'
              size={25}
            />
          }
          value={groupSearch}
          onChangeText={text => setGroupSearch(text)}
          containerStyle={{ width: '60%' }}
          placeholder='Group name'
        />
        <Button
          title='Create '
          icon={{ name: 'plus', size: 10 }}
          onPress={() => navigation.navigate('CreateGroup')}
        />
      </View>
      <View style={{ width: '100%' }}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 8,
          }}
        >
          {listGroups
            ? listGroups.map((l, i) => {
                if (filter(l)) {
                  return (
                    <ListItem
                      Component={TouchableOpacity}
                      style={s.listItem}
                      roundAvatar
                      chevron
                      subtitle={
                        `Group Id: ${l.GroupId}`
                      }
                      bottomDivider
                      leftIcon={{
                        name: 'group',
                        type: 'font-awesome',
                        color: '#2089dc',
                      }}
                      key={l.GroupId}
                      onPress={() => {
                        navigation.navigate('GroupMembers', { ...l });
                      }}
                      title={l.GroupName}
                      titleStyle={{fontWeight: 'bold'}}
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
