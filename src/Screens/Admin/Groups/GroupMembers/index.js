import { Input, ListItem } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserChooser from '../../../../Components/UserChooser';
import database from '../../../../Services';
import { theme } from '../../../../Constants/configs';

export default function Users({ navigation, route }) {
  const groupInfo = { ...route.params };
  const [listUsers, setListUsers] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [chosenUser, setChosenUser] = useState(null);

  const filter = l => {
    return Boolean(true);
  };

  useEffect(() => {
    console.log(chosenUser);
    setListUsers(database.users);
  }, [chosenUser]);

  return (
    <View style={s.container}>
      <UserChooser
        isVisible={modalVisibility}
        setIsVisible={setModalVisibility}
        action={setChosenUser}
        criteria={l => l.RoleID !== 2}
      />
      <Text style={s.header}>{"Group's Users"}</Text>
      <View
        style={{
          width: '98%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={s.minorHeader}>{groupInfo.GroupName}</Text>
        <Button
          title='Add '
          icon={{ name: 'plus', size: 10 }}
          onPress={() => setModalVisibility(true)}
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
