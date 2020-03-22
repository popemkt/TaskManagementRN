import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getGroupDetails,
  moveToGroup,
} from '../../../../Services/groupServices';

import Button from '../../../../Components/Button';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserChooser from '../../../../Components/UserChooser';
import { theme } from '../../../../Constants/configs';
import { useIsFocused } from '@react-navigation/native';

export default function GroupMembers({ navigation, route }) {
  const groupInfo = { ...route.params };
  const [listUsers, setListUsers] = useState([]);
  const [hasManager, setHasManager] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [update, setUpdate] = useState();
  const focused = useIsFocused();

  const filter = l => {
    return Boolean(true);
  };

  const onChosen = l => {
    moveToGroup(l, groupInfo.GroupId)
      .then(res => {
        Alert.alert('Info', 'Add user successful!');
        setUpdate(!update);
      })
      .catch(err => Alert.alert(JSON.stringify(err)));
  };

  useEffect(() => {
    if (focused && !modalVisibility)
      getGroupDetails(groupInfo.GroupId)
        .then(res => {
          setListUsers(res.data.Data);
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
  }, [focused, modalVisibility, update]);

  return (
    <View style={s.container}>
      <UserChooser
        title={hasManager ? 'Choose a User' : 'Choose a Manager'}
        isVisible={modalVisibility}
        setIsVisible={setModalVisibility}
        action={onChosen}
        criteria={l => {
          return Boolean(
            (hasManager ? l.RoleId !== 2 : l.RoleId === 2 && !l.GroupId) &&
              l.GroupId !== groupInfo.GroupId,
          );
        }}
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
          {listUsers.length > 0
            ? listUsers.map((l, i) => {
                if (l.RoleId === 2 && !hasManager) setHasManager(true);
                let show = filter(l);
                return show ? (
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
                ) : null;
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
    justifyContent: 'space-between',
    width: '98%',
    flexDirection: 'row',
  },
});
