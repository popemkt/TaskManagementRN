import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Input, ListItem } from 'react-native-elements';
import React, { useEffect, useState } from 'react';

import Button from '../Button';
import Modal from 'react-native-modal';
import { loadAllUsers } from '../../Services/userServices';
import { theme } from '../../Constants/configs';

function UserChooser({ isVisible, setIsVisible, action, criteria }) {
  const [listUsers, setListUsers] = useState();
  const [userSearch, setUserSearch] = useState();

  useEffect(() => {
    if (isVisible)
      loadAllUsers(1)
        .then(res => {
          setListUsers(res.data.Data);
        })
        .catch(err => {
          Alert.alert('Error', 'Error fetching users!');
          console.log(JSON.stringify(err));
        });
  }, [isVisible]);

  const filter = l => {
    return Boolean(
      (criteria ? criteria(l) : true) &&
        l.RoleId !== 1 &&
        (!userSearch ||
          (userSearch &&
            (l.Username.toLowerCase().includes(userSearch.toLowerCase()) ||
              l.Id.toString().includes(userSearch.toString())))),
    );
  };

  return (
    <Modal
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      hideModalContentWhileAnimating={true}
      propagateSwipe={true}
      isVisible={isVisible}
      style={{
        alignItems: 'center',
        alignContent: 'center',
      }}
      swipeDirection={['up', 'down']}
    >
      <View
        style={{
          ...s.modal,
          paddingVertical: 10,
          paddingHorizontal: 20,
          width: 350,
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
        <View style={{ width: '100%', height: 250 }}>
          <TouchableOpacity>
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
          </TouchableOpacity>
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
    bottom: 10,
    left: 10,
  },
});

export default UserChooser;
