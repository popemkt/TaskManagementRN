import Button from '../../../Components/Button';
import React from 'react';
import UserDetails from '../Users/UserDetails';
import Users from '../Users';
import { createStackNavigator } from '@react-navigation/stack';

const UsersStack = createStackNavigator();

function UsersRoutes({ navigation }) {
  return (
    <UsersStack.Navigator
      screenOptions={{
        headerTitle: 'Users',
        headerRight: () => (
          <Button
            onPress={() => navigation.popToTop()}
            title='Logout '
            icon={{ name: 'arrow-right', size: 10 }}
            buttonStyle={{ marginRight: 10 }}
          />
        ),
        headerLeft: () => (
          <Button
            onPress={() => navigation.openDrawer()}
            title=''
            color='#00cc00'
            icon={{ name: 'hamburger' }}
            buttonStyle={{ marginLeft: 10 }}
          />
        ),
      }}
      initialRouteName='Users'
    >
      <UsersStack.Screen name='Users' component={Users} />
      <UsersStack.Screen name='UserDetails' component={UserDetails} />
    </UsersStack.Navigator>
  );
}

export default UsersRoutes;
