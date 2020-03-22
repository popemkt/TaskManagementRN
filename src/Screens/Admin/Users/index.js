import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';

import { AdminContext } from '../../../Contexts';
import Button from '../../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import QrScanner from '../../../Components/QrScanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadAllUsers } from '../../../Services/userServices';
import { theme } from '../../../Constants/configs';
import { useIsFocused } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function Users({ navigation }) {
  const admin = useContext(AdminContext);
  const focused = useIsFocused();
  const [listUsers, setListUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const filter = l => {
    return Boolean(
      l.RoleId !== 1 &&
        (!userSearch ||
          (userSearch &&
            (l.Username.toLowerCase().includes(userSearch.toLowerCase()) ||
              l.Id.toString().includes(userSearch.toString())))),
    );
  };

  const onScanned = data => {
    let user = listUsers.find(user => user.Id == data);
    user
      ? navigation.navigate('UserDetails', { ...user })
      : alert('User not found!');
  };

  useEffect(() => {
    if (focused)
      loadAllUsers(admin.Id)
        .then(res => {
          setListUsers(res.data.Data);
        })
        .catch(err => {
          console.log('Error' + JSON.stringify(err));
        });
  }, [focused]);

  return (
    <View style={s.container}>
      <QrScanner
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        action={data => onScanned(data)}
      />
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
          title='Find QR '
          icon={{ name: 'camera', size: 10 }}
          onPress={() => setIsVisible(true)}
        />
        <Button
          title='Create '
          icon={{ name: 'plus', size: 10 }}
          onPress={() => navigation.navigate('CreateUser')}
        />
      </View>
      <View style={{ width: '100%', height: SCREEN_HEIGHT-150 }}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 8,
          }}
        >
          {listUsers.length > 0
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
      <Text>{'aa'}</Text>
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
    height: '100%'
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
