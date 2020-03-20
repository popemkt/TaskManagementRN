import EmployeesRoutes from './Users';
import React from 'react';
import TasksRoutes from './Tasks';
import { UserContext } from '../../../Contexts';
import { createDrawerNavigator } from '@react-navigation/drawer';

const UserDrawer = createDrawerNavigator();

function UserRoutes({ route }) {
  return (
    <UserContext.Provider value={{ ...route.params }}>
      <UserDrawer.Navigator initialRouteName='Tasks'>
        <UserDrawer.Screen name='Tasks' component={TasksRoutes} />
      </UserDrawer.Navigator>
    </UserContext.Provider>
  );
}

export default UserRoutes;
