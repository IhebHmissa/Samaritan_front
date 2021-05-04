import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>JHipster Entities will appear below</Text>
      <RoundedButton text="Request" onPress={() => navigation.navigate('Request')} testID="requestEntityScreenButton" />
      <RoundedButton text="ReclRep" onPress={() => navigation.navigate('ReclRep')} testID="reclRepEntityScreenButton" />
      <RoundedButton text="Notification" onPress={() => navigation.navigate('Notification')} testID="notificationEntityScreenButton" />
      <RoundedButton text="HistoryLine" onPress={() => navigation.navigate('HistoryLine')} testID="historyLineEntityScreenButton" />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
