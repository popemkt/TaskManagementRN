import { Input, ListItem } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '../../../Services';
import { theme } from '../../../Constants/configs';

export default function Users({ navigation }) {
  const [listUsers, setListUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');

  const filter = l => {
    console.log(l.Id);
    return Boolean(
      l.RoleId !== 1 &&
        (!userSearch ||
          (userSearch &&
            (l.Username.toLowerCase().includes(userSearch.toLowerCase()) ||
              l.Id.toString().includes(userSearch.toString())))),
    );
  };

  useEffect(() => {
    setListUsers(database.users);
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.header}>{'Users'}</Text>
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
          value={userSearch}
          onChangeText={text => setUserSearch(text)}
          containerStyle={{ width: '50%' }}
          placeholder='Username or Id'
        />
        <Button
          title='Create '
          icon={{ name: 'plus', size: 10 }}
          onPress={() => navigation.navigate('CreateUser')}
        />
      </View>
      <View style={s.container}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 8,
          }}
        >
          {listUsers
            ? listUsers.map((l, i) =>
                filter(l) ? (
                  <ListItem
                    Component={TouchableOpacity}
                    style={s.listItem}
                    roundAvatar
                    chevron
                    subtitle={l.Fullname}
                    bottomDivider
                    leftIcon={{
                      name: 'user',
                      type: 'font-awesome',
                      color: theme.colors.blue,
                    }}
                    key={i}
                    onPress={() => {
                      navigation.navigate('UserDetails', { ...l });
                    }}
                    rightTitle={l.Id + ' ID'}
                    title={l.Username.toString()}
                  />
                ) : null,
              )
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
    width: 400,
  },
  minorHeader: {
    fontSize: 20,
    marginLeft: 10,
  },
  row: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
