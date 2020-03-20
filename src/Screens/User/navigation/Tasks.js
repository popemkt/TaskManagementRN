import CreateTask from '../Tasks/CreateTask'
import DrawerButton from '../../../Components/DrawerButton';
import LogoutButton from '../../../Components/LogoutButton'
import React from 'react';
import TaskDetails from '../Tasks/TaskDetails';
import Tasks from '../Tasks';
import { createStackNavigator } from '@react-navigation/stack';

const TasksStack = createStackNavigator();

function TasksRoutes({ navigation }) {
  return (
    <TasksStack.Navigator
      screenOptions={{
        headerTitle: 'My tasks',
        headerRight: () => (
            <LogoutButton navigation={navigation}/>
        ),
        headerLeft: () => (
            <DrawerButton navigation={navigation}/>
        ),
      }}
      initialRouteName='Tasks'
    >
      <TasksStack.Screen name='Tasks' component={Tasks} />
      <TasksStack.Screen name='TaskDetails' component={TaskDetails} />
      <TasksStack.Screen name='CreateTask' component={CreateTask} />
    </TasksStack.Navigator>
  );
}

export default TasksRoutes;