import React from 'react';
import TasksRoutes from './Tasks';
import UsersRoutes from './Users';
import { AdminContext } from '../../../Contexts';
import { createDrawerNavigator } from '@react-navigation/drawer';

const AdminDrawer = createDrawerNavigator();

function AdminRoutes({ route }) {
  return (
    <AdminContext.Provider value={{...route.params}}>
      <AdminDrawer.Navigator initialRouteName='Tasks'>
        <AdminDrawer.Screen name='Tasks' component={TasksRoutes} />
        <AdminDrawer.Screen name='Users' component={UsersRoutes} />
      </AdminDrawer.Navigator>
    </AdminContext.Provider>
  );
}

export default AdminRoutes;
