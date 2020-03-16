import CreateGroup from '../Groups/CreateGroup'
import DrawerButton from '../../../Components/DrawerButton';
import GroupMembers from '../Groups/GroupMembers'
import Groups from '../Groups'
import LogoutButton from '../../../Components/LogoutButton'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const GroupsStack = createStackNavigator();

function GroupsRoutes({ navigation }) {
  return (
    <GroupsStack.Navigator
      screenOptions={{
        headerTitle: 'Groups',
        headerRight: () => (
            <LogoutButton navigation={navigation}/>
        ),
        headerLeft: () => (
            <DrawerButton navigation={navigation}/>
        ),
      }}
      initialRouteName='Groups'
    >
      <GroupsStack.Screen name='Groups' component={Groups} />
      <GroupsStack.Screen name='GroupMembers' component={GroupMembers} />
      <GroupsStack.Screen name='CreateGroup' component={CreateGroup} />
    </GroupsStack.Navigator>
  );
}

export default GroupsRoutes;
