import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '../../../../Components/Button';

export default function Admin({ admin, navigation, data, route }) {
  const [name] = useState(route.params?.Username);
  const [user] = useState({ ...route.params });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name || 'User'}</Text>
      <Text style={styles.minorHeader}>{'User Details\n'}</Text>
      <View>
        <Text style={styles.label}>{`Fullname: ${user.Fullname}`}</Text>
        <Text style={styles.label}>{`Address: ${user.Address}`}</Text>
        <Text style={styles.label}>{`User Id: ${user.Id}`}</Text>
        <Text style={styles.label}>{`Username: ${user.Username}`}</Text>
        <Text style={styles.label}>{`Phone: ${user.Phone}`}</Text>
        <Text style={styles.label}>{`Role: ${user.RoleName}`}</Text>
        <Text style={styles.label}>{`Mail: ${user.Mail}`}</Text>
        <Text style={styles.label}>{`DoB: ${user.DoB}`}</Text>
        <Text style={styles.label}>{`Group: ${user.GroupName}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: '5%',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 40,
  },
  listItem: {
    width: 400,
  },
  inputContainer: {
    marginTop: 10,
    width: '95%',
  },
  minorHeader: {
    fontSize: 20,
  },
  row: {
    width: '95%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderLeftWidth: 4,
    borderLeftColor: '#039dfc',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderTopWidth: 1,
    borderTopColor: 'grey',
    borderRightWidth: 1,
    borderRightColor: 'grey',
    width: '100%',
    paddingLeft: 7,
    paddingTop: 5,
    textAlignVertical: 'top',
  },
  label: {},
});
