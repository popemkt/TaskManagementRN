import CreateUser from '../Users/CreateUser'
import DrawerButton from '../../../Components/DrawerButton';
import LogoutButton from '../../../Components/LogoutButton'
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
            <LogoutButton navigation={navigation}/>
        ),
        headerLeft: () => (
            <DrawerButton navigation={navigation}/>
        ),
      }}
      initialRouteName='Users'
    >
      <UsersStack.Screen name='Users' component={Users} />
      <UsersStack.Screen name='UserDetails' component={UserDetails} />
      <UsersStack.Screen name='CreateUser' component={CreateUser} />
    </UsersStack.Navigator>
  );
}

export default UsersRoutes;
