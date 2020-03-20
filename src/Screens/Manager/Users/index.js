import { Input, ListItem } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import QrScanner from '../../../Components/QrScanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '../../../Services';
import { theme } from '../../../Constants/configs';

export default function Users({ navigation }) {
  const [listUsers, setListUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const filter = l => {
    return Boolean(
      l.RoleID !== 1 &&
        (!userSearch ||
          (userSearch &&
            (l.Username.toLowerCase().includes(userSearch.toLowerCase()) ||
              l.Id.toString().includes(userSearch.toString())))),
    );
  };

  const onScanned = data => {
    let user = listUsers.find(user => user.Id == data);
    user ? navigation.navigate('UserDetails', {...user}) : alert('User not found!');
  }

  useEffect(() => {
    setListUsers(database.users);
  }, []);

  return (
    <View style={s.container}>
      <QrScanner isVisible={isVisible} setIsVisible={setIsVisible} action={data => onScanned(data)}/>
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
          containerStyle={{ width: '70%' }}
          placeholder='Username or Id'
        />
        <Button
          title='Find QR '
          icon={{ name: 'camera', size: 10 }}
          onPress={() => setIsVisible(true)}
        />
      </View>
      <View style={{ width: '100%' }}>
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
    width: '100%',
  },
  minorHeader: {
    fontSize: 20,
    marginLeft: 10,
  },
  row: {
    justifyContent: 'space-between',
    width: '98%',
    flexDirection: 'row',
  },
});
