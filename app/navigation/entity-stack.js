import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import RequestScreen from '../modules/entities/request/request-screen';
import RequestDetailScreen from '../modules/entities/request/request-detail-screen';
import RequestEditScreen from '../modules/entities/request/request-edit-screen';
import ReclRepScreen from '../modules/entities/recl-rep/recl-rep-screen';
import ReclRepDetailScreen from '../modules/entities/recl-rep/recl-rep-detail-screen';
import ReclRepEditScreen from '../modules/entities/recl-rep/recl-rep-edit-screen';
import NotificationScreen from '../modules/entities/notification/notification-screen';
import NotificationDetailScreen from '../modules/entities/notification/notification-detail-screen';
import NotificationEditScreen from '../modules/entities/notification/notification-edit-screen';
import HistoryLineScreen from '../modules/entities/history-line/history-line-screen';
import HistoryLineDetailScreen from '../modules/entities/history-line/history-line-detail-screen';
import HistoryLineEditScreen from '../modules/entities/history-line/history-line-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'Request',
    route: 'request',
    component: RequestScreen,
    options: {
      title: 'Requests',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('RequestEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'RequestDetail',
    route: 'request/detail',
    component: RequestDetailScreen,
    options: { title: 'View Request', headerLeft: () => <HeaderBackButton onPress={() => navigate('Request')} /> },
  },
  {
    name: 'RequestEdit',
    route: 'request/edit',
    component: RequestEditScreen,
    options: {
      title: 'Edit Request',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('RequestDetail', 'Request')} />,
    },
  },
  {
    name: 'ReclRep',
    route: 'recl-rep',
    component: ReclRepScreen,
    options: {
      title: 'ReclReps',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ReclRepEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ReclRepDetail',
    route: 'recl-rep/detail',
    component: ReclRepDetailScreen,
    options: { title: 'View ReclRep', headerLeft: () => <HeaderBackButton onPress={() => navigate('ReclRep')} /> },
  },
  {
    name: 'ReclRepEdit',
    route: 'recl-rep/edit',
    component: ReclRepEditScreen,
    options: {
      title: 'Edit ReclRep',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ReclRepDetail', 'ReclRep')} />,
    },
  },
  {
    name: 'Notification',
    route: 'notification',
    component: NotificationScreen,
    options: {
      title: 'Notifications',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('NotificationEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'NotificationDetail',
    route: 'notification/detail',
    component: NotificationDetailScreen,
    options: { title: 'View Notification', headerLeft: () => <HeaderBackButton onPress={() => navigate('Notification')} /> },
  },
  {
    name: 'NotificationEdit',
    route: 'notification/edit',
    component: NotificationEditScreen,
    options: {
      title: 'Edit Notification',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('NotificationDetail', 'Notification')} />,
    },
  },
  {
    name: 'HistoryLine',
    route: 'history-line',
    component: HistoryLineScreen,
    options: {
      title: 'HistoryLines',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('HistoryLineEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'HistoryLineDetail',
    route: 'history-line/detail',
    component: HistoryLineDetailScreen,
    options: { title: 'View HistoryLine', headerLeft: () => <HeaderBackButton onPress={() => navigate('HistoryLine')} /> },
  },
  {
    name: 'HistoryLineEdit',
    route: 'history-line/edit',
    component: HistoryLineEditScreen,
    options: {
      title: 'Edit HistoryLine',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('HistoryLineDetail', 'HistoryLine')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
