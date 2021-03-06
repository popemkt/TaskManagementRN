import Button from '../Button';
import React from 'react';

function LogoutButton({ navigation }) {
  return (
    <Button
      onPress={() => navigation.openDrawer()}
      title=''
      color='#00cc00'
      icon={{ name: 'hamburger', size: 23 }}
      buttonStyle={{ marginLeft: 10 }}
    />
  );
}

export default LogoutButton;
