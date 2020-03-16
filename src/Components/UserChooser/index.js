import { Icon, Input, ListItem } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Button from '../Button';
import Modal from 'react-native-modal';
import db from '../../Services';
import { theme } from '../../Constants/configs';

function UserChooser({ isVisible, setIsVisible, action, criteria }) {
  const [listUsers, setListUsers] = useState();
  const [userSearch, setUserSearch] = useState();

  useEffect(() => {
    setListUsers(db.users);
  });

  const filter = l => {
    return Boolean(
      (criteria ? criteria(l) : true) &&
        l.RoleID !== 1 &&
        (!userSearch ||
          (userSearch &&
            (l.Username.toLowerCase().includes(userSearch.toLowerCase()) ||
              l.Id.toString().includes(userSearch.toString())))),
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          ...s.modal,
          paddingVertical: 10,
          paddingHorizontal: 20,
          width: 300,
          height: 450,
        }}
      >
        <Text>{'Choose a User'}</Text>
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
          containerStyle={{ width: '90%' }}
          placeholder='Username'
        />
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
                        action(l);
                        setIsVisible(false);
                      }}
                      rightTitle={l.Id + ' ID'}
                      title={l.Username.toString()}
                    />
                  ) : null,
                )
              : null}
          </ScrollView>
        </View>
        <Button
          style={s.button}
          onPress={() => setIsVisible(false)}
          title='Cancel'
        />
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  listItem: {
    width: '100%',
  },
  button: {
    position: 'absolute',
    top: '90%',
  },
});

export default UserChooser;
