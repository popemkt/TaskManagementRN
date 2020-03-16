import Admin from './Screens/Admin';
import Login from './Screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
