import Admin from './Screens/Admin';
import Login from './Screens/Login';
import Manager from './Screens/Manager';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import User from './Screens/User'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen
          name='Admin'
          component={Admin}
        />
        <Stack.Screen name='Manager' component={Manager}/>
        <Stack.Screen name='User' component={User}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
