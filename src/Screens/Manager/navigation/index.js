import EmployeesRoutes from './Users';
import { ManagerContext } from '../../../Contexts';
import React from 'react';
import TasksRoutes from './Tasks';
import { createDrawerNavigator } from '@react-navigation/drawer';

const ManagerDrawer = createDrawerNavigator();

function AdminRoutes({ route }) {
  return (
    <ManagerContext.Provider value={{...route.params}}>
      <ManagerDrawer.Navigator initialRouteName='Tasks'>
        <ManagerDrawer.Screen name='Tasks' component={TasksRoutes} />
        <ManagerDrawer.Screen name='My employees' component={EmployeesRoutes} />
      </ManagerDrawer.Navigator>
    </ManagerContext.Provider>
  );
}

export default AdminRoutes;
